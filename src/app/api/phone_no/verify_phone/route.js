import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    const { phoneNumber, email } = body;

    console.log("Phone Number", phoneNumber, "Email", email);

    if (!email || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Email and phone number are required" }),
        { status: 400 }
      );
    }

    // Find the customer by email
    const customer = await prisma.customer.findUnique({
      where: { email: email },
    });

    if (!customer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), {
        status: 404,
      });
    }

    // Update the phone number
    const updatedCustomer = await prisma.customer.update({
      where: { email: email },
      data: { phone: phoneNumber },
    });

    console.log(updatedCustomer);

    return new Response(
      JSON.stringify({
        message: "Phone number updated successfully",
        customer: updatedCustomer,
      }),
      { status: 200 }
    );
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
    // Ensure the connection is closed properly.
    await prisma.$disconnect();
  }
}