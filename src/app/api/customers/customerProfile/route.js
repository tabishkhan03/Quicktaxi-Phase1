import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    const { email, password } = body;

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: {
        email: email,
        password: password,
      },
    });

    console.log(newCustomer);

    return NextResponse.json(
      { message: "Customer created successfully", customer: newCustomer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Error creating customer", details: error.message },
      { status: 500 }
    );
  } finally {
    // Ensure the connection is closed properly.
    await prisma.$disconnect();
  }
}
