import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

import useDeliveryMen from "../../../components/shared/CustomHook/useDeliveryMen";
import useAuth from "./../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "./../../../components/shared/CustomHook/useAxiosSecure";

Modal.setAppElement("#root");

const ReviewModal = ({ isOpen, onRequestClose, parcel }) => {
  console.log(parcel);
  const [deliveryMen, refetch] = useDeliveryMen();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      userName: user?.displayName,
      userImage: user?.photoURL,
      rating: parseInt(rating),
      feedback,
      deliveryManId: parcel.deliveryManId,
      reviewEmail: parcel.deliveryManEmail,
      reviewDate: Date.now(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your review has been submitted.",
          icon: "success",
        });
        onRequestClose();
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your review.",
        icon: "error",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Review Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Give Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User's Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User's Image
            </label>
            <img
              src={user?.photoURL}
              alt="User"
              className="mt-1 w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating out of 5
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Man's ID
            </label>
            <input
              type="text"
              value={parcel.deliveryManId}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
