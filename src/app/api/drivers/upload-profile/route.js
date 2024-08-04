import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export const config = {
  runtime: "edge",
};

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("profile_pic");
    const driverId = formData.get("driverId");

    console.log("Received file:", file);
    console.log("Received driverId:", driverId);

    if (!file || !driverId) {
      console.log("Missing file or driverId");
      return NextResponse.json(
        { error: "No file or driverId provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(`profile_pics/${file.name}`, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.log("Supabase upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/uploads/profile_pics/${file.name}`;

    // Update the database
    await prisma.driver.update({
      where: { driver_id: driverId },
      data: { profile_pic_url: profilePicUrl },
    });

    console.log("Profile updated successfully");
    return NextResponse.json({ profilePicUrl });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
