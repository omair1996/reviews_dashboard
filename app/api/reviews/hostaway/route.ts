import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "../../../lib/db";
import mockReviews from "../../../../public/mocks/mockReviews.json";

async function fetchFromHostaway() {
  try {
    const response = await axios.get(
      `${process.env.HOSTAWAY_BASE_URL}/reviews`,
      {
        headers: {
          "X-Api-Key": process.env.HOSTAWAY_API_KEY!,
          "X-Account-Id": process.env.HOSTAWAY_ACCOUNT_ID!,
        },
        params: { limit: 100 },
      }
    );

    // If sandbox returns nothing, use mocks
    if (!response.data?.result?.length) {
      console.log("Hostaway API returned empty, falling back to mocks");
      return { result: mockReviews, isMock: true };
    }

    return { result: response.data.result, isMock: false };
  } catch (error: any) {
    console.log(
      "Hostaway API unreachable, using mock data:",
      error.response?.status || error.message
    );
    return { result: mockReviews, isMock: true };
  }
}

// --- Normalize Review ---
function normalizeReview(hostawayReview: any) {
  let overallRating = hostawayReview.rating;
  if (!overallRating && hostawayReview.reviewCategory?.length > 0) {
    const sum = hostawayReview.reviewCategory.reduce(
      (acc: number, cat: any) => acc + cat.rating,
      0
    );
    overallRating = Math.round(sum / hostawayReview.reviewCategory.length);
  }

  if (overallRating && overallRating > 5) {
    overallRating = Math.round(overallRating / 2);
  }

  return {
    hostawayId: hostawayReview.id,
    type: hostawayReview.type,
    status: hostawayReview.status,
    overallRating,
    publicReview: hostawayReview.publicReview || "",
    guestName: hostawayReview.guestName,
    listingName: hostawayReview.listingName,
    propertyId: hostawayReview.listingName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_"),
    submittedAt: new Date(hostawayReview.submittedAt),
    channel: "hostaway",
    isApproved: false,
    isSelected: false,
    categories:
      hostawayReview.reviewCategory?.map((cat: any) => ({
        category: cat.category,
        rating: cat.rating > 5 ? Math.round(cat.rating / 2) : cat.rating,
      })) || [],
  };
}

// --- GET Handler ---
export async function GET(request: NextRequest) {
  try {
    const { result, isMock } = await fetchFromHostaway();

    const normalizedReviews = result.map(normalizeReview);

    const savedReviews = [];
    for (const review of normalizedReviews) {
      const saved = await prisma.review.upsert({
        where: { hostawayId: review.hostawayId },
        update: {
          publicReview: review.publicReview,
          overallRating: review.overallRating,
          status: review.status,
        },
        create: {
          ...review,
          categories: {
            create: review.categories,
          },
        },
        include: { categories: true },
      });

      savedReviews.push(saved);
    }

    return NextResponse.json(
      {
        status: "success",
        isMock,
        count: savedReviews.length,
        result: savedReviews.map((review) => ({
          id: review.id,
          hostawayId: review.hostawayId,
          type: review.type,
          overallRating: review.overallRating,
          publicReview: review.publicReview,
          guestName: review.guestName,
          listingName: review.listingName,
          propertyId: review.propertyId,
          submittedAt: review.submittedAt.toISOString(),
          channel: review.channel,
          isApproved: review.isApproved,
          isSelected: review.isSelected,
          categories: review.categories.map((cat: any) => ({
            category: cat.category,
            rating: cat.rating,
          })),
        })),
        message: `Successfully processed ${savedReviews.length} reviews`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch and process reviews",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- POST Handler (manual refresh) ---
export async function POST(request: NextRequest) {
  return GET(request);
}
