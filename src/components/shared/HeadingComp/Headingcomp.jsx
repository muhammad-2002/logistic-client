import React from "react";

const HeadingComp = ({ lightText, boldText }) => {
  return (
    <div className="space-y-3">
      <h1 className=" text-center uppercase text-2xl font-bold open-sans ">
        <span className="font-light">{lightText} </span>
        {boldText}
      </h1>
      <div className="relative">
        <hr className="max-w-[400px] mx-auto  "></hr>
        <div className="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] w-10 border-[#FDC300]"></div>
      </div>
    </div>
  );
};

export default HeadingComp;
