// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function POST(req, res) {
//   // if (req.method !== "POST") {
//   //   return res.status(405).json({ error: "Method not allowed" });
//   // }

//   const {
//     customer_id,
//     start_location,
//     end_location,
//     source_lat,
//     source_lng,
//     destination_lat,
//     destination_lng,
//     status,
//   } = req.json();

//   console.log("req.body bookride ", req.json());

//   if (
//     !customer_id ||
//     !start_location ||
//     !end_location ||
//     !source_lat ||
//     !source_lng ||
//     !destination_lat ||
//     !destination_lng ||
//     !status
//   ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const newTrip = await prisma.trip.create({
//       data: {
//         customer_id,
//         start_location,
//         end_location,
//         source_lat,
//         source_lng,
//         destination_lat,
//         destination_lng,
//         status,
//       },
//     });
//     console.log(newTrip);
//     res
//       .status(200)
//       .json({ message: "Trip booked successfully", trip: newTrip });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error booking trip", details: error.message });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const {
      customer_id,
      start_location,
      end_location,
      source_lat,
      source_lng,
      destination_lat,
      destination_lng,
      status,
      start_time,
    } = await request.json();

    console.log("Request body received for booking ride:", {
      customer_id,
      start_location,
      end_location,
      source_lat,
      source_lng,
      destination_lat,
      destination_lng,
      status,
      start_time,
    });

    if (
      !customer_id ||
      !start_location ||
      !end_location ||
      !source_lat ||
      !source_lng ||
      !destination_lat ||
      !destination_lng ||
      !status ||
      !start_time
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newTrip = await prisma.trip.create({
      data: {
        customer_id,
        start_location,
        end_location,
        source_lat,
        source_lng,
        destination_lat,
        destination_lng,
        status,
        start_time: new Date(start_time),
      },
    });

    console.log("New trip booked:", newTrip);

    return new Response(
      JSON.stringify({ message: "Trip booked successfully", trip: newTrip }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking trip:", error);
    return new Response(
      JSON.stringify({ error: "Error booking trip", details: error.message }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
