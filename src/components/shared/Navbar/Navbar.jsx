import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaX } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../CustomHook/useAuth";

import useAxiosSecure from "./../CustomHook/useAxiosSecure";

const Navbar = () => {
  const { logOutUser, user } = useAuth();
  const email = user?.email;
  console.log(email);
  const [userOpen, setUserOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [singleUsers, setSingleUsers] = useState("");
  console.log(singleUsers);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const getData = async () => {
      const response = await axiosSecure.get(`/users/${email}`);
      console.log(response);
      setSingleUsers(response?.data);
    };
    getData();
  }, [user?.email, axiosSecure]);

  // user Open and close
  const handleUserOpen = () => {
    setUserOpen(!userOpen);
  };
  const handleSideOpen = () => {
    setSideOpen(!sideOpen);
  };
  const handleLogOut = () => {
    logOutUser().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    setUserOpen(false);
  };

  return (
    <div className="w-full shadow-lg border bg-white  mx-auto rale-way">
      <header className="    flex w-[90%] mx-auto  ">
        {/* start */}
        <div className=" w-[420px] py-3 ">
          <Link to="/" className="">
            <img
              className=" py-1 h-[50px] w-full"
              src={
                "https://dtlogistics.wpenginepowered.com/wp-content/themes/logistics/images/logo.png"
              }
              alt=""
            />
          </Link>
        </div>
        {/* middle */}
        <nav className="header-links  md:contents font-medium text-base  hidden ">
          <ul className="flex gap-8 items-center ml-4 xl:ml-8 mr-auto w-full justify-end text-[#00BEF2] ">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-[#1874C1] text-bold border-b-4 border-[#1874C1]"
                    : "hover:text-[#1874C1]"
                }
              >
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              {user && singleUsers?.role === "user" && (
                <NavLink
                  onClick={() => setSideOpen(!sideOpen)}
                  to="/dashboard/book-a-parcel"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                      : "hover:text-[#1874C1]"
                  }
                >
                  <span>Dashboard</span>
                </NavLink>
              )}
              {user && singleUsers?.role === "admin" && (
                <NavLink
                  onClick={() => setSideOpen(!sideOpen)}
                  to="/dashboard/admin-home"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                      : "hover:text-[#1874C1]"
                  }
                >
                  <span>Dashboard</span>
                </NavLink>
              )}
              {user && singleUsers?.role === "deliveryMan" && (
                <NavLink
                  onClick={() => setSideOpen(!sideOpen)}
                  to="/dashboard/my-delivery-list"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                      : "hover:text-[#1874C1]"
                  }
                >
                  <span>Dashboard</span>
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {/* end */}
        <div className="relative gap-2  flex items-center justify-end w-full md:w-auto pl-5 ">
          <div className="text-3xl text-[#00BEF1] ">
            <IoIosNotificationsOutline></IoIosNotificationsOutline>
          </div>
          {/* <div className="">
            <button className=" p-1 mr-3 flex items-center">
              <img className="md:w-full   w-10 object-cover" src={""} alt="" />
            </button>
          </div> */}

          {user ? (
            <button
              onClick={handleUserOpen}
              className="border-2 p-0 border-[#00BEF2] rounded-full h-[40px]  w-[40px]"
            >
              <img
                src={`${user?.photoURL}`}
                alt="image"
                className="w-full h-full rounded-full"
              />
            </button>
          ) : (
            <Link to="/login">
              <button
                onClick={() => setSideOpen(false)}
                className="hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E]  hidden  duration-200 text-white font-bold px-4 xl:px-6 py-1 md:inline-flex justify-center items-center gap-2 "
              >
                <div className="text-xl font-bold">
                  {" "}
                  <CiLogin></CiLogin>
                </div>
                Login
              </button>
            </Link>
          )}

          {/* user Menu */}
          <div
            className={`absolute text-center  ${
              userOpen ? "block" : "hidden"
            } flex flex-col  min-w-[250px] items-center gap-2   shadow-lg bg-white text-black dark:bg-white  px-1 py-4 top-[72px]   z-50`}
          >
            <h1 className="text-md font-normal ">{user?.displayName}</h1>

            {user && singleUsers?.role === "user" && (
              <Link
                onClick={() => setSideOpen(!sideOpen)}
                to="/dashboard/book-a-parcel"
              >
                <span>Dashboard</span>
              </Link>
            )}
            {user && singleUsers?.role === "admin" && (
              <Link
                onClick={() => setSideOpen(!sideOpen)}
                to="/dashboard/admin-home"
              >
                <span>Dashboard</span>
              </Link>
            )}
            {user && singleUsers?.role === "deliveryMan" && (
              <Link
                onClick={() => setSideOpen(!sideOpen)}
                to="/dashboard/my-delivery-list"
              >
                <span>Dashboard</span>
              </Link>
            )}

            <button
              onClick={handleLogOut}
              className="hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E] transition-all  delay-100 text-white font-bold px-4 xl:px-6 py-1  cursor-pointer"
            >
              logout
            </button>
          </div>
        </div>
        {/* Drawer */}
        <button
          onClick={handleSideOpen}
          className="text-4xl text-[#00BEF2] flex items-center md:hidden ml-3"
        >
          {sideOpen ? (
            <div className="text-2xl">
              <FaX></FaX>
            </div>
          ) : (
            <MdOutlineMenu></MdOutlineMenu>
          )}
        </button>
      </header>

      {/* Side Menu */}
      {/* transition-transform transform -translate-x-full */}
      <div
        className={`absolute  md:hidden ${
          sideOpen ? "block" : "hidden"
        } bg-white shadow-lg  w-56 min-h-screen overflow-y-auto top-30 left-0 ease-in-out duration-300 dark:bg-white text-[#00BEF2] z-50`}
      >
        <div className="p-4">
          {/* <a href="" className=" flex-shrink-0 flex items-center ">
            <img
              className="w-[200px]  h-[70px] object-cover"
              // src="https://i.ibb.co/W6ZXdqN/2021-10-26-16h20-21.png"
              src={logo}
              alt=""
            />
          </a> */}
          <ul className="mt-6 flex flex-col gap-4 ml-5">
            <li>
              <NavLink
                onClick={() => setSideOpen(!sideOpen)}
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                    : "hover:text-[#1874C1]"
                }
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setSideOpen(!sideOpen)}
                to="/product/add"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                    : "hover:text-[#1874C1]"
                }
              >
                <span>Add Product</span>
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  onClick={() => setSideOpen(!sideOpen)}
                  to="/dashboard"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#1874C1] border-b-4 border-[#1874C1]"
                      : "hover:text-[#1874C1]"
                  }
                >
                  <span>Dashboard</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="ml-8 ">
          <div className={`flex flex-col gap-2 top-16 pr-5`}>
            {user ? (
              <>
                <button className="border-2 mx-auto border-[#1874C1] rounded-full w-[40px]">
                  <img
                    src={`${user?.photoURL}`}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </button>

                <button
                  onClick={handleLogOut}
                  className="hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E]  duration-200 text-white font-bold px-4 xl:px-6 py-1 inline-flex justify-center items-center gap-2 "
                >
                  Log Out
                  <div className="text-xl font-bold">
                    {" "}
                    <FiLogOut></FiLogOut>
                  </div>
                </button>
              </>
            ) : (
              <Link to="/login">
                <button
                  onClick={() => setSideOpen(false)}
                  className="hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E]  duration-200 text-white font-bold px-4 xl:px-6 py-1 inline-flex justify-center items-center  gap-2 "
                >
                  <div className="text-xl font-bold">
                    {" "}
                    <CiLogin></CiLogin>
                  </div>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
