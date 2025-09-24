"use client";
import React from "react";

interface Amenity {
  icon: React.ElementType;
  name: string;
}

export default function PropertyAmenities({
  amenities,
}: {
  amenities: Amenity[];
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <amenity.icon className="w-5 h-5 text-[#284E4C]" />
            <span className="text-gray-700 font-medium">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
