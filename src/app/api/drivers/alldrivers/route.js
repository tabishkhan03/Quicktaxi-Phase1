import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {

  try {
    const alldrivers = await prisma.driver.findFirst();
    return new Response(JSON.stringify(alldrivers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to fetch drivers ' }), { status: 500 });
  }
}
