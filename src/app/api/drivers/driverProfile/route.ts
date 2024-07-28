import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDriverSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(6),
  license_number: z.string().min(1),
  bank_document_type: z.string().optional(),
  bank_document_url: z.string().url().optional(),
  driving_license_back_url: z.string().url().optional(),
  driving_license_front_url: z.string().url().optional(),
  profile_pic_url: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createDriverSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newDriver = await prisma.driver.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: body.password,
        license_number: body.license_number,
        bank_document_type: body.bank_document_type,
        bank_document_url: body.bank_document_url,
        driving_license_back_url: body.driving_license_back_url,
        driving_license_front_url: body.driving_license_front_url,
        profile_pic_url: body.profile_pic_url,
      },
    });

    return NextResponse.json({ message: "Driver created successfully", driver: newDriver }, { status: 201 });
  } catch (error) {
    console.error("Error creating driver:", error);
    return NextResponse.json({ error: "Error creating driver", details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
