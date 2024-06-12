import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import useDeliveryMen from "../../../components/shared/CustomHook/useDeliveryMen";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const AllParcel = () => {
  const { user } = useAuth();
  const [deliveryMen] = useDeliveryMen();
  console.log(deliveryMen);
  const [selectedParcel, setSelectedParcel] = useState(null);
  console.log(selectedParcel);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const axiosSecure = useAxiosSecure();

  const fetchParcels = async () => {
    const res = await axiosSecure.get(
      `/my-parcel?startDate=${startDate}&endDate=${endDate}`
    );
    return res.data;
  };

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcel", startDate, endDate],
    queryFn: fetchParcels,

    enabled: !!startDate && !!endDate,
  });

  const handleAssign = async (
    parcelId,
    deliveryManId,
    approximateDeliveryDate,
    status,
    deliveryManEmail
  ) => {
    try {
      const response = await axiosSecure.patch(`/update-parcel/${parcelId}`, {
        deliveryManId,
        deliveryManEmail,
        approximateDeliveryDate,
        status: "on the way",
      });
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Parcel has been assigned",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        setSelectedParcel(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openManageModal = (parcel) => {
    setSelectedParcel(parcel);
  };

  const closeManageModal = () => {
    setSelectedParcel(null);
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="text-black p-7 shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"All"} boldText={"Parcels"}></HeadingComp>
      </div>
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 border"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-4 py-2 border"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/5 px-4 py-2">User's Name</th>
            <th className="w-1/5 px-4 py-2">Phone Number</th>
            <th className="w-1/5 px-4 py-2">Booking Date</th>
            <th className="w-1/5 px-4 py-2">Requested Delivery Date</th>
            <th className="w-1/5 px-4 py-2">Cost</th>
            <th className="w-1/5 px-4 py-2">Status</th>
            <th className="w-1/5 px-4 py-2">Manage</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td className="border px-4 py-2">{parcel.name}</td>
              <td className="border px-4 py-2">{parcel.phoneNumber}</td>
              <td className="border px-4 py-2">
                {new Date(parcel.booking_date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(parcel.requestedDeliveryDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{parcel.price}</td>
              <td className="border px-4 py-2">{parcel.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openManageModal(parcel)}
                  className="px-4 py-2 bg-blue-500 text-white"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Manage Parcel</h2>
            <select
              onChange={(e) => {
                const selectedDeliveryMan = deliveryMen.find(
                  (dm) => dm._id === e.target.value
                );
                setSelectedParcel({
                  ...selectedParcel,
                  deliveryManId: selectedDeliveryMan._id,
                  deliveryManEmail: selectedDeliveryMan.email,
                });
              }}
              className="px-4 py-2 border mb-4 w-full"
            >
              <option value="">Select Delivery Man</option>
              {deliveryMen.map((deliveryMan) => (
                <option key={deliveryMan._id} value={deliveryMan._id}>
                  {deliveryMan.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              onChange={(e) =>
                setSelectedParcel({
                  ...selectedParcel,
                  approximateDeliveryDate: e.target.value,
                })
              }
              className="px-4 py-2 border mb-4 w-full"
            />
            <button
              onClick={() =>
                handleAssign(
                  selectedParcel._id,
                  selectedParcel.deliveryManId,
                  selectedParcel.approximateDeliveryDate,
                  selectedParcel.status,
                  selectedParcel.deliveryManEmail
                )
              }
              className="px-4 py-2 bg-green-500 text-white mr-2"
            >
              Assign
            </button>
            <button
              onClick={closeManageModal}
              className="px-4 py-2 bg-red-500 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcel;
