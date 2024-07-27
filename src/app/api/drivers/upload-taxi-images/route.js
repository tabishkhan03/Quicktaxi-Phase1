import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma and Supabase clients
const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure multer for file handling
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to run middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Main handler function
const handler = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    return;
  }

  try {
    // Run multer middleware to handle file uploads
    await runMiddleware(
      req,
      res,
      upload.fields([
        { name: "photo_front" },
        { name: "photo_back" },
        { name: "photo_inside" },
      ])
    );

    const { files } = req;
    const { taxiId } = req.body;

    if (
      !files ||
      !files.photo_front ||
      !files.photo_back ||
      !files.photo_inside
    ) {
      res.status(400).json({ error: "Required files not provided" });
      return;
    }

    const frontFile = files.photo_front[0];
    const backFile = files.photo_back[0];
    const insideFile = files.photo_inside[0];

    // Upload front photo file to Supabase
    const { data: frontData, error: frontError } = await supabase.storage
      .from("taxi-photos")
      .upload(`photos/front/${frontFile.originalname}`, frontFile.buffer, {
        contentType: frontFile.mimetype,
      });

    if (frontError) {
      throw frontError;
    }

    // Upload back photo file to Supabase
    const { data: backData, error: backError } = await supabase.storage
      .from("taxi-photos")
      .upload(`photos/back/${backFile.originalname}`, backFile.buffer, {
        contentType: backFile.mimetype,
      });

    if (backError) {
      throw backError;
    }

    // Upload inside photo file to Supabase
    const { data: insideData, error: insideError } = await supabase.storage
      .from("taxi-photos")
      .upload(`photos/inside/${insideFile.originalname}`, insideFile.buffer, {
        contentType: insideFile.mimetype,
      });

    if (insideError) {
      throw insideError;
    }

    // Construct URLs for the uploaded files
    const frontUrl = `${supabaseUrl}/storage/v1/object/public/taxi-photos/photos/front/${frontFile.originalname}`;
    const backUrl = `${supabaseUrl}/storage/v1/object/public/taxi-photos/photos/back/${backFile.originalname}`;
    const insideUrl = `${supabaseUrl}/storage/v1/object/public/taxi-photos/photos/inside/${insideFile.originalname}`;

    // Update taxi record in the database
    const updatedTaxi = await prisma.taxi.update({
      where: { taxi_id: parseInt(taxiId) },
      data: {
        photo_front_url: frontUrl,
        photo_back_url: backUrl,
        photo_inside_url: insideUrl,
      },
    });

    res.json({ frontUrl, backUrl, insideUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, so `multer` can handle it
  },
};
