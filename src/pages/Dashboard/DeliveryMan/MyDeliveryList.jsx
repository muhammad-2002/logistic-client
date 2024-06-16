import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdCancelPresentation, MdOutlineLocationCity } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";
import LocationModal from "./LocationModat"; // Import the LocationModal component

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [review, setReview] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null); // State to track the selected parcel for location modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      setReview(res.data);
    };
    fetchReviews();
  }, [user.email]);

  const fetchParcels = async () => {
    const response = await axiosSecure.get(
      `/parcels?deliveryMan=${user.email}`
    );
    return response.data;
  };

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["deliver-parcel"],
    queryFn: fetchParcels,
  });

  const updateParcelStatus = async (id, status) => {
    try {
      const response = await axiosSecure.put(`/parcels/${id}`, { status });
      if (response.data.modifiedCount > 0) {
        refetch();
        if (status === "Delivered") {
          // Update the delivery count for the delivery man
          await axiosSecure.patch(`/delivery-man/${user?.email}`);
        }

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

  const handleCancel = (id) => {
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
      }
    });
  };

  const viewLocation = (latitude, longitude) => {
    setSelectedParcel({ latitude, longitude });
    setIsModalOpen(true);
  };

  return (
    <div className="text-black p-7 max-w-full shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"My"} boldText={"Deliveries"} />
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
                    {parcel.status === "on the way" && (
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
      {selectedParcel && (
        <LocationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          latitude={selectedParcel.latitude}
          longitude={selectedParcel.longitude}
        />
      )}
    </div>
  );
};

export default MyDeliveryList;
