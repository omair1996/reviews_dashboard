import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../lib/db";

const ApprovalSchema = z.object({
  reviewId: z.string(),
  isApproved: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, isApproved } = ApprovalSchema.parse(body);

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        isApproved,
        isSelected: isApproved,
      },
    });

    return NextResponse.json({
      success: true,
      review: updatedReview,
      message: `Review ${isApproved ? "approved" : "rejected"} successfully`,
    });
  } catch (error) {
    console.log("Error updating review approval:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update review approval",
      },
      { status: 500 }
    );
  }
}

// Get all reviews with filtering capability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const rating = searchParams.get("rating");
    const channel = searchParams.get("channel");
    const status = searchParams.get("status");

    const where: any = {};

    if (propertyId && propertyId !== "all") {
      where.propertyId = propertyId;
    }

    if (rating && rating !== "all") {
      where.overallRating = { gte: parseInt(rating) };
    }

    if (channel && channel !== "all") {
      where.channel = channel;
    }

    if (status && status !== "all") {
      if (status === "approved") {
        where.isApproved = true;
      } else if (status === "pending") {
        where.isApproved = false;
      }
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        categories: true,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      reviews,
      count: reviews.length,
    });
  } catch (error) {
    console.log("Error fetching filtered reviews:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}
