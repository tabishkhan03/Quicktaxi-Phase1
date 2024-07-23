import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { trip_id, driver_id } = await request.json();
    const bookedTrips = await prisma.trip.findMany({
      where: { 
        trip_id: parseInt(trip_id),
        driver_id: parseInt(driver_id),
        status: "booked"
     },
    });
    console.log("booked trip ", bookedTrips);

    return new Response(JSON.stringify(bookedTrips), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch trips" }), {
      status: 500,
    });
  }
}
