import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { trip_id, driver_id } = await request.json();


    const start_time=new Date().toISOString();

    const trip = await prisma.trip.findFirst({
      where: {
        trip_id: trip_id,
        driver_id: driver_id,
        status: 'booked',
      },
    });

    console.log(trip)



    if (!trip) {
      return new Response(JSON.stringify({ error: 'Trip not found or not in booked status' }), { status: 404 });
    }

    const updatedTrip = await prisma.trip.update({
      where: { trip_id: parseInt(trip_id) },
      data: { start_time, status: 'started' },
    });

    return new Response(JSON.stringify(updatedTrip), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to start trip' }), { status: 500 });
  }
}
