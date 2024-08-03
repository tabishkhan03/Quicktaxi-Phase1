import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { trip_id } = await request.json();
    console.log("Received trip_id:", trip_id);
    
    const bookedTrip = await prisma.trip.findUnique({
      where: { 
        trip_id: trip_id,
      },
      select: {
        status: true
      }
    });
    
    console.log("Booked trip status:", bookedTrip);

    return new Response(JSON.stringify(bookedTrip), { status: 200 });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return new Response(JSON.stringify({ error: "Unable to fetch trip" }), {
      status: 500,
    });
  }
}
