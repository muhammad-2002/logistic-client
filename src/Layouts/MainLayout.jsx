import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";
const MainLayout = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
