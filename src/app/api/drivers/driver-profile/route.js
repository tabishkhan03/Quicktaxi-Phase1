import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("In API's Body: ", body);
    const { driver_id, email, password } = body;

    // Validate the incoming request body
    if (!driver_id || !email || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Create a new driver in the database
    const newDriver = await prisma.driver.create({
      data: {
        driver_id: driver_id, // Use the provided driver_id
        email: email,
        password: password,
      },
    });

    return NextResponse.json(
      { message: "Driver created successfully", driver: newDriver },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating driver:", error);
    return NextResponse.json(
      { error: "Error creating driver", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
