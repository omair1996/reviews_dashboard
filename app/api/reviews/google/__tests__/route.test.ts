import { GET, POST } from "../route";
import { NextRequest } from "next/server";

// Mock global fetch
global.fetch = jest.fn();

// Mock Prisma Client
jest.mock("@prisma/client", () => {
  const mPrisma = {
    review: {
      upsert: jest.fn().mockResolvedValue({}),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

// Sample mock data from Google Places API
const mockPlaceResponse = {
  status: "OK",
  result: {
    place_id: "test_place_id",
    name: "Test Property",
    rating: 4.5,
    reviews: [
      {
        author_name: "John Doe",
        rating: 5,
        text: "Great place!",
        time: 1695000000,
        relative_time_description: "2 days ago",
        profile_photo_url: "https://example.com/photo.jpg",
      },
    ],
  },
};

describe("Google Reviews API", () => {
  process.env.GOOGLE_API_KEY = "FAKE_KEY";

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPlaceResponse),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET: returns normalized Google reviews for a mapped propertyId", async () => {
    const url =
      "http://localhost/api/reviews/google?propertyId=shoreditch-heights";
    const req = new NextRequest(url);

    const res = await GET(req);
    const json = await res.json();

    expect(json.success).toBe(true);
    expect(json.reviews.length).toBe(1);
    expect(json.reviews[0].guestName).toBe("John Doe");
    expect(json.place.name).toBe("Test Property");
  });

  it("GET: returns 404 if propertyId and query are missing", async () => {
    const url = "http://localhost/api/reviews/google";
    const req = new NextRequest(url);

    const res = await GET(req);
    const json = await res.json();

    expect(json.success).toBe(false);
    expect(json.message).toContain("No Google Place found");
  });

  it("POST: returns configured true when Google API key is set", async () => {
    process.env.GOOGLE_API_KEY = "FAKE_KEY";

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        status: "OK",
        results: [{ name: "Test Place" }],
      }),
    });

    const req = new NextRequest("http://localhost/api/reviews/google", {
      method: "POST",
      body: JSON.stringify({ testQuery: "Test Place" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.configured).toBe(true);
    expect(json.apiResponseStatus).toBe("OK");
    expect(json.resultsCount).toBe(1);
  });

  it("POST: returns configured false if API key is missing", async () => {
    delete process.env.GOOGLE_API_KEY;

    const req = new NextRequest("http://localhost/api/reviews/google", {
      method: "POST",
      body: JSON.stringify({ testQuery: "Test Place" }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.configured).toBe(false);
    expect(json.message).toContain("Google API key not found");
  });
});
