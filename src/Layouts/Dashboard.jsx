import React from "react";
import { MdCancel } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="flex min-h-screen ">
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="block md:hidden   "
      >
        <div>
          {" "}
          <Sidebar />
        </div>
      </Drawer>

      <div
        className={`hidden md:block w-[200px]  md:w-[270px] ${
          isOpen ? "w-0" : "w-0 p-5 md:p-0 "
        } transition-all duration-300`}
      >
        <Sidebar />
      </div>

      <div
        className={`flex-1 p-8   transition-all duration-300 
         
        `}
      >
        <p className="text-end">
          <button
            onClick={toggleDrawer}
            className="md:hidden  bg-blue-500 mb-3 text-2xl  text-white p-2 rounded"
          >
            {isOpen ? <MdCancel /> : <VscThreeBars />}
          </button>
        </p>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
