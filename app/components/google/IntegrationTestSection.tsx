import { Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Property } from "../../types/googleTypes";

interface IntegrationTestSectionProps {
  loading: boolean;
  properties: Property[];
  selectedProperty: string;
  searchQuery: string;
  onPropertyChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onFetchReviews: () => void;
}

export default function IntegrationTestSection({
  loading,
  properties,
  selectedProperty,
  searchQuery,
  onPropertyChange,
  onSearchQueryChange,
  onFetchReviews,
}: IntegrationTestSectionProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-100">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Search className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Test Reviews Integration</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Property
            </label>
            <Select value={selectedProperty} onValueChange={onPropertyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Search Query (Optional)
            </label>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Enter custom search terms for Google Places..."
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={onFetchReviews}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-100 h-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Fetching Reviews...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Fetch Google Reviews
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
