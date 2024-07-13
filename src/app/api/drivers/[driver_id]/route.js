import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { driver_id } = params;

  try {
    const driver = await prisma.driver.findUnique({
      where: { driver_id: parseInt(driver_id) },
      include: {
        taxis: true,
      },
    });
    return new Response(JSON.stringify(driver), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to fetch driver profile and taxis' }), { status: 500 });
  }
}
