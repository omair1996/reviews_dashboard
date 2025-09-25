import { AlertCircle, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { IntegrationResults as IntegrationResultsType } from "../../types/googleTypes";
interface IntegrationResultsProps {
  integrationResults: IntegrationResultsType;
}

export default function IntegrationResults({
  integrationResults,
}: IntegrationResultsProps) {
  return (
    <Card className="mb-8 animate-fade-in border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Integration Results</CardTitle>
          <Badge
            variant={integrationResults.success ? "default" : "destructive"}
            className="flex items-center gap-2"
          >
            {integrationResults.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>
              {integrationResults.success
                ? "Integration Successful"
                : "Integration Failed"}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {integrationResults.success && integrationResults.place ? (
          <SuccessfulIntegration integrationResults={integrationResults} />
        ) : (
          <FailedIntegration integrationResults={integrationResults} />
        )}
      </CardContent>
    </Card>
  );
}

function SuccessfulIntegration({
  integrationResults,
}: {
  integrationResults: IntegrationResultsType;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Google Place Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-gray-600">Name</span>
              <p className="font-medium">{integrationResults.place!.name}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">
                  {integrationResults.place!.rating}/5
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600">Total Reviews</span>
              <p className="font-medium">
                {integrationResults.place!.reviewCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {integrationResults.reviews && integrationResults.reviews.length > 0 ? (
        <ReviewsList reviews={integrationResults.reviews} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No reviews found for this location
        </div>
      )}
    </div>
  );
}

function ReviewsList({ reviews }: { reviews: any[] }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4 text-lg">
        Latest Reviews ({reviews.length})
      </h3>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <Card
            key={idx}
            className="hover:border-blue-200 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-900">
                    {review.guestName}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {review.relativeTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FailedIntegration({
  integrationResults,
}: {
  integrationResults: IntegrationResultsType;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
      <AlertCircle className="h-5 w-5 inline mr-2" />
      Error: {integrationResults.message}
    </div>
  );
}
