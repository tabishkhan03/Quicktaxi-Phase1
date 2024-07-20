import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    customer_id,
    driver_id,
    taxi_id,
    start_location,
    end_location,
    source_lat,
    source_lng,
    destination_lat,
    destination_lng,
    start_time,
    status,
  } = req.body;

  if (
    !customer_id ||
    !driver_id ||
    !taxi_id ||
    !start_location ||
    !end_location ||
    !source_lat ||
    !source_lng ||
    !destination_lat ||
    !destination_lng ||
    !start_time ||
    !status
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newTrip = await prisma.trip.create({
      data: {
        customer_id,
        driver_id,
        taxi_id,
        start_location,
        end_location,
        source_lat,
        source_lng,
        destination_lat,
        destination_lng,
        start_time: new Date(start_time),
        status,
      },
    });

    res
      .status(200)
      .json({ message: "Trip booked successfully", trip: newTrip });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error booking trip", details: error.message });
  }
}
