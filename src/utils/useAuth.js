import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  const signUp = async (email, password, userType) => {
    setLoading(true);
    setError("");
    const response = await supabase.auth.signUp({ email, password });
    // console.log(response.data);
    if (response.error) {
      setError(response.error.message);
      setLoading(false);
      return;
    }

    // After successful sign-up, insert user details into the appropriate table
    // await insertUserDetails(userType);
    setLoading(false);
  };

  const logIn = async (email, password, userType) => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // After successful login, insert user details into the appropriate table
    // await insertUserDetails(userType);
    setLoading(false);
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

  const signInWithOAuth = async (provider, userType) => {
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
  };

  // const insertUserDetails = async (userType) => {
  //   if (!user) return;

  //   const userId = user.id;
  //   console.log(user);

  //   try {
  //     if (userType === "customer") {
  //       await prisma.customer.create({
  //         data: {
  //           customer_id: userId,
  //           email: user.email,
  //           name: "", // Add default or empty values as needed
  //           phone: "", // Add default or empty values as needed
  //           password: "", // Ensure to handle passwords properly
  //           registration_date: new Date(),
  //         },
  //       });
  //     } else if (userType === "driver") {
  //       await prisma.driver.create({
  //         data: {
  //           driver_id: userId,
  //           email: user.email,
  //           name: "", // Add default or empty values as needed
  //           phone: "", // Add default or empty values as needed
  //           password: "", // Ensure to handle passwords properly
  //           license_number: "", // Add default or empty values as needed
  //           registration_date: new Date(),
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     setError("Error inserting user details: " + err.message);
  //   }
  // };

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
