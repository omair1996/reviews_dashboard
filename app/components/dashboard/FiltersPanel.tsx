import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

interface PropertyStats {
  propertyId: string;
  propertyName: string;
}

export default function FiltersPanel({
  propertyStats,
  searchTerm,
  setSearchTerm,
  selectedProperty,
  setSelectedProperty,
  selectedRating,
  setSelectedRating,
  selectedChannel,
  setSelectedChannel,
  selectedStatus,
  setSelectedStatus,
}: {
  propertyStats: PropertyStats[];
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedProperty: string;
  setSelectedProperty: (v: string) => void;
  selectedRating: string;
  setSelectedRating: (v: string) => void;
  selectedChannel: string;
  setSelectedChannel: (v: string) => void;
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <Input
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Property */}
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger>
            <SelectValue placeholder="Select Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            {propertyStats?.map((property) => (
              <SelectItem key={property.propertyId} value={property.propertyId}>
                {property.propertyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating */}
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger>
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
          </SelectContent>
        </Select>

        {/* Channel */}
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger>
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="airbnb">Airbnb</SelectItem>
            <SelectItem value="booking">Booking.com</SelectItem>
            <SelectItem value="expedia">Expedia</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
