import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { driver_id, city, name, gender } = await request.json();
    console.log("Received data:", { driver_id, city, name, gender });

    const updatedDriver = await prisma.driver.update({
      where: {
        driver_id: driver_id,
      },
      data: {
        city: city,
        gender: gender,
        name: name,
      },
    });

    console.log("Updated driver:", updatedDriver);

    return new Response(JSON.stringify(updatedDriver), { status: 200 });
  } catch (error) {
    console.error("Error updating driver:", error);
    return new Response(JSON.stringify({ error: "Unable to update driver" }), {
      status: 500,
    });
  }
}
