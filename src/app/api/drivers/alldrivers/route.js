import { supabase } from "@/utils/supabase"; // Adjust the path as necessary
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, user_loc, user_dis, status } = body; //this are the table in the data base

    if (!user_id || !user_loc || !user_dis || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("trip") //plzz enter the the database table of the supabase correctly
      .insert([{ user_id, user_loc, user_dis, status }]);

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    // Fetch the last inserted record for the given userID
    const { data, error: fetchError } = await supabase
      .from("trip")
      .select("*")
      .eq("user_id", user_id)
      .order("tripid", { ascending: false }) // Ensure sorting by creation time
      .limit(1)
      .single();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }

    return NextResponse.json(
      { message: "Trip info inserted successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//this the api to update the the data base in the code
export async function PUT(req) {
  try {
    const body = await req.json();
    const { tripid, status } = body;

    if (!tripid || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("trip")
      .update({ status })
      .eq("tripid", tripid)
      .single();

    if (error) throw error;

    return NextResponse.json(
      { message: "Trip info updated successfully", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const alldrivers = await prisma.driver.findMany({
      include: {
        taxis: true,
      },
    });
    console.log(alldrivers);
    return new Response(JSON.stringify(alldrivers), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Unable to fetch drivers " }), {
      status: 500,
    });
  }
}
