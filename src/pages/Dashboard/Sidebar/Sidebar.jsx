import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegStar, FaRegUser, FaUsers } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useUsers from "../../../components/shared/CustomHook/useUsers";
const Sidebar = () => {
  const [users] = useUsers();
  console.log(users.role);
  return (
    <div className="w-[270px]">
      <div className="w-[270px] fixed  min-h-screen bg-[#1874C1]">
        <div className="p-4  flex justify-center">
          <img src={logo}></img>
        </div>
        <hr></hr>
        {users.role === "user" && (
          <ul className="pl-7 flex flex-col gap-2 text-white text-md font-semibold  mt-6">
            <NavLink
              to="/"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <AiFillHome></AiFillHome>
              <li>Home</li>
            </NavLink>
            <NavLink
              to="book-a-parcel"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <TbBrandBooking></TbBrandBooking>
              <li>Book a Parcel</li>
            </NavLink>
            <NavLink
              to="my-parcel"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <GrDeliver></GrDeliver>
              <li> MyParcels</li>
            </NavLink>
            <NavLink
              to="my-profile"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <ImProfile />
              <li> MyProfile </li>
            </NavLink>
          </ul>
        )}
        {/* delivery man menu */}
        {users.role == "deliveryMan" && (
          <ul className="pl-7 flex flex-col gap-2 text-white text-md font-semibold  mt-6">
            <NavLink
              to="/"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <AiFillHome></AiFillHome>
              <li>Home</li>
            </NavLink>

            <NavLink
              to="my-delivery-list"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <GrDeliver></GrDeliver>
              <li> My Delivery List</li>
            </NavLink>
            <NavLink
              to="my-ratings"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <FaRegStar></FaRegStar>
              <li>My Reviews</li>
            </NavLink>
          </ul>
        )}
        {/* Admin menu */}
        {users.role === "admin" && (
          <ul className="pl-7 flex flex-col gap-2 text-white text-md font-semibold  mt-6">
            <NavLink
              to="/"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <AiFillHome></AiFillHome>
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/dashboard/admin-home"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <AiFillHome></AiFillHome>
              <li>Admin Home</li>
            </NavLink>

            <NavLink
              to="all-parcel"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <GrDeliver></GrDeliver>
              <li> All Parcels</li>
            </NavLink>
            <NavLink
              to="all-user"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <FaRegUser></FaRegUser>
              <li>All Users</li>
            </NavLink>
            <NavLink
              to="all-delivery-man"
              className="inline-flex justify-start gap-1 items-center"
            >
              {" "}
              <FaUsers></FaUsers>
              <li>All Delivery Men</li>
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
