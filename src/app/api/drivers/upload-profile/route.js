import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure multer
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, so `multer` can handle it
  },
};

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

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    return;
  }

  try {
    // Run multer middleware
    await runMiddleware(req, res, upload.single("profile_pic"));

    const { file } = req;

    // Manually parse the request body to get the driverId
    const driverId = req.body.driverId;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`profile_pics/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/uploads/profile_pics/${file.originalname}`;

    // Update driver profile picture URL in the database
    const updatedDriver = await prisma.driver.update({
      where: { driver_id: parseInt(driverId) },
      data: { profile_pic_url: profilePicUrl },
    });

    res.json({ profilePicUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
