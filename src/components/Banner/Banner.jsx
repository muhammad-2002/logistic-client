import React from "react";
import { BsFillSendFill } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="relative min-h-[calc(100vh-74px)] z-10 w-full">
      {/* <div className="absolute inset-0 bg-black opacity-50 z-10"></div> */}
      <img
        src="https://img.freepik.com/premium-photo/digital-technology-background-3d-rendering_50883-112.jpg?w=740"
        alt="Banner"
        className="absolute inset-0 w-full h-[650px] md:h-[650px]  lg:h-full object-fill z-0"
      />

      <div className="flex flex-col lg:flex-row justify-between  w-full absolute z-50">
        <div className="lg:w-1/2 w-full p-6 flex justify-center items-center ">
          <div className="space-y-5">
            <h1 className="lg:text-7xl md:text-4xl text-3xl font-bold text-center md:text-left text-white">
              <span className=" text-[#00BEF2]">Deliver</span> The Goods On Time
            </h1>
            <p className="text-white font-medium text-center md:text-left">
              Ensuring timely delivery of goods, providing reliability and
              efficiency for all your logistical needs
            </p>
            <div className="flex rounded-full  ">
              <input
                className="md:py-4 py-2  px-4 md:pr-36 lg:pr-60 -pr-5 rounded-l-md outline-none"
                placeholder="Search Here....."
                type="text"
              />
              <div
                className=" bg-[#00BEF2]  hover:drop-shadow-2xl  shadow-white text-white md:py-4 py-2 outline-none px-4 rounded-r-md flex justify-center items-center"
                type="button"
              >
                <BsFillSendFill className=" text-[20px]"></BsFillSendFill>
              </div>
            </div>
            <div className="md:flex">
              <div className="flex gap-3 ">
                <h1 className="text-white">Fast Delivery </h1>
                <h1 className="text-white">Stock Products </h1>
                <h1 className="text-white">Network </h1>
                <h1 className="text-white">Client</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2  w-full md:w-[70%] md:mx-auto md:-mt-16 lg:mt-0  p-6">
          <img className="w-full z-10 " src="/src/assets/truck-1.png"></img>
        </div>
      </div>
    </div>
  );
};

export default Banner;
