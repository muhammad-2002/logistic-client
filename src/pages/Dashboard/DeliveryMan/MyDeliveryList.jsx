import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdCancelPresentation, MdOutlineLocationCity } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isCanceled, setCanceled] = useState(false);
  const [isDelivered, setDelivered] = useState(false);

  const fetchParcels = async () => {
    try {
      const response = await axiosSecure.get(
        `/parcels?deliveryMan=${user.email}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["deliver-parcel"],
    queryFn: fetchParcels,
  });

  const updateParcelStatus = async (id, status) => {
    // if (parcels.status === "Canceled") {
    //   Swal.fire("Sorry Allready Canceled");
    // }
    try {
      const response = await axiosSecure.put(`/parcels/${id}`, { status });
      if (response.data.modifiedCount > 0) {
        refetch();
        // Assuming parcels are updated directly in the query cache
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Parcel has been marked as ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateParcelStatus(id, "Cancelled");
        setCanceled(true);
      }
    });
  };

  const handleDeliver = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this parcel as delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deliver it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateParcelStatus(id, "Delivered");
        setDelivered(true);
      }
    });
  };

  // const viewLocation = (latitude, longitude) => {
  //   history.push(`/map-view?lat=${latitude}&lng=${longitude}`);
  // };

  return (
    <div className="text-black p-7  max-w-full shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"My"} boldText={"Deliveries"}></HeadingComp>
      </div>

      <div className="">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-1 py-2 border">Booked User's Name</th>
              <th className="px-1 py-2 border">Receiver's Name</th>
              <th className="px-1 py-2 border">Booked User's Phone</th>
              <th className="px-1 py-2 border">Requested Delivery Date</th>
              <th className="px-1 py-2 border">Approximate Delivery Date</th>
              <th className="px-1 py-2 border">Receiver's Phone Number</th>
              <th className="px-1 py-2 border">Receiver's Address</th>
              <th className="px-1 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="px-1 py-2 border">{parcel.name}</td>
                <td className="px-1 py-2 border">{parcel.receiverName}</td>
                <td className="px-1 py-2 border">{parcel.phoneNumber}</td>
                <td className="px-1 py-2 border">
                  {new Date(parcel.requestedDeliveryDate).toLocaleDateString()}
                </td>
                <td className="px-1 py-2 border">
                  {new Date(
                    parcel.approximateDeliveryDate
                  ).toLocaleDateString()}
                </td>
                <td className="px-1 py-2 border">
                  {parcel.receiverPhoneNumber}
                </td>
                <td className="px-1 py-2 border">
                  {parcel.parcelDeliveryAddress}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center justify-center space-x-1">
                    {parcel.status === "On The Way" && (
                      <>
                        <button
                          onClick={() =>
                            viewLocation(parcel.latitude, parcel.longitude)
                          }
                          className="text-white hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E] text-xl rounded-md text-center"
                        >
                          <MdOutlineLocationCity />
                        </button>
                        <button
                          onClick={() => handleCancel(parcel._id)}
                          className="bg-red-500 hover:bg-red-700 text-white text-xl text-center rounded-md"
                        >
                          <MdCancelPresentation />
                        </button>
                        <button
                          onClick={() => handleDeliver(parcel._id)}
                          className="bg-green-500 hover:bg-green-700 text-white text-xl text-center rounded-md"
                        >
                          <CiDeliveryTruck />
                        </button>
                      </>
                    )}
                    {parcel.status === "Cancelled" && (
                      <button
                        disabled
                        className="bg-gray-400 text-white text-sm text-center rounded-md"
                      >
                        Cancelled
                      </button>
                    )}
                    {parcel.status === "Delivered" && (
                      <button
                        disabled
                        className="bg-gray-400 text-white text-sm text-center rounded-md"
                      >
                        Delivered
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
