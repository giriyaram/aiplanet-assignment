import Image from "next/image";
import React from "react";

const CustomToast = ({ largeMessage, smallMessage }) => {
  return (
    <div className=" p-3 flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">{largeMessage} </h3>
      <p className="text-sm font-medium text-white">{smallMessage} </p>
    </div>
  );
};

export default CustomToast;
