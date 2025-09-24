import { prisma } from "@/lib/db";

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.reviewCategory.deleteMany();
  await prisma.review.deleteMany();
  await prisma.property.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
