import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
console.log(import.meta.env.STRYPE_API_KEY);
const stripePromise = loadStripe(
  "pk_test_51PLEjNIFQlSqnOLyAqfPB9u6UklQ7fDzey6gYyXtsG9UcGdorFeo0SeRv2BnV6pVkvnnkZwpa9030yJzDJjI5huw00lyXO9eep"
);

const StripeProviderWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProviderWrapper;
