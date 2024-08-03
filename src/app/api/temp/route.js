import { supabase } from "../utils/supabase";

export async function POST(provider, userType) {
  setLoading(true);
  setError("");
  const response = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: "/home-new" },
  });
  console.log(response.data);
  await insertUserDetails(userType);
  if (response.error) {
    setError(response.error.message);
  }
  setLoading(false);
}
