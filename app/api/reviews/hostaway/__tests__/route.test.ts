import { GET } from "../route";
import { NextRequest } from "next/server";
import axios from "axios";

// Mock axios for both unit and integration
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Conditionally import prisma only for integration
let prisma: any;
if (process.env.TEST_ENV === "integration") {
  const db = await import("../../../../lib/db");
  prisma = db.prisma;
}

describe("GET /api/reviews/hostaway", () => {
  // --- Integration hooks ---
  if (process.env.TEST_ENV === "integration") {
    beforeEach(async () => {
      await prisma.reviewCategory.deleteMany();
      await prisma.review.deleteMany();
    });

    afterAll(async () => {
      await prisma.$disconnect();
    });
  }

  it("returns normalized reviews from MOCK_REVIEWS when Hostaway API is empty", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { result: [] } });

    const request = new NextRequest(
      "http://localhost:3000/api/reviews/hostaway"
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("success");
    expect(data.isMock).toBe(true);
    expect(data.result.length).toBeGreaterThan(0);
  });

  it("normalizes reviews from Hostaway API when data exists", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        result: [
          {
            id: 999,
            type: "guest-to-host",
            status: "published",
            rating: 8,
            publicReview: "Test review",
            reviewCategory: [
              { category: "cleanliness", rating: 8 },
              { category: "communication", rating: 10 },
            ],
            submittedAt: "2024-01-01T10:00:00Z",
            guestName: "Tester",
            listingName: "Test Listing",
          },
        ],
      },
    });

    const request = new NextRequest(
      "http://localhost:3000/api/reviews/hostaway"
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("success");
    expect(data.isMock).toBe(false);
    expect(data.result[0].guestName).toBe("Tester");
  });
});
