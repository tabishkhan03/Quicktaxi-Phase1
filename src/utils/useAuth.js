import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check initial user session
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.user ?? null);
      setLoading(false);
    };

    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    setLoading(true);
    setError("");
    const response = await supabase.auth.signUp({ email, password });
    console.log(response.data);
    if (response.error) {
      setError(response.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    return response;
  };

  const logIn = async (email, password) => {
    setLoading(true);
    setError("");
    // console.log(email,password)
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("error", response);
    if (response.error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log("response in authjs", response);
    return response;
  };

  const logOut = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const signInWithOAuth = async (provider) => {
    setLoading(true);
    setError("");
    const response = await supabase.auth.signInWithOAuth({
      provider,
      // options: { redirectTo: "/home-new" },
    });
    console.log(response.data);
    if (response.error) {
      setError(response.error.message);
    }
    setLoading(false);
    return response;
  };

  return {
    user,
    loading,
    error,
    signUp,
    logIn,
    logOut,
    signInWithOAuth,
  };
};

export default useAuth;
