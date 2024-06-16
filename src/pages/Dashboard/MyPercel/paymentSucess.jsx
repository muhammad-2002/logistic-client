// src/components/PaymentSuccess.jsx
import React from "react";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  //   const { width, height } = useWindowSize();

  return (
    <div className="text-center flex justify-center items-center flex-col h-screen ">
      <Confetti className="md:w-[75%] w-full md:ml-[300px] h-full border-none" />
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
    </div>
  );
};

export default PaymentSuccess;
