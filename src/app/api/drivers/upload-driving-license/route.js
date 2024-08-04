import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const runtime = "edge";

export async function PUT(req) {
  try {
    const formData = await req.formData();
    console.log("FormData entries:", Array.from(formData.entries()));

    const licenseFront = formData.get("license_front");
    const licenseBack = formData.get("license_back");
    const driverId = formData.get("driverId");

    console.log("Received license front:", licenseFront);
    console.log("Received license back:", licenseBack);
    console.log("Received driverId:", driverId);

    if (!licenseFront || !licenseBack || !driverId) {
      console.log("Missing required files or driverId");
      return NextResponse.json(
        {
          error: "Required files or driverId not provided",
          licenseFront: !!licenseFront,
          licenseBack: !!licenseBack,
          driverId: !!driverId,
        },
        { status: 400 }
      );
    }

    // Upload front license file to Supabase
    const frontBuffer = await licenseFront.arrayBuffer();
    const { error: frontError } = await supabase.storage
      .from("uploads")
      .upload(`driver_licenses/front/${licenseFront.name}`, frontBuffer, {
        contentType: licenseFront.type,
      });

    if (frontError) {
      console.log("Supabase upload error (front):", frontError);
      return NextResponse.json({ error: frontError.message }, { status: 500 });
    }

    // Upload back license file to Supabase
    const backBuffer = await licenseBack.arrayBuffer();
    const { error: backError } = await supabase.storage
      .from("uploads")
      .upload(`driver_licenses/back/${licenseBack.name}`, backBuffer, {
        contentType: licenseBack.type,
      });

    if (backError) {
      console.log("Supabase upload error (back):", backError);
      return NextResponse.json({ error: backError.message }, { status: 500 });
    }

    // Construct URLs for the uploaded files
    const frontUrl = `${supabaseUrl}/storage/v1/object/public/uploads/driver_licenses/front/${licenseFront.name}`;
    const backUrl = `${supabaseUrl}/storage/v1/object/public/uploads/driver_licenses/back/${licenseBack.name}`;

    // Update driver record in the database
    await prisma.driver.update({
      where: { driver_id: driverId },
      data: {
        driving_license_front_url: frontUrl,
        driving_license_back_url: backUrl,
      },
    });

    console.log("Driver license documents updated successfully");
    return NextResponse.json({ frontUrl, backUrl });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
