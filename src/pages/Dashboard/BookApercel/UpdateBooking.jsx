import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const UpdateBooking = () => {
  const pram = useParams();
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const calculatePrice = (weight) => {
    let price = 0;
    if (weight <= 1) {
      price = 50;
    } else if (weight <= 2) {
      price = 100;
    } else {
      price = 150;
    }
    setPrice(price);
  };
  // Watch the parcel weight field to calculate price dynamically
  watch(({ parcelWeight }) => calculatePrice(parcelWeight));
  const onSubmit = async (data) => {
    const price = parseFloat(data.price.split(" ")[0]);

    const bookParcelObj = {
      ...data,
      email: user.email,
      name: user.displayName,
      price: price,
      status: "pending",
    };
    try {
      const res = await axiosSecure.patch(
        `/update-parcel/${pram.id}`,
        bookParcelObj
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Booking Update has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-black p-7 shadow-xl  border">
      <div className="mb-6">
        <HeadingComp lightText={"Update"} boldText={"Booking"}></HeadingComp>
      </div>
      <div className="   ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user.displayName}
                readOnly
                className="px-4 text-sm w-full border-2 py-2 bg-gray-100"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="px-4 w-full border-2 text-sm py-2 bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                type="tel"
                placeholder="Enter your phone number"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-700">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Parcel Type</span>
              </label>
              <input
                {...register("parcelType", {
                  required: "Parcel Type is required",
                })}
                type="text"
                placeholder="Enter parcel type"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.parcelType && (
                <span className="text-sm text-red-700">
                  {errors.parcelType.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Parcel Weight (kg)</span>
              </label>
              <input
                {...register("parcelWeight", {
                  required: "Parcel Weight is required",
                  min: 0,
                })}
                type="number"
                step="0.01"
                placeholder="Enter parcel weight"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.parcelWeight && (
                <span className="text-sm text-red-700">
                  {errors.parcelWeight.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Receiver's Name</span>
              </label>
              <input
                {...register("receiverName", {
                  required: "Receiver's Name is required",
                })}
                type="text"
                placeholder="Enter receiver's name"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.receiverName && (
                <span className="text-sm text-red-700">
                  {errors.receiverName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Receiver's Phone Number</span>
              </label>
              <input
                {...register("receiverPhoneNumber", {
                  required: "Receiver's Phone Number is required",
                })}
                type="tel"
                placeholder="Enter receiver's phone number"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.receiverPhoneNumber && (
                <span className="text-sm text-red-700">
                  {errors.receiverPhoneNumber.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Parcel Delivery Address</span>
              </label>
              <input
                {...register("parcelDeliveryAddress", {
                  required: "Parcel Delivery Address is required",
                })}
                type="text"
                placeholder="Enter parcel delivery address"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.parcelDeliveryAddress && (
                <span className="text-sm text-red-700">
                  {errors.parcelDeliveryAddress.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Requested Delivery Date</span>
              </label>
              <input
                {...register("requestedDeliveryDate", {
                  required: "Requested Delivery Date is required",
                })}
                type="date"
                placeholder="Select requested delivery date"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.requestedDeliveryDate && (
                <span className="text-sm text-red-700">
                  {errors.requestedDeliveryDate.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Delivery Address Latitude</span>
              </label>
              <input
                {...register("latitude", { required: "Latitude is required" })}
                type="number"
                step="0.000001"
                placeholder="Enter latitude (e.g. 21.121365)"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.latitude && (
                <span className="text-sm text-red-700">
                  {errors.latitude.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Delivery Address Longitude</span>
              </label>
              <input
                {...register("longitude", {
                  required: "Longitude is required",
                })}
                type="number"
                step="0.000001"
                placeholder="Enter longitude (e.g. 21.121365)"
                className="px-4 w-full border-2 text-sm py-2"
              />
              {errors.longitude && (
                <span className="text-sm text-red-700">
                  {errors.longitude.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price")}
                type="text"
                value={`${price} Tk`}
                readOnly
                className="px-4 w-full border-2 text-sm py-2 bg-gray-100"
              />
            </div>
          </div>

          <div className="form-control text-xl mt-4">
            <input
              type="submit"
              className="btn text-white hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E]"
              value="Update Booking"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooking;
