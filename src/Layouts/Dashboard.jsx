import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-[300px]">
        <Sidebar></Sidebar>
      </div>
      <div className="w-full p-16  ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
