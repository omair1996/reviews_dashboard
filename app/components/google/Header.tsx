import { Building } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12 mt-5">
      <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-[#284E4C] bg-clip-text text-transparent">
        Google Reviews Integration
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Connect your properties with Google Places API to automatically fetch
        and display authentic reviews from your guests.
      </p>
    </div>
  );
}
