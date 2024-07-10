import React from "react";
import Image from "next/image";

const ProfilePic = ({ name }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src="/profile.png"
          width={500}
          height={500}
          alt="Picture of the author"
          className="sm:w-16 sm:h-16 w-24 h-24 rounded-full bg-gray-500  items-center"
        />{" "}
        {name ? (
          <h1 className="text-black sm:text-2xl text-xl font-bold mt-4">
            Hi , <span className="uppercase">{name}</span>
          </h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProfilePic;
