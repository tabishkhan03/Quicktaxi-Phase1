import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate the incoming request body
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Create a new driver in the database
    const newDriver = await prisma.driver.create({
      data: {
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

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      driver_id,
      name,
      license_number,
      taxi_license_plate,
      bank_document_type,
    } = body;

    console.log(
      driver_id,
      name,
      license_number,
      taxi_license_plate,
      bank_document_type
    );
    // Validate the incoming request body
    if (
      !driver_id ||
      !name ||
      !license_number ||
      !taxi_license_plate ||
      !bank_document_type
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Create driver and taxi records in Prisma
    const updatedDriver = await prisma.driver.update({
      where: { driver_id: driver_id },
      data: {
        name: name,
        license_number: license_number,
        bank_document_type: bank_document_type, // Storing bank account number
      },
    });

    const newTaxi = await prisma.taxi.create({
      data: {
        driver_id: driver_id,
        license_plate: taxi_license_plate,
        model: "", // Add default or required values
        make: "", // Add default or required values
        year: 0, // Add default or required values
      },
    });

    return NextResponse.json(
      {
        message: "Driver and Taxi details updated successfully",
        driver: updatedDriver,
        taxi: newTaxi,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating driver details:", error);
    return NextResponse.json(
      { error: "Error updating driver details", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
