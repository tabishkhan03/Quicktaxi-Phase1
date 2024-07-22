import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Fetch all trips from the database
    const allTrips = await prisma.trip.findMany();

    return new Response(JSON.stringify(allTrips), { status: 200 });
  } catch (error) {
    console.error("Unable to fetch trips:", error);
    return new Response(JSON.stringify({ error: "Unable to fetch trips" }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
