export interface Review {
  id: string;
  hostawayId: number;
  type: string;
  overallRating: number;
  publicReview: string;
  guestName: string;
  listingName: string;
  propertyId: string;
  submittedAt: string;
  channel: string;
  isApproved: boolean;
  isSelected: boolean;
  categories: Array<{
    category: string;
    rating: number;
  }>;
}

export interface PropertyStats {
  propertyId: string;
  propertyName: string;
  totalReviews: number;
  averageRating: number;
  approvedCount: number;
  recentTrend: "up" | "down" | "stable";
}
