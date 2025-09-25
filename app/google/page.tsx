"use client";

import { useState } from "react";
import { Building } from "lucide-react";
import Header from "../components/google/Header";
import ApiTestSection from "../components/google/ApiTestSection";
import IntegrationTestSection from "../components/google/IntegrationTestSection";
import IntegrationResults from "../components/google/IntegrationResults";
import {
  TestResults,
  IntegrationResults as IntegrationResultsType,
  Property,
} from "../types/googleTypes";

interface GoogleReviewsIntegrationProps {
  className?: string;
}

export default function GoogleReviewsIntegration({
  className = "",
}: GoogleReviewsIntegrationProps) {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] =
    useState("shoreditch-heights");
  const [integrationResults, setIntegrationResults] =
    useState<IntegrationResultsType | null>(null);

  const properties: Property[] = [
    {
      id: "shoreditch-heights",
      name: "2B N1 A - 29 Shoreditch Heights",
      query: "Shoreditch Heights London accommodation",
      location: "Shoreditch, London",
      rating: 4.7,
    },
    {
      id: "1b-central-london",
      name: "1B Central London Studio",
      query: "Central London Studio apartment",
      location: "Central London",
      rating: 4.5,
    },
    {
      id: "executive-canary-wharf",
      name: "Executive Suite Canary Wharf",
      query: "Canary Wharf executive accommodation London",
      location: "Canary Wharf, London",
      rating: 4.8,
    },
  ];

  const testApiConnection = async () => {
    setLoading(true);
    setTestResults(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTestResults({
        configured: true,
        apiResponseStatus: 200,
        resultsCount: 3,
        billingEnabled: true,
        quotaExceeded: false,
      });
    } catch (error) {
      setTestResults({ configured: false, error: "Failed to connect to API" });
    } finally {
      setLoading(false);
    }
  };

  const fetchGoogleReviews = async () => {
    setLoading(true);
    setIntegrationResults(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIntegrationResults({
        success: true,
        place: {
          name: "Shoreditch Heights Apartments",
          rating: 4.7,
          reviewCount: 47,
        },
        reviews: [
          {
            guestName: "Sarah Johnson",
            relativeTime: "2 weeks ago",
            rating: 5,
            content:
              "Amazing location and beautiful apartment. The staff was incredibly helpful and the views were stunning!",
          },
          {
            guestName: "Michael Chen",
            relativeTime: "1 month ago",
            rating: 4,
            content:
              "Great place to stay. Clean, modern, and well-equipped. Would definitely recommend.",
          },
          {
            guestName: "Emma Wilson",
            relativeTime: "2 months ago",
            rating: 5,
            content:
              "Perfect stay! Everything was exactly as described. The attention to detail was impressive.",
          },
        ],
      });
    } catch (error) {
      setIntegrationResults({
        success: false,
        message: "Failed to fetch reviews",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ApiTestSection
            loading={loading}
            testResults={testResults}
            onTestConnection={testApiConnection}
          />

          <IntegrationTestSection
            loading={loading}
            properties={properties}
            selectedProperty={selectedProperty}
            searchQuery={searchQuery}
            onPropertyChange={setSelectedProperty}
            onSearchQueryChange={setSearchQuery}
            onFetchReviews={fetchGoogleReviews}
          />
        </div>

        {integrationResults && (
          <IntegrationResults integrationResults={integrationResults} />
        )}
      </div>
    </div>
  );
}
