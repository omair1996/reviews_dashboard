"use client";

import { useState, useEffect } from "react";
import PropertyStatsGrid from "../components/dashboard/PropertyStatsGrid";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import ReviewsList from "../components/dashboard/ReviewsList";

import { Review, PropertyStats } from "../types/reviews";

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [propertyStats, setPropertyStats] = useState<PropertyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    reviews,
    searchTerm,
    selectedProperty,
    selectedRating,
    selectedChannel,
    selectedStatus,
  ]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();

      if (data.status === "success") {
        setReviews(data.result);
        calculatePropertyStats(data.result);
      } else {
        setError("Failed to fetch reviews");
      }
    } catch (err) {
      setError("Error fetching reviews");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePropertyStats = (reviewsData: Review[]) => {
    const propertyGroups = reviewsData.reduce((acc, review) => {
      const propertyId = review.propertyId;
      if (!acc[propertyId]) {
        acc[propertyId] = {
          propertyId,
          propertyName: review.listingName,
          reviews: [],
        };
      }
      acc[propertyId].reviews.push(review);
      return acc;
    }, {} as Record<string, any>);

    const stats = Object.values(propertyGroups).map((group: any) => {
      const totalReviews = group.reviews.length;
      const ratedReviews = group.reviews.filter(
        (r: Review) => r.overallRating > 0
      );
      const averageRating =
        ratedReviews.length > 0
          ? ratedReviews.reduce(
              (sum: number, r: Review) => sum + r.overallRating,
              0
            ) / ratedReviews.length
          : 0;
      const approvedCount = group.reviews.filter(
        (r: Review) => r.isApproved
      ).length;

      return {
        propertyId: group.propertyId,
        propertyName: group.propertyName,
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        approvedCount,
        recentTrend: "stable" as const, // simplified trend
      };
    });

    setPropertyStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...reviews];

    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.publicReview
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          review.listingName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProperty !== "all") {
      filtered = filtered.filter(
        (review) => review.propertyId === selectedProperty
      );
    }

    if (selectedRating !== "all") {
      const rating = parseInt(selectedRating);
      filtered = filtered.filter((review) => review.overallRating >= rating);
    }

    if (selectedChannel !== "all") {
      filtered = filtered.filter(
        (review) => review.channel === selectedChannel
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((review) =>
        selectedStatus === "approved" ? review.isApproved : !review.isApproved
      );
    }

    setFilteredReviews(filtered);
  };

  const handleApprovalChange = async (
    reviewId: string,
    isApproved: boolean
  ) => {
    try {
      const response = await fetch("/api/reviews/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, isApproved }),
      });

      if (response.ok) {
        setReviews(
          reviews.map((review) =>
            review.id === reviewId ? { ...review, isApproved } : review
          )
        );
      }
    } catch (err) {
      console.error("Error updating approval:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-b-[#284E4C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
            <div className="relative inline-block">
              <span className="block bg-gradient-to-r from-[#284E4C] via-[#3B6B6A] to-[#5FAFA7] bg-clip-text text-transparent drop-shadow-sm">
                Manage
              </span>
              <span className="block mt-2 ml-[4.6ch] bg-gradient-to-r from-[#5FAFA7] via-[#3B6B6A] to-[#284E4C] bg-clip-text text-transparent drop-shadow-sm">
                Reviews
              </span>
            </div>
          </h1>
        </header>

        {/* Property Stats */}
        <PropertyStatsGrid propertyStats={propertyStats} />

        {/* Filters */}
        <FiltersPanel
          propertyStats={propertyStats}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Reviews List */}
        <ReviewsList
          reviews={filteredReviews}
          handleApprovalChange={handleApprovalChange}
        />
      </div>
    </div>
  );
}
