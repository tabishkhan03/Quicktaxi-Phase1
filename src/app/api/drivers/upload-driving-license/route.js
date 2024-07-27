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
      upload.fields([{ name: "license_front" }, { name: "license_back" }])
    );

    const { files } = req;
    const { driverId } = req.body;

    if (!files || !files.license_front || !files.license_back) {
      res.status(400).json({ error: "Required files not provided" });
      return;
    }

    const frontFile = files.license_front[0];
    const backFile = files.license_back[0];

    // Upload front license file to Supabase
    const { data: frontData, error: frontError } = await supabase.storage
      .from("driving-licenses")
      .upload(`licenses/front/${frontFile.originalname}`, frontFile.buffer, {
        contentType: frontFile.mimetype,
      });

    if (frontError) {
      throw frontError;
    }

    // Upload back license file to Supabase
    const { data: backData, error: backError } = await supabase.storage
      .from("driving-licenses")
      .upload(`licenses/back/${backFile.originalname}`, backFile.buffer, {
        contentType: backFile.mimetype,
      });

    if (backError) {
      throw backError;
    }

    // Construct URLs for the uploaded files
    const frontUrl = `${supabaseUrl}/storage/v1/object/public/uploads/driver-licenses/front/${frontFile.originalname}`;
    const backUrl = `${supabaseUrl}/storage/v1/object/public/uploads/driver-licenses/back/${backFile.originalname}`;

    // Update driver record in the database
    const updatedDriver = await prisma.driver.update({
      where: { driver_id: parseInt(driverId) },
      data: {
        driving_license_front_url: frontUrl,
        driving_license_back_url: backUrl,
      },
    });

    res.json({ frontUrl, backUrl });
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
