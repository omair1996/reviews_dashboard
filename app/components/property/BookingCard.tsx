"use client";

import { Star } from "lucide-react";

interface Props {
  price: string;
  reviews: { overallRating: number }[];
  calculateAverageRating: () => number;
}

export default function BookingCard({
  price,
  reviews,
  calculateAverageRating,
}: Props) {
  return (
    <div className="sticky top-32">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-gray-900">{price}</span>
              <span className="text-gray-600">/ night</span>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {calculateAverageRating()}
                </span>
                <span className="text-gray-500 text-sm">
                  ({reviews.length})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-300 rounded-xl p-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                CHECK-IN
              </label>
              <div className="text-sm">Add date</div>
            </div>
            <div className="border border-gray-300 rounded-xl p-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                CHECKOUT
              </label>
              <div className="text-sm">Add date</div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-xl p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              GUESTS
            </label>
            <div className="text-sm">1 guest</div>
          </div>
        </div>

        <button className="w-full bg-[#284E4C] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#1d3b39] transition-colors mb-4">
          Reserve
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">
          You won't be charged yet
        </p>

        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-700">{price} x 5 nights</span>
            <span className="text-gray-700">£750</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Service fee</span>
            <span className="text-gray-700">£67</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold">
            <span>Total</span>
            <span>£817</span>
          </div>
        </div>
      </div>
    </div>
  );
}
