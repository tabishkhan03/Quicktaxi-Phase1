"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaCar, FaIdCard, FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

function DriverForm() {
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [taxiLicensePlate, setTaxiLicensePlate] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [driverId, setDriverId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve driver_id from local storage
    const storedDriverId = localStorage.getItem("driver_id");
    if (storedDriverId) {
      setDriverId(storedDriverId);
    } else {
      // Redirect if driver_id is not found
      router.push("/signin-driver");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driverId) {
      console.error("Driver ID is required");
      return;
    }

    try {
      await axios.put("/api/drivers/driverProfile", {
        driver_id: driverId,
        name,
        license_number: licenseNumber,
        taxi_license_plate: taxiLicensePlate,
        bank_document_type: bankAccountNumber,
      });
      // Clear driver_id from local storage
      // localStorage.removeItem("driver_id");
      // Redirect or show success message
      router.push("/home-driver"); // Update with actual page
    } catch (error) {
      console.error("Error updating driver details:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mx-auto h-full gap-8"
    >
      <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <FaArrowLeft className="size-9 w-9" />
          <p className="text-2xl font-bold leading-tight tracking-tight text-center">
            Driver Registration
          </p>
          <p className="font-bold leading-tight tracking-tight">
            Enter your details
          </p>

          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Name"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaIdCard className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="License Number"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4"
              id="licenseNumber"
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaCar className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Taxi License Plate"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4"
              id="taxiLicensePlate"
              type="text"
              value={taxiLicensePlate}
              onChange={(e) => setTaxiLicensePlate(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaMoneyCheckAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Bank Account Number"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4"
              id="bankAccountNumber"
              type="text"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 font-semibold justify-center w-full"
          >
            <span className="ml-auto text-lg">Submit</span>
            <FaArrowRight className="border p-2 bg-white rounded-full w-12 h-12 text-right ml-auto border-black" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default DriverForm;
