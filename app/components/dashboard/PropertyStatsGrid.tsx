// src/components/PropertyStatsGrid.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, TrendingUp, TrendingDown } from "lucide-react";

interface PropertyStats {
  propertyId: string;
  propertyName: string;
  totalReviews: number;
  averageRating: number;
  approvedCount: number;
  recentTrend: "up" | "down" | "stable";
}

export default function PropertyStatsGrid({
  propertyStats,
}: {
  propertyStats: PropertyStats[];
}) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap justify-around mb-8">
      {propertyStats.map((property) => (
        <Card
          key={property.propertyId}
          className="w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] mb-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-[#FFFDFA] border-0"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold truncate">
                {property.propertyName}
              </CardTitle>
              {getTrendIcon(property.recentTrend)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">
                    {property.averageRating}
                  </span>
                  <div className="flex">
                    {renderStars(Math.round(property.averageRating))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="font-semibold">{property.totalReviews}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <Badge
                  variant={property.approvedCount > 0 ? "default" : "secondary"}
                >
                  {property.approvedCount}/{property.totalReviews}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
