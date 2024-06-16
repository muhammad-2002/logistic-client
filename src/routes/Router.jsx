import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import MainLayout from "../Layouts/MainLayout";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AllDeliveryMan from "../pages/Dashboard/Admin/AllDeliveryMan";
import AllParcel from "../pages/Dashboard/Admin/AllParcel";
import AllUser from "../pages/Dashboard/Admin/AllUser";
import BookAPercel from "../pages/Dashboard/BookApercel/BookAPercel";
import MyDeliveryList from "../pages/Dashboard/DeliveryMan/MyDeliveryList";
import MyRatings from "../pages/Dashboard/DeliveryMan/MyRatings";

import MyPercel from "../pages/Dashboard/MyPercel/MyPercel";
import PaymentSuccess from "../pages/Dashboard/MyPercel/paymentSucess";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateBooking from "./../pages/Dashboard/BookApercel/UpdateBooking";
import CheckoutForm from "./../pages/Dashboard/MyPercel/CheckOut";
import Home from "./../pages/Home";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // user route
      {
        path: "/dashboard/admin-home",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/dashboard/book-a-parcel",
        element: (
          <PrivateRoute>
            <BookAPercel></BookAPercel>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-parcel",
        element: (
          <PrivateRoute>
            {" "}
            <MyPercel></MyPercel>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      //admin route
      {
        path: "/dashboard/all-parcel",
        element: (
          <PrivateRoute>
            <AllParcel></AllParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-user",
        element: (
          <PrivateRoute>
            {" "}
            <AllUser></AllUser>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-delivery-man",
        element: (
          <PrivateRoute>
            <AllDeliveryMan></AllDeliveryMan>
          </PrivateRoute>
        ),
      },
      //delivery man route
      {
        path: "/dashboard/my-delivery-list",
        element: (
          <PrivateRoute>
            <MyDeliveryList></MyDeliveryList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings></MyRatings>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-booking/:id",
        element: (
          <PrivateRoute>
            <UpdateBooking></UpdateBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/checkout",
        element: <CheckoutForm></CheckoutForm>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
]);
export default router;
