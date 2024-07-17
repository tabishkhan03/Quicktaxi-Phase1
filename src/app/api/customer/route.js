import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, user_loc, user_dis, status } = body;

    if (!user_id || !user_loc || !user_dis || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("trip")
      .insert([{ user_id, user_loc, user_dis, status }]);

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    const { data, error: fetchError } = await supabase
      .from("trip")
      .select("*")
      .eq("user_id", user_id)
      .order("tripid", { ascending: false })
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
