export interface Property {
  id: string;
  name: string;
  query: string;
  location: string;
  rating: number;
}

export interface TestResults {
  configured: boolean;
  apiResponseStatus?: number;
  resultsCount?: number;
  billingEnabled?: boolean;
  quotaExceeded?: boolean;
  message?: string;
  error?: string;
}

export interface Place {
  name: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  guestName: string;
  relativeTime: string;
  rating: number;
  content: string;
}

export interface IntegrationResults {
  success: boolean;
  message?: string;
  place?: Place;
  reviews?: Review[];
}
