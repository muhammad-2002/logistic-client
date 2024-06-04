import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import MainLayout from "../Layouts/MainLayout";
import AllDeliveryMan from "../pages/Dashboard/Admin/AllDeliveryMan";
import AllParcel from "../pages/Dashboard/Admin/AllParcel";
import AllUser from "../pages/Dashboard/Admin/AllUser";
import BookAPercel from "../pages/Dashboard/BookApercel/BookAPercel";
import MyDeliveryList from "../pages/Dashboard/DeliveryMan/MyDeliveryList";
import MyRatings from "../pages/Dashboard/DeliveryMan/MyRatings";
import MyPercel from "../pages/Dashboard/MyPercel/MyPercel";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateBooking from "./../pages/Dashboard/BookApercel/UpdateBooking";
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
        path: "book-a-parcel",
        element: <BookAPercel></BookAPercel>,
      },
      {
        path: "my-parcel",
        element: <MyPercel></MyPercel>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      //admin route
      {
        path: "all-parcel",
        element: <AllParcel></AllParcel>,
      },
      {
        path: "all-user",
        element: <AllUser></AllUser>,
      },
      {
        path: "all-delivery-man",
        element: <AllDeliveryMan></AllDeliveryMan>,
      },
      //delivery man route
      {
        path: "my-delivery-list",
        element: <MyDeliveryList></MyDeliveryList>,
      },
      {
        path: "my-ratings",
        element: <MyRatings></MyRatings>,
      },
      {
        path: "/dashboard/update-booking/:id",
        element: <UpdateBooking></UpdateBooking>,
      },
    ],
  },
]);
export default router;
