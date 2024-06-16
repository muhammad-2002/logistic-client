// src/components/CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Assuming you are using SweetAlert2 for alerts
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const CheckoutForm = ({ parcel }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message,
      });
    } else {
      const { id } = paymentMethod;
      try {
        const response = await axiosSecure.post("/api/payment", {
          amount: 66 * 1000,
          id,
        });

        if (response.data.success) {
          navigate("/dashboard/payment-success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: "There was an issue processing your payment.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "There was an issue processing your payment.",
        });
      }
    }
  };

  return (
    <div className="p-7">
      <div className="mb-6">
        <HeadingComp lightText={""} boldText={"Payment"}></HeadingComp>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="border p-4" />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className=" font-bold btn btn-primary w-full"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
