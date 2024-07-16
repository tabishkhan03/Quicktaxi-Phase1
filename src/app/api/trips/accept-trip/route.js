import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { trip_id, driver_id } = await request.json();

    const trip = await prisma.trip.findFirst({
      where: {
        trip_id: parseInt(trip_id),
        status: 'ready',
      },
    });

    if (!trip) {
      return new Response(JSON.stringify({ error: 'Trip not found or not in ready status' }), { status: 404 });
    }

    const updatedTrip = await prisma.trip.update({
      where: { trip_id: parseInt(trip_id) },
      data: { status: 'booked', driver_id: parseInt(driver_id) },
    });

    return new Response(JSON.stringify(updatedTrip), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to accept trip' }), { status: 500 });
  }
}
