"use client";
import { Clock, Shield, Ban, Dog, KeyRound, Calendar } from "lucide-react";

export default function StayPolicies() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">Stay Policies</h2>

      {/* Check-in & Check-out */}
      <div className="mb-6">
        <div className="flex items-center mb-3 space-x-2 text-gray-700 font-semibold">
          <Clock className="w-5 h-5" />
          <span>Check-in & Check-out</span>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
          <div>
            <p className="text-gray-500 text-sm">Check-in Time</p>
            <p className="font-bold text-gray-800">3:00 PM</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Check-out Time</p>
            <p className="font-bold text-gray-800">10:00 AM</p>
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div className="mb-6">
        <div className="flex items-center mb-3 space-x-2 text-gray-700 font-semibold">
          <Shield className="w-5 h-5" />
          <span>House Rules</span>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Ban className="w-4 h-4 text-gray-600" />
            <span>No smoking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Dog className="w-4 h-4 text-gray-600" />
            <span>No pets</span>
          </div>
          <div className="flex items-center space-x-2">
            <Ban className="w-4 h-4 text-gray-600" />
            <span>No parties or events</span>
          </div>
          <div className="flex items-center space-x-2">
            <KeyRound className="w-4 h-4 text-gray-600" />
            <span>Security deposit required</span>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <div className="flex items-center mb-3 space-x-2 text-gray-700 font-semibold">
          <Calendar className="w-5 h-5" />
          <span>Cancellation Policy</span>
        </div>
        <div className="space-y-4 bg-gray-50 rounded-lg p-4">
          <div>
            <p className="font-semibold text-gray-800">
              For stays less than 28 days
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-600 mt-1 space-y-1">
              <li>Full refund up to 14 days before check-in</li>
              <li>No refund for bookings less than 14 days before check-in</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              For stays of 28 days or more
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-600 mt-1 space-y-1">
              <li>Full refund up to 30 days before check-in</li>
              <li>No refund for bookings less than 30 days before check-in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
