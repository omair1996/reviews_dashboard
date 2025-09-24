"use client";
import {
  Heart,
  Share,
  MapPin,
  Star,
  BedDouble,
  Bath,
  Users,
} from "lucide-react";
import React from "react";

export default function PropertyHeader({
  name,
  location,
  specs,
  reviews,
  calculateAverageRating,
  renderStars,
}: any) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{name}</h1>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">{location}</span>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(calculateAverageRating()))}
            </div>
            <span className="font-semibold">{calculateAverageRating()}</span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6 text-gray-600">
        <div className="flex items-center space-x-1">
          <BedDouble className="w-4 h-4" />
          <span>{specs.bedrooms} bedrooms</span>
        </div>
        <div className="flex items-center space-x-1">
          <Bath className="w-4 h-4" />
          <span>{specs.bathrooms} bathroom</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{specs.guests} guests</span>
        </div>
      </div>
    </div>
  );
}
