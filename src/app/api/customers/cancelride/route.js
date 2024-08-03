import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { trip_id } = await request.json();

    if (!trip_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const updatedTrip = await prisma.trip.update({
      where: { trip_id: trip_id },
      data: { status: "canceled" },
    });

    return new Response(
      JSON.stringify({
        message: "Trip canceled successfully",
        trip: updatedTrip,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error canceling trip:", error);
    return new Response(
      JSON.stringify({ error: "Error canceling trip", details: error.message }),
      { status: 500 }
    );
  }
}
