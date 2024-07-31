import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req) {
  try {
    const formData = await req.formData();
    console.log("FormData entries:", Array.from(formData.entries()));

    const photoFront = formData.get("photo_front");
    const photoBack = formData.get("photo_back");
    const photoInside = formData.get("photo_inside");
    const taxiId = formData.get("taxiId");

    console.log("Received photo front:", photoFront);
    console.log("Received photo back:", photoBack);
    console.log("Received photo inside:", photoInside);
    console.log("Received taxiId:", taxiId);

    if (!photoFront || !photoBack || !photoInside || !taxiId) {
      console.log("Missing required files or taxiId");
      return NextResponse.json(
        {
          error: "Required files or taxiId not provided",
          photoFront: !!photoFront,
          photoBack: !!photoBack,
          photoInside: !!photoInside,
          taxiId: !!taxiId,
        },
        { status: 400 }
      );
    }

    // Upload front photo to Supabase
    const frontBuffer = await photoFront.arrayBuffer();
    const { error: frontError } = await supabase.storage
      .from("uploads")
      .upload(`taxi_pics/front/${photoFront.name}`, frontBuffer, {
        contentType: photoFront.type,
      });

    if (frontError) {
      console.log("Supabase upload error (front):", frontError);
      return NextResponse.json({ error: frontError.message }, { status: 500 });
    }

    // Upload back photo to Supabase
    const backBuffer = await photoBack.arrayBuffer();
    const { error: backError } = await supabase.storage
      .from("uploads")
      .upload(`taxi_pics/back/${photoBack.name}`, backBuffer, {
        contentType: photoBack.type,
      });

    if (backError) {
      console.log("Supabase upload error (back):", backError);
      return NextResponse.json({ error: backError.message }, { status: 500 });
    }

    // Upload inside photo to Supabase
    const insideBuffer = await photoInside.arrayBuffer();
    const { error: insideError } = await supabase.storage
      .from("uploads")
      .upload(`taxi_pics/inside/${photoInside.name}`, insideBuffer, {
        contentType: photoInside.type,
      });

    if (insideError) {
      console.log("Supabase upload error (inside):", insideError);
      return NextResponse.json({ error: insideError.message }, { status: 500 });
    }

    // Construct URLs for the uploaded files
    const frontUrl = `${supabaseUrl}/storage/v1/object/public/uploads/taxi_pics/front/${photoFront.name}`;
    const backUrl = `${supabaseUrl}/storage/v1/object/public/uploads/taxi_pics/back/${photoBack.name}`;
    const insideUrl = `${supabaseUrl}/storage/v1/object/public/uploads/taxi_pics/inside/${photoInside.name}`;

    // Update taxi record in the database
    await prisma.taxi.update({
      where: { taxi_id: taxiId },
      data: {
        photo_front_url: frontUrl,
        photo_back_url: backUrl,
        photo_inside_url: insideUrl,
      },
    });

    console.log("Taxi photos updated successfully");
    return NextResponse.json({ frontUrl, backUrl, insideUrl });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
