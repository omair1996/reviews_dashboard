import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Group reviews by property and calculate stats
export async function getReviewsByProperty() {
  const reviews = await prisma.review.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  const grouped = reviews.reduce((acc, review) => {
    const propertyId = review.propertyId || review.listingName;
    if (!acc[propertyId]) {
      acc[propertyId] = [];
    }
    acc[propertyId].push(review);
    return acc;
  }, {} as Record<string, typeof reviews>);

  return Object.entries(grouped).map(([propertyId, propertyReviews]) => {
    const totalReviews = propertyReviews.length;
    const ratings = propertyReviews
      .map((r) => r.overallRating)
      .filter((r): r is number => r !== null);

    const averageRating =
      ratings.length > 0
        ? Math.round(
            (ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10
          ) / 10
        : 0;

    const approvedCount = propertyReviews.filter((r) => r.isApproved).length;

    return {
      propertyId,
      propertyName: propertyReviews[0].listingName,
      totalReviews,
      averageRating,
      approvedCount,
      reviews: propertyReviews,
    };
  });
}

// Get only approved reviews
export async function getApprovedReviews() {
  return await prisma.review.findMany({
    where: {
      isApproved: true,
    },
    include: {
      categories: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
}

// Update approval flag
export async function updateReviewApproval(
  reviewId: string,
  isApproved: boolean
) {
  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      isApproved,
      isSelected: isApproved,
    },
  });
}

// Get filtered reviews
export async function getReviewFiltered(filters: {
  propertyId?: string;
  rating?: number;
  channel?: string;
  dateFrom?: Date;
  dateTo?: Date;
}) {
  const where: any = {};

  if (filters.propertyId) {
    where.propertyId = filters.propertyId;
  }

  if (filters.rating) {
    where.overallRating = { gte: filters.rating };
  }

  if (filters.channel) {
    where.channel = filters.channel;
  }

  if (filters.dateFrom || filters.dateTo) {
    where.submittedAt = {};
    if (filters.dateFrom) where.submittedAt.gte = filters.dateFrom;
    if (filters.dateTo) where.submittedAt.lte = filters.dateTo;
  }

  return await prisma.review.findMany({
    where,
    include: {
      categories: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
}
