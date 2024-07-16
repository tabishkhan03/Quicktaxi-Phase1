// /api/trips/ready-trips
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Fetch trips with status 'ready'
    const readyTrips = await prisma.trip.findMany({
      where: { status: "ready" },
    });

    return new Response(JSON.stringify(readyTrips), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch trips" }), {
      status: 500,
    });
  }
}
