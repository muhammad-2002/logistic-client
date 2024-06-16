// src/components/MyParcels.js
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import ParcelRow from "../../Dashboard/PerCelRow/ParcelRow";
import HeadingComp from "./../../../components/shared/HeadingComp/Headingcomp";
import "./MyPercel.css";
import ReviewModal from "./ReviewModal"; // Import ReviewModal component

const MyParcels = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcel/${user?.email}`);
      return res.data;
    },
  });

  const [filter, setFilter] = useState("");
  const [selectedParcel, setSelectedParcel] = useState(null); // State to track the selected parcel for review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State to control the modal visibility

  const handleCancel = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Cancel this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1874C1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/my-parcel/${parcel._id}`, {
            status: "Cancelled",
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your parcel has been Canceled.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleReview = (parcel) => {
    setSelectedParcel(parcel);
    setIsReviewModalOpen(true); // Open the modal
  };

  const handlePay = (parcel) => {
    navigate("/dashboard/checkout", { state: { parcel } });
  };

  const filteredParcels = parcels.filter(
    (parcel) => !filter || parcel.status === filter
  );

  return (
    <div>
      <div className="mb-6">
        <HeadingComp lightText={"My"} boldText={"Parcel"}></HeadingComp>
      </div>
      <label className="border-2 mt-16 p-4">
        Filter by status:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="On The Way">On the Way</option>
          <option value="Delivered">Delivered</option>
          <option value="Returned">Returned</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </label>
      <table className="mt-7">
        <thead>
          <tr>
            <th>Parcel Type</th>
            <th>Requested Delivery Date</th>
            <th>Approximate Delivery Date</th>
            <th>Booking Date</th>
            <th>Delivery Men ID</th>
            <th>Booking Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <ParcelRow
              key={parcel.id}
              parcel={parcel}
              onCancel={handleCancel}
              onReview={handleReview}
              onPay={handlePay}
            />
          ))}
        </tbody>
      </table>
      {selectedParcel && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onRequestClose={() => setIsReviewModalOpen(false)}
          parcel={selectedParcel}
        />
      )}
    </div>
  );
};

export default MyParcels;
