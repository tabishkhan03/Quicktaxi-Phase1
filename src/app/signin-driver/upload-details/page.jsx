"use client";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FaCar, FaIdCard } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios";

function DriverForm() {
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [taxiLicensePlate, setTaxiLicensePlate] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put("/api/drivers/driverProfile", {
      name,
      license_number: licenseNumber,
      taxi_license_plate: taxiLicensePlate,
      bank_document_type: bankAccountNumber,
    });

    if (response.ok) {
      console.log("Driver created successfully:", response);
    } else {
      console.error("Error creating driver:", response);
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
            Create your driver account
          </p>

          <div className="relative">
            <input
              placeholder="Name"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TfiEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-5" />
          </div>

          <div className="relative">
            <input
              placeholder="License Number"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold"
              id="licenseNumber"
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-5" />
          </div>

          <div className="relative">
            <input
              placeholder="Taxi License Plate"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold"
              id="taxiLicensePlate"
              type="text"
              value={taxiLicensePlate}
              onChange={(e) => setTaxiLicensePlate(e.target.value)}
              required
            />
            <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-5" />
          </div>

          <div className="relative">
            <input
              placeholder="Bank Account Number"
              className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold"
              id="bankAccountNumber"
              type="text"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              required
            />
            <FaMoneyCheckAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-5" />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 font-semibold justify-center w-full"
          >
            <span className="ml-auto text-lg">Register as Driver</span>
            <FaArrowRight className="border p-2 bg-white rounded-full w-12 h-12 text-right ml-auto border-black" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default DriverForm;
