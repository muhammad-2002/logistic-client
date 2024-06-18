import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import useAuth from "./../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "./../../../components/shared/CustomHook/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookingsByDate, setBookingsByDate] = useState([]);
  console.log(bookingsByDate);
  const [parcelsComparison, setParcelsComparison] = useState([]);
  console.log(parcelsComparison);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const bookingsResponse = await axiosSecure.get(
          "/statistics/bookings-by-date"
        );
        const parcelsResponse = await axiosSecure.get(
          "/statistics/booking-delivery-comparison"
        );
        console.log(parcelsResponse);

        setBookingsByDate(bookingsResponse.data);
        setParcelsComparison(parcelsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatistics();
  }, [user.email, axiosSecure]);

  const bookingsChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: bookingsByDate.map((data) => data.date),
    },
  };

  const bookingsChartSeries = [
    {
      name: "bookings",
      data: bookingsByDate.map((data) => data.count),
    },
  ];

  const parcelsChartOptions = {
    chart: {
      type: "deliveries",
      height: 350,
    },
    xaxis: {
      categories: parcelsComparison.map((data) => data.date),
    },
  };

  const parcelsChartSeries = [
    {
      name: "Booked Parcels",
      data: parcelsComparison.map((data) => data.bookings),
    },
    {
      name: "Delivered Parcels",
      data: parcelsComparison.map((data) => data.delivered),
    },
  ];

  return (
    <div className="admin-home w-[95%] mx-auto">
      <div className="chart-container  mb-8">
        <h3 className="text-2xl font-bold mb-2">Bookings by Date</h3>
        <ReactApexChart
          options={bookingsChartOptions}
          series={bookingsChartSeries}
          type="bar"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h3 className="text-2xl font-bold mb-2">Booked vs Delivered Parcels</h3>
        <ReactApexChart
          options={parcelsChartOptions}
          series={parcelsChartSeries}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default AdminHome;
