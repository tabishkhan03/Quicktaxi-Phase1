// /api/trips/ready-trips
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request,) {
  try {
    const { trip_id, driver_id } = await request.json();
    const readyTrips = await prisma.trip.findMany({
      where: { 
        trip_id: parseInt(trip_id),
        driver_id: parseInt(driver_id),
        status: "booked"
     },
    });

    return new Response(JSON.stringify(readyTrips), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch trips" }), {
      status: 500,
    });
  }
}
