"use client";

import { useState, useEffect } from "react";
import { Star, Wifi, Tv, Car, Coffee, Shield } from "lucide-react";

import PropertyGallery from "../../components/property/PropertyGallery";
import PropertyHeader from "../../components/property/PropertyHeader";
import PropertyDescription from "../../components/property/PropertyDescription";
import PropertyAmenities from "../../components/property/PropertyAmenities";
import PropertyReviews from "../../components/property/PropertyReviews";
import BookingCard from "../../components/property/BookingCard";
import StayPolicies from "@/app/components/property/StayPolicies";
import PropertyLocation from "@/app/components/property/PropertyLocation";

// --- Types ---
interface Amenity {
  icon: React.ElementType; // <-- use component type
  name: string;
}

interface Specs {
  bedrooms: number;
  bathrooms: number;
  guests: number;
}

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  images: string[];
  amenities: Amenity[];
  specs: Specs;
}

interface Review {
  id: string;
  hostawayId: number;
  overallRating: number;
  publicReview: string;
  guestName: string;
  listingName: string;
  submittedAt: string;
  categories: Array<{ category: string; rating: number }>;
  isApproved: boolean;
}

export default function PropertyReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock property data
  const propertyData: Property = {
    id: "shoreditch-heights-2b-n1-a-29",
    name: "2B N1 A - 29 Shoreditch Heights",
    location: "Shoreditch, London",
    price: "£150",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    ],
    amenities: [
      { icon: Wifi, name: "High-speed WiFi" },
      { icon: Tv, name: "Smart TV" },
      { icon: Car, name: "Parking" },
      { icon: Coffee, name: "Kitchen" },
      { icon: Shield, name: "24/7 Security" },
    ],
    specs: { bedrooms: 2, bathrooms: 1, guests: 4 },
  };

  // Fetch reviews
  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();

      if (data.status === "success") {
        const approvedReviews = data.result.filter(
          (review: Review) => review.isApproved
        );
        setReviews(approvedReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helpers
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.overallRating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const getCategoryAverages = () => {
    const categoryTotals: Record<string, { sum: number; count: number }> = {};

    reviews.forEach((review) => {
      review.categories.forEach((category) => {
        if (!categoryTotals[category.category]) {
          categoryTotals[category.category] = { sum: 0, count: 0 };
        }
        categoryTotals[category.category].sum += category.rating;
        categoryTotals[category.category].count += 1;
      });
    });

    return Object.entries(categoryTotals).map(([category, data]) => ({
      category,
      average: Math.round((data.sum / data.count) * 10) / 10,
    }));
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: "88px" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top gallery */}
        <PropertyGallery
          images={propertyData.images}
          name={propertyData.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2">
            <PropertyHeader
              property={propertyData}
              specs={propertyData.specs}
              reviews={reviews}
              calculateAverageRating={calculateAverageRating}
              renderStars={renderStars}
            />

            <PropertyDescription />
            <PropertyAmenities amenities={propertyData.amenities} />
            <StayPolicies />
            <PropertyLocation />

            <PropertyReviews
              reviews={reviews}
              loading={loading}
              calculateAverageRating={calculateAverageRating}
              renderStars={renderStars}
              getCategoryAverages={getCategoryAverages}
            />
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <BookingCard
              price={propertyData.price}
              reviews={reviews}
              calculateAverageRating={calculateAverageRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
