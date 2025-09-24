import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import { Switch } from "../ui/switch";

interface Review {
  id: string;
  guestName: string;
  publicReview: string;
  overallRating: number;
  listingName: string;
  channel: string;
  isApproved: boolean;
}

export default function ReviewsList({
  reviews,
  handleApprovalChange,
}: {
  reviews: Review[];
  handleApprovalChange: (reviewId: string, isApproved: boolean) => void;
}) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No reviews found for the selected filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-[#FFFDFA] border-0" // ✨ removed border
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {review.guestName}
                </h3>
                <p className="text-sm text-gray-500">{review.listingName}</p>
              </div>
              <Badge variant="outline" className="capitalize">
                {review.channel}
              </Badge>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">
              {review.publicReview}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: review.overallRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Approved</span>
                <Switch
                  checked={review.isApproved}
                  onCheckedChange={(checked) =>
                    handleApprovalChange(review.id, checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
