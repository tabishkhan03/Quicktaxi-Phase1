import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { trip_id, driver_id } = await request.json();
    const end_time = new Date().toISOString(); 

    const trip = await prisma.trip.findFirst({
      where: {
        trip_id: trip_id,
        driver_id: driver_id,
        status: 'started',
      },
    });

    if (!trip) {
      return new Response(JSON.stringify({ error: 'Trip not found or not in started status' }), { status: 404 });
    }


    const updatedTrip = await prisma.trip.update({
      where: { trip_id: trip_id },
      data: { end_time, status: 'completed' },
    });

    return new Response(JSON.stringify(updatedTrip), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to complete trip' }), { status: 500 });
  }
}
