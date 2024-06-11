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
    approximateDeliveryDate,
    booking_date,

    deliveryManId,
    status,
  } = parcel;
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-booking/${id}`);
  };

  return (
    <tr className="text-center">
      <td>{parcelType}</td>
      <td>{requestedDeliveryDate}</td>
      <td>{approximateDeliveryDate || "-----------"}</td>
      <td>{booking_date}</td>
      <td>{deliveryManId || "-----------"}</td>
      <td>{status}</td>
      <td>
        <div className=" flex ">
          <button
            onClick={() => handleUpdate(parcel._id)}
            className={`p-2 text-2xl rounded-md text-white hover:bg-gray-300 hover:text-black ${
              status === "pending"
                ? "bg-[#00BEF2]"
                : "bg-gray-300 hover:text-white "
            } `}
            disabled={status !== "pending"}
          >
            <MdOutlineSystemUpdateAlt />
          </button>
          <button
            className={`p-2 text-2xl text-white rounded-md bg-red-700 hover:bg-gray-300 hover:text-black ${
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
              className="p-2 text-2xl rounded-md text-white bg-rose-400 hover:bg-gray-300 hover:text-black "
              onClick={() => onReview(parcel)}
            >
              <MdOutlineReviews />
            </button>
          )}
          {status === "pending" && (
            <button
              className="p-2 text-2xl text-white rounded-md bg-[#1874C1] hover:bg-gray-300 hover:text-black "
              onClick={() => onPay(parcel)}
            >
              <MdOutlinePayments />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ParcelRow;
