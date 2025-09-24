"use client";
import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  overallRating: number;
  publicReview: string;
  guestName: string;
  submittedAt: string;
  categories: Array<{ category: string; rating: number }>;
}

interface Props {
  reviews: Review[];
  loading: boolean;
  calculateAverageRating: () => number;
  getCategoryAverages: () => { category: string; average: number }[];
  renderStars: (rating: number) => React.ReactElement[];
}

export default function PropertyReviews({
  reviews,
  loading,
  calculateAverageRating,
  renderStars,
  getCategoryAverages,
}: Props) {
  return (
    <div className="mb-12">
      <div className="border-t pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Guest Reviews</h2>
          <Link
            href="/dashboard"
            className="text-[#284E4C] hover:text-[#1d3b39] font-medium text-sm"
          >
            Manage Reviews →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#284E4C]"></div>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {/* Overall Rating Summary */}
            <div className="bg-[#F5F1E8] rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                    <span className="text-4xl font-bold text-[#284E4C]">
                      {calculateAverageRating()}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(Math.round(calculateAverageRating()))}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Based on {reviews.length} verified guest review
                    {reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  {getCategoryAverages()
                    .slice(0, 4)
                    .map((category) => (
                      <div
                        key={category.category}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {category.category.replace("_", " ")}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.round(category.average))}
                          </div>
                          <span className="text-sm font-semibold w-8">
                            {category.average}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#284E4C] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">
                        {review.guestName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.guestName}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(review.submittedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short" }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.overallRating)}
                        </div>
                        <span className="text-sm font-medium">
                          {review.overallRating}/5
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {review.publicReview}
                      </p>
                      {review.categories.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {review.categories
                            .slice(0, 3)
                            .map((category, idx) => (
                              <div
                                key={idx}
                                className="bg-[#F5F1E8] px-3 py-1 rounded-full text-xs font-medium text-[#284E4C]"
                              >
                                {category.category.replace("_", " ")}:{" "}
                                {category.rating}/5
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 6 && (
              <div className="text-center mt-8">
                <button className="bg-[#284E4C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1d3b39] transition-colors">
                  Show all {reviews.length} reviews
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600">
              Reviews will appear here once approved by the property manager.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
