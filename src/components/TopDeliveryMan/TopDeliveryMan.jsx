import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import usePublicAxiosSecure from "../shared/CustomHook/usePublicAxiosSecure";
import HeadingComp from "../shared/HeadingComp/Headingcomp";

const TopDeliveryMan = () => {
  const axiosPublicSecure = usePublicAxiosSecure();
  const [topMan, setTopMan] = useState([]);
  console.log(topMan);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPublicSecure.get("/top-delivery-man");
        setTopMan(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [axiosPublicSecure]);
  return (
    <div className="w-[90%] mx-auto mt-10">
      <HeadingComp lightText={"Top 3"} boldText={" Delivery Man"}></HeadingComp>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-3 gap-4">
        {topMan.map((item) => (
          <div
            key={item._id}
            className=" p-4 border sm:flex sm:space-x-6  dark:bg-gray-50 dark:text-gray-800"
          >
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
              <img
                src={`${item.image}`}
                alt=""
                className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <span className="text-sm dark:text-gray-600">{item.role}</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center space-x-2">
                  <span className="dark:text-gray-600">
                    Parcel Delivered :{item?.numberOfParcelsDelivered}
                  </span>
                </span>
                <span className="flex items-center space-x-2">
                  <Rating
                    initialRating={item.averageRating}
                    readonly
                    emptySymbol={<FaRegStar className="text-yellow-500" />}
                    fullSymbol={<FaStar className="text-yellow-500" />}
                  ></Rating>
                  <span className="dark:text-gray-600 flex items-center justify-center">
                    Rating :{item.averageRating}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;
