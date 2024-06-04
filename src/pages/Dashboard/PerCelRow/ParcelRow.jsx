// src/components/ParcelRow.js
import React from "react";
import {
  MdDeleteOutline,
  MdOutlinePayments,
  MdOutlineReviews,
  MdOutlineSystemUpdateAlt,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ParcelRow = ({ parcel, onUpdate, onCancel, onReview, onPay }) => {
  const {
    parcelType,
    requestedDeliveryDate,
    ApproximateDeliveryDate,
    booking_date,
    DeliveryMenID,
    status,
  } = parcel;
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-booking/${id}`);
  };

  return (
    <tr>
      <td>{parcelType}</td>
      <td>{requestedDeliveryDate}</td>
      <td>{requestedDeliveryDate}</td>
      <td>{booking_date}</td>
      <td>{DeliveryMenID}</td>
      <td>{status}</td>
      <td className=" flex ">
        <button
          onClick={() => handleUpdate(parcel._id)}
          className={`p-2 text-2xl text-white hover:bg-gray-300 hover:text-black ${
            status === "pending"
              ? "bg-[#00BEF2]"
              : "bg-gray-300 hover:text-white "
          } `}
          disabled={status !== "pending"}
        >
          <MdOutlineSystemUpdateAlt />
        </button>
        <button
          className={`p-2 text-2xl text-white bg-red-700 hover:bg-gray-300 hover:text-black ${
            status === "pending"
              ? "bg-red-700"
              : "bg-gray-300 hover:text-white "
          } `}
          onClick={() => onCancel(parcel)}
          disabled={status !== "pending"}
        >
          <MdDeleteOutline></MdDeleteOutline>
        </button>
        {status === "delivered" && (
          <button
            className="p-2 text-2xl text-white bg-rose-400 hover:bg-gray-300 hover:text-black "
            onClick={() => onReview(parcel)}
          >
            <MdOutlineReviews />
          </button>
        )}
        {status === "pending" && (
          <button
            className="p-2 text-2xl text-white bg-[#1874C1] hover:bg-gray-300 hover:text-black "
            onClick={() => onPay(parcel)}
          >
            <MdOutlinePayments />
          </button>
        )}
      </td>
    </tr>
  );
};

export default ParcelRow;
