import { AlertCircle, CheckCircle, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SummarySection() {
  return (
    <Card className="border-gray-100">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <CardTitle className="text-xl">Implementation Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FeatureList
            title="What Works"
            icon={CheckCircle}
            items={[
              "Google Places API integration implemented",
              "Review data normalization working",
              "Multiple search methods (Place ID + text search)",
              "Database storage integration",
              "Error handling and fallbacks",
            ]}
            color="green"
          />

          <FeatureList
            title="Limitations Discovered"
            icon={AlertCircle}
            items={[
              "Only 5 reviews per location maximum",
              "High API costs ($0.017+ per request)",
              "Reviews may not match exact property guests",
              "No category rating breakdowns",
              "Requires Google Cloud billing setup",
            ]}
            color="amber"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-medium">
            💡 Recommendation: Google Reviews integration is technically
            feasible but has limitations. Best used as supplementary data rather
            than primary reviews. Consider cost-benefit for production.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureList({
  title,
  icon: Icon,
  items,
  color,
}: {
  title: string;
  icon: any;
  items: string[];
  color: "green" | "amber";
}) {
  const colorClasses = {
    green: "text-green-700",
    amber: "text-amber-700",
  };

  const dotColors = {
    green: "bg-green-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-2 ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
        <span className="font-semibold">{title}</span>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <div className={`w-2 h-2 ${dotColors[color]} rounded-full`}></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
