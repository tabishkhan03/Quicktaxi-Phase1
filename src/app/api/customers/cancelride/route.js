// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { trip_id } = req.body;

//   if (!trip_id) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const updatedTrip = await prisma.trip.update({
//       where: { trip_id: parseInt(trip_id) },
//       data: { status: "canceled" },
//     });

//     res
//       .status(200)
//       .json({ message: "Trip canceled successfully", trip: updatedTrip });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error canceling trip", details: error.message });
//   }
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const { trip_id } = await request.json();

    if (!trip_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const updatedTrip = await prisma.trip.update({
      where: { trip_id: parseInt(trip_id) },
      data: { status: "canceled" },
    });

    return new Response(
      JSON.stringify({
        message: "Trip canceled successfully",
        trip: updatedTrip,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error canceling trip:", error);
    return new Response(
      JSON.stringify({ error: "Error canceling trip", details: error.message }),
      { status: 500 }
    );
  }
}
