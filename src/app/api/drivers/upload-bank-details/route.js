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
    console.log("Request headers:", req.headers);
    console.log("Content-Type:", req.headers.get("content-type"));

    const formData = await req.formData();
    console.log("FormData entries:", Array.from(formData.entries()));

    const file = formData.get("bank-document");
    const driverId = formData.get("driverId");

    console.log("Received file:", file);
    console.log("File type:", file ? file.type : "N/A");
    console.log("File name:", file ? file.name : "N/A");
    console.log("File size:", file ? file.size : "N/A");
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
      .upload(`bank_docs/${file.name}`, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.log("Supabase upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const bankDocumentUrl = `${supabaseUrl}/storage/v1/object/public/uploads/bank_docs/${file.name}`;

    // Update the database
    await prisma.driver.update({
      where: { driver_id: driverId },
      data: { bank_document_url: bankDocumentUrl },
    });

    console.log("Bank document updated successfully");
    return NextResponse.json({ bankDocumentUrl });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
