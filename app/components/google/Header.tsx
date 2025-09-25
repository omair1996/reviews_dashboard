import { Building } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-2xl">
          <Building className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Google Reviews Integration
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Connect your properties with Google Places API to automatically fetch
        and display authentic reviews from your guests.
      </p>
    </div>
  );
}
