import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { phoneNumber, customer_id } = body;

    console.log("Received data:", { phoneNumber, customer_id });

    if (!customer_id || !phoneNumber) {
      console.error("Missing customer_id or phoneNumber");
      return new Response(
        JSON.stringify({ error: "User ID and phone number are required" }),
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { customer_id: customer_id },
    });

    if (!customer) {
      console.error("Customer not found with ID:", customer_id);
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    console.log("Customer found:", customer);

    if (customer.phone === null) {
      const updatedCustomer = await prisma.customer.update({
        where: { customer_id: customer_id },
        data: { phone: phoneNumber },
      });
      console.log("Updated Customer:", updatedCustomer);

      return new Response(
        JSON.stringify({
          message: "Phone number updated successfully",
        }),
        { status: 200 }
      );
    } else if (customer.phone === phoneNumber) {
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