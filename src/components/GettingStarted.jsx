"use client"
import Image from "next/image";
import React from "react";

const GettingStarted = () => {
  return (
    <>
      <div className="relative ">
        <div className="absolute h-[82vh] w-screen bg-transparent flex flex-col items-center justify-center z-10">
          <Image src="/drag.svg" alt="" width={78} height={78} />
          <span className="font-medium text-lg pt-10">
            Drag & drop to get started
          </span>
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
