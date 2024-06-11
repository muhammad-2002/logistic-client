// src/components/MyParcels.js
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import ParcelRow from "../../Dashboard/PerCelRow/ParcelRow";
import HeadingComp from "./../../../components/shared/HeadingComp/Headingcomp";
import "./MyPercel.css";
const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const [parcels, setParcels] = useState([]);

  // useEffect(() => {
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcel/${user?.email}`);
      return res.data;
    },
  });
  // }, []);

  const [filter, setFilter] = useState("");

  const handleCancel = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1874C1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/my-parcel/${parcel._id}`);
          console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
    // Navigate to the review page
    console.log("Review", parcel);
  };

  const handlePay = (parcel) => {
    // Handle payment
    console.log("Pay", parcel);
  };

  const filteredParcels = parcels.filter(
    (parcel) => !filter || parcel.status === filter
  );

  return (
    <div>
      <div className="mb-6">
        <HeadingComp lightText={"My"} boldText={"Parcel"}></HeadingComp>
      </div>
      <label className="border-2 mt-16  p-4">
        Filter by status:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On the Way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="cancelled">Cancelled</option>
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
    </div>
  );
};

export default MyParcels;
