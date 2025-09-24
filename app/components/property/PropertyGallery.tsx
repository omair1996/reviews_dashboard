"use client";
import React from "react";

export default function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div className="lg:col-span-1">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images.slice(1, 4).map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            <img
              src={image}
              alt={`${name} ${index + 2}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 font-medium">+5 more</span>
        </div>
      </div>
    </div>
  );
}
