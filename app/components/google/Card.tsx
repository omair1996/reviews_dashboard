"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Zap, CheckCircle, AlertCircle } from "lucide-react";

interface TestCardProps {
  loading: boolean;
  testResults: any;
  onTest: () => void;
}

export function ApiTestCard({ loading, testResults, onTest }: TestCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-100">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Zap className="h-5 w-5 text-green-600" />
          </div>
          <CardTitle className="text-xl">API Configuration Test</CardTitle>
        </div>
        <CardDescription>
          Verify your Google Places API configuration and connectivity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onTest}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-100 h-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Testing Connection...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Test Google Places API Connection
            </>
          )}
        </Button>

        {testResults && (
          <div
            className={`mt-6 p-4 rounded-xl border ${
              testResults.configured
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            } transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              {testResults.configured ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span
                className={`font-semibold ${
                  testResults.configured ? "text-green-800" : "text-red-800"
                }`}
              >
                {testResults.configured
                  ? "API Configured Successfully"
                  : "Configuration Issue"}
              </span>
            </div>

            {testResults.configured ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-700">
                    {testResults.apiResponseStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Results Found:</span>
                  <span className="font-medium text-green-700">
                    {testResults.resultsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Billing:</span>
                  <span
                    className={`font-medium ${
                      testResults.billingEnabled
                        ? "text-green-700"
                        : "text-amber-600"
                    }`}
                  >
                    {testResults.billingEnabled
                      ? "Enabled"
                      : "Check billing setup"}
                  </span>
                </div>
                {testResults.quotaExceeded && (
                  <div className="flex items-center gap-2 text-amber-700 bg-amber-100 px-3 py-2 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">API quota exceeded</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-700">
                {testResults.message || testResults.error}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
