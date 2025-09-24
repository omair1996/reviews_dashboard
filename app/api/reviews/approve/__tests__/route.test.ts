import { POST, GET } from "../route";
import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/db";

jest.mock("../../../../lib/db", () => ({
  prisma: {
    review: {
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("Review Approval API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /approve", () => {
    it("approves a review successfully", async () => {
      const mockReview = { id: "1", isApproved: true, isSelected: true };
      (prisma.review.update as jest.Mock).mockResolvedValue(mockReview);

      const body = { reviewId: "1", isApproved: true };
      const request = new NextRequest("http://localhost/api/reviews/approve", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(prisma.review.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { isApproved: true, isSelected: true },
      });

      expect(data.success).toBe(true);
      expect(data.review).toEqual(mockReview);
      expect(data.message).toContain("approved successfully");
    });

    it("handles errors gracefully", async () => {
      (prisma.review.update as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const body = { reviewId: "1", isApproved: false };
      const request = new NextRequest("http://localhost/api/reviews/approve", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.message).toBe("Failed to update review approval");
    });
  });

  describe("GET /approve", () => {
    it("fetches filtered reviews", async () => {
      const mockReviews = [
        {
          id: "1",
          propertyId: "test",
          overallRating: 5,
          isApproved: true,
          categories: [],
        },
      ];
      (prisma.review.findMany as jest.Mock).mockResolvedValue(mockReviews);

      const request = new NextRequest(
        "http://localhost/api/reviews/approve?status=approved"
      );
      const response = await GET(request);
      const data = await response.json();

      expect(prisma.review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { isApproved: true },
          include: { categories: true },
          orderBy: { submittedAt: "desc" },
        })
      );

      expect(data.success).toBe(true);
      expect(data.reviews).toEqual(mockReviews);
    });
  });
});
