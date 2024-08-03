"use client";

import Navbar from "../components/nav-bar";
import { useRouter } from "next/navigation";
import { options } from "../../db/db";

function Home() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-7 gap-6">
        {options.map((option, index) => (
          <button
            key={index}
            className="relative px-8 py-4 rounded-md isolation-auto z-10 font-bold border-2 border-gray-500
              hover:bg-blue-500 hover:text-white
              focus:outline-none focus:ring focus:ring-violet-300 focus:bg-blue-500 focus:text-white"
            onClick={() => navigateTo("/search")}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
