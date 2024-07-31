import { createClient } from "@supabase/supabase-js";

export const connectDb = async () => {
  const supabase = createClient(
    process.env.DATABASE_URL,
    process.env.SUPABASE_KEY
  );
  return supabase;
};
