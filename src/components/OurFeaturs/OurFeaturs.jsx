import { CountUp } from "countup.js";
import React, { useEffect, useRef } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import HeadingComp from "../shared/HeadingComp/Headingcomp";

const OurFeatures = () => {
  const counterRef1 = useRef(null);
  const counterRef2 = useRef(null);
  const counterRef3 = useRef(null);

  useEffect(() => {
    const createObserver = (ref, endValue) => {
      const countUpInstance = new CountUp(ref.current, endValue);
      return new IntersectionObserver(
        (entries, observer) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            countUpInstance.start();
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
    };

    const observer1 = createObserver(counterRef1, 2000000);
    const observer2 = createObserver(counterRef2, 7500000);
    const observer3 = createObserver(counterRef3, 172999999);

    if (counterRef1.current) observer1.observe(counterRef1.current);
    if (counterRef2.current) observer2.observe(counterRef2.current);
    if (counterRef3.current) observer3.observe(counterRef3.current);

    return () => {
      if (counterRef1.current) observer1.unobserve(counterRef1.current);
      if (counterRef2.current) observer2.unobserve(counterRef2.current);
      if (counterRef3.current) observer3.unobserve(counterRef3.current);
    };
  }, []);

  return (
    <div className="lg:my-9 mt-[500px] w-[90%] mx-auto">
      <HeadingComp lightText={"Our"} boldText={"features"}></HeadingComp>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 mt-12">
        <div className="flex">
          <div className="w-[25%] flex justify-between items-start">
            <img
              src="https://dtlogistics.wpenginepowered.com/wp-content/uploads/2016/11/icon4.png"
              alt="PAKAGING & STORAGE"
            />
          </div>
          <div className="w-[70%]">
            <h1 className="font-bold text-xl">PAKAGING & STORAGE</h1>
            <hr className="w-[70px] border-[#FDC300] border-[2px] my-2"></hr>
            <p className="font-normal">
              Efficiently package and store your parcels with our secure,
              organized, and reliable services, ensuring your items remain in
              perfect condition until delivery.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-[25%] flex justify-between items-start">
            <img
              src="https://dtlogistics.wpenginepowered.com/wp-content/uploads/2016/11/icon3.png"
              alt="SAME DAY DELIVERY"
            />
          </div>
          <div className="w-[70%]">
            <h1 className="font-bold text-xl">SAME DAY DELIVERY</h1>
            <hr className="w-[70px] border-[#FDC300] border-[2px] my-2"></hr>
            <p className="font-normal">
              Experience the convenience of our same day delivery service,
              ensuring your parcels reach their destination swiftly and reliably
              on the day you send them.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-[25%] flex justify-between items-start">
            <img
              src="https://dtlogistics.wpenginepowered.com/wp-content/uploads/2016/11/icon6.png"
              alt="MULTI-MODAL TRANSPORT"
            />
          </div>
          <div className="w-[70%]">
            <h1 className="font-bold text-xl">MULTI-MODAL TRANSPORT</h1>
            <hr className="w-[70px] border-[#FDC300] border-[2px] my-2"></hr>
            <p className="font-normal">
              Optimize your parcel deliveries with our multi-modal transport
              solutions, combining air, sea, and land routes to ensure the most
              efficient and flexible shipping options.
            </p>
          </div>
        </div>
      </div>

      <section className="p-6 my-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 text-5xl">
              <TbBrandBooking />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p
                ref={counterRef1}
                className="text-3xl font-semibold text-[#1874C1] leading-none"
              >
                0
              </p>
              <hr className="w-[40px] border-[#FDC300] border-[2px] my-2"></hr>
              <p className="capitalize font-light">Total Parcel Booked</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle text-5xl items-center rounded-lg sm:p-4">
              <CiDeliveryTruck />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p
                ref={counterRef2}
                className="text-3xl font-semibold leading-none text-[#1874C1]"
              >
                0
              </p>
              <hr className="w-[40px] border-[#FDC300] border-[2px] my-2"></hr>
              <p className="capitalize font-light">Total Parcel Delivered</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center items-center text-5xl t p-2 align-middle rounded-lg sm:p-4">
              <FaRegUser />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p
                ref={counterRef3}
                className="text-3xl font-semibold leading-none text-[#1874C1]"
              >
                0
              </p>
              <hr className="w-[40px] border-[#FDC300] border-[2px] my-2"></hr>
              <p className="capitalize font-light">
                Total People Using Your App
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFeatures;
