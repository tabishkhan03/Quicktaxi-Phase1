import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {  
  try {  
    const headers = new Headers({  
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0', 
      'Pragma': 'no-cache',  
      'Expires': '0',  
      'Content-Type': 'application/json',
      'Surrogate-Control': 'no-store',
      'x-vercel-cache-control': 'no-cache',
      'X-Custom-Revalidate': request.headers.get('X-Custom-Revalidate') || '' // Reflect custom header back
    });  

    const allTrips = await prisma.trip.findMany({  
      where: { status: "ready" },  
    });  

    return new Response(JSON.stringify(allTrips), {  
      status: 200,  
      headers: headers,  
    });  
  } catch (error) {  
    console.error("Unable to fetch trips:", error);  
    return new Response(JSON.stringify({ error: "Unable to fetch trips" }), {  
      status: 500,  
      headers: {  
        'Content-Type': 'application/json',  
      },  
    });  
  } finally {  
    await prisma.$disconnect();  
  }  
}