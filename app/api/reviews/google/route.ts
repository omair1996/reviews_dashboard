// src/app/api/reviews/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Google Places API configuration
const PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

/**
 * Google Reviews Integration - Places API Implementation
 *
 * This implementation demonstrates integration with Google Places API
 * to fetch business reviews for property locations.
 *
 * LIMITATIONS DISCOVERED:
 * 1. Google Places API returns maximum 5 reviews per location
 * 2. Reviews are limited and may not include all guest reviews
 * 3. Requires significant API costs for production usage
 * 4. Review content is limited to Google's review policies
 */

interface GooglePlace {
  place_id: string;
  name: string;
  rating?: number;
  reviews?: GoogleReview[];
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

const PROPERTY_PLACE_MAPPINGS = {
  "shoreditch-heights": "ChIJr4jIVsMadkgRGTJ8eBIrZg0",
  "1b-central-london": "ChIJdd4hrwug2EcRmSrV3Vo6llI",
  "executive-canary-wharf": "ChIJ6f7EIXUCDKIR7qcmgEy-NJ8",
};

/**
 * Search for a place using Google Places Text Search
 */
async function searchGooglePlace(query: string): Promise<GooglePlace | null> {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  if (!GOOGLE_API_KEY) {
    console.warn("Google API key not configured");
    return null;
  }

  try {
    const searchUrl = `${PLACES_API_BASE_URL}/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${GOOGLE_API_KEY}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.status !== "OK" || !data.results?.length) {
      console.log("No places found for query:", query);
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error("Error searching Google Places:", error);
    return null;
  }
}

/**
 * Get detailed place information including reviews
 */
async function getPlaceDetails(placeId: string): Promise<GooglePlace | null> {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  if (!GOOGLE_API_KEY) {
    console.warn("Google API key not configured");
    return null;
  }

  try {
    const detailsUrl = `${PLACES_API_BASE_URL}/details/json?place_id=${placeId}&fields=name,rating,reviews,place_id&key=${GOOGLE_API_KEY}`;

    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      console.log("Place details not found for ID:", placeId);
      return null;
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

/**
 * Normalize Google review to match our internal schema
 */
function normalizeGoogleReview(
  googleReview: GoogleReview,
  propertyName: string,
  placeId: string
) {
  return {
    id: `google_${placeId}_${googleReview.time}`,
    googlePlaceId: placeId,
    type: "guest-to-host",
    status: "published",
    rating: googleReview.rating,
    content: googleReview.text,
    guestName: googleReview.author_name,
    listingName: propertyName,
    propertyId: propertyName.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    submittedAt: new Date(googleReview.time * 1000),
    channel: "google",
    isApproved: false,
    isSelected: false,
    profilePhotoUrl: googleReview.profile_photo_url,
    relativeTime: googleReview.relative_time_description,
    categories: [], // Google reviews don't have category breakdowns
  };
}

/**
 * Main API endpoint for Google Reviews integration
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");
  const searchQuery = searchParams.get("query");

  try {
    console.log("🔍 Google Reviews Integration - Starting...");

    let googlePlace: GooglePlace | null = null;

    // Method 1: Use predefined place ID mapping
    if (
      propertyId &&
      PROPERTY_PLACE_MAPPINGS[
        propertyId as keyof typeof PROPERTY_PLACE_MAPPINGS
      ]
    ) {
      const placeId =
        PROPERTY_PLACE_MAPPINGS[
          propertyId as keyof typeof PROPERTY_PLACE_MAPPINGS
        ];
      console.log(`📍 Using mapped Place ID for ${propertyId}: ${placeId}`);
      googlePlace = await getPlaceDetails(placeId);
    }

    // Method 2: Search by query if no mapping found
    if (!googlePlace && searchQuery) {
      console.log(`🔎 Searching Google Places for: ${searchQuery}`);
      googlePlace = await searchGooglePlace(searchQuery);

      if (googlePlace?.place_id) {
        googlePlace = await getPlaceDetails(googlePlace.place_id);
      }
    }

    if (!googlePlace) {
      return NextResponse.json(
        {
          success: false,
          message: "No Google Place found",
          findings: {
            searchAttempted: !!searchQuery,
            mappingAttempted: !!propertyId,
            reason: "Place not found or API key not configured",
          },
        },
        { status: 404 }
      );
    }

    // Process reviews if available
    let normalizedReviews: any[] = [];
    if (googlePlace.reviews && googlePlace.reviews.length > 0) {
      normalizedReviews = googlePlace.reviews.map((review) =>
        normalizeGoogleReview(review, googlePlace!.name, googlePlace!.place_id)
      );

      // Optionally store in database
      for (const review of normalizedReviews) {
        try {
          await prisma.review.upsert({
            where: {
              // Create a unique identifier for Google reviews
              id: review.id,
            },
            update: {
              content: review.content,
              rating: review.rating,
            },
            create: {
              ...review,
              hostawayId: null, // Google reviews don't have Hostaway IDs
            },
          });
        } catch (dbError) {
          console.warn(`Could not store Google review: ${dbError}`);
        }
      }
    }

    const response = {
      success: true,
      source: "google_places_api",
      place: {
        id: googlePlace.place_id,
        name: googlePlace.name,
        rating: googlePlace.rating,
        reviewCount: googlePlace.reviews?.length || 0,
      },
      reviews: normalizedReviews,
      limitations: {
        maxReviews: 5,
        note: "Google Places API returns maximum 5 reviews per location",
        costPerRequest: "Places Details: $0.017 per request",
        additionalFields: "Reviews field increases cost significantly",
      },
      findings: {
        integrationFeasible: true,
        reviewsAvailable: normalizedReviews.length > 0,
        costConsiderations: "High API costs for production usage",
        dataLimitations: "Limited to 5 reviews, no category breakdowns",
      },
    };

    console.log("✅ Google Reviews integration completed");
    return NextResponse.json(response);
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Google Reviews integration failed",
        error: message,
        findings: {
          integrationAttempted: true,
          errorType: error instanceof Error ? error.name : "Unknown",
          recommendation: "Check API key configuration and billing setup",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Test endpoint for Google Places API connectivity
 */
export async function POST(request: NextRequest) {
  try {
    const { testQuery } = await request.json();
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) {
      return NextResponse.json({
        configured: false,
        message: "Google API key not found in environment variables",
      });
    }

    // Test with a simple place search
    const testUrl = `${PLACES_API_BASE_URL}/textsearch/json?query=${encodeURIComponent(
      testQuery || "restaurant london"
    )}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(testUrl);
    const data = await response.json();

    return NextResponse.json({
      configured: true,
      apiResponseStatus: data.status,
      resultsCount: data.results?.length || 0,
      quotaExceeded: data.status === "OVER_QUERY_LIMIT",
      billingEnabled: data.status !== "REQUEST_DENIED",
    });
  } catch (error) {
    return NextResponse.json({
      configured: false,
      message: "Error testing Google Places API",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
