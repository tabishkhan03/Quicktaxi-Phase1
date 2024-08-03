import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { phoneNumber, driver_id } = body;

    console.log("Received data:", { phoneNumber, driver_id });

    if (!driver_id || !phoneNumber) {
      console.error("Missing driver_id or phoneNumber");
      return new Response(
        JSON.stringify({ error: "driver_id and phone number are required" }),
        { status: 400 }
      );
    }

    const driver = await prisma.driver.findUnique({
      where: { driver_id: driver_id },
    });

    if (!driver) {
      console.error("Driver not found with ID:", driver_id);
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    console.log("Driver found:", driver);

    if (driver.phone === null) {
      const updatedDriver = await prisma.driver.update({
        where: { driver_id: driver_id },
        data: { phone: phoneNumber },
      });
      console.log("Updated driver:", updatedDriver);

      return new Response(
        JSON.stringify({
          message: "Phone number updated successfully",
        }),
        { status: 200 }
      );
    } else if (driver.phone === phoneNumber) {
      console.log("Phone number matches the logged-in user");
      return new Response(
        JSON.stringify({
          message: "Phone number matches the logged-in user",
        }),
        { status: 200 }
      );
    } else {
      console.error("Phone number doesn't match");
      return new Response(
        JSON.stringify({ error: "Phone number doesn't match" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating phone number:", error);
    return new Response(
      JSON.stringify({
        error: "Error updating phone number",
        details: error.message,
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}