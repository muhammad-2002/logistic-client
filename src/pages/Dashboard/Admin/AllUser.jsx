import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async ({ queryKey }) => {
    const [_, page] = queryKey;
    try {
      const response = await axiosSecure.get(
        `/users?role=user&page=${page}&limit=${usersPerPage}`
      );
      setTotalUsers(response.data.total);
      return response.data.users;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users", currentPage],
    queryFn: fetchUsers,
  });

  const [totalUsers, setTotalUsers] = useState(0);

  const handleUserRoleChange = async (userId, role) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}`, { role });
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `User role has been updated to ${role}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMakeDeliveryMan = (userId) => {
    handleUserRoleChange(userId, "deliveryMan");
  };

  const handleMakeAdmin = (userId) => {
    handleUserRoleChange(userId, "admin");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="text-black p-7 w-full shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"All"} boldText={"Users"}></HeadingComp>
      </div>
      <table className="text-center bg-white">
        <thead>
          <tr>
            <th className="w-1/5 px-4 py-2">User's Name</th>
            <th className="w-1/5 px-4 py-2">Phone Number</th>
            <th className="w-1/5 px-4 py-2">Number of Parcels Booked</th>
            <th className="w-1/5 px-4 py-2">Total Spent Amount</th>
            <th className="w-1/5 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.parcelCount}</td>
              <td className="border px-4 py-2">
                <div className="inline-flex gap-1 items-center justify-center">
                  {user.totalSpent} <TbCurrencyTaka />
                </div>
              </td>
              <td className="border px-4 py-2 space-x-2">
                <div className="flex flex-col mx-auto gap-1">
                  <button
                    onClick={() => handleMakeDeliveryMan(user._id)}
                    className="btn-sm w-[150px] text-white bg-blue-500 hover:bg-blue-700"
                  >
                    Make Delivery Man
                  </button>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn-sm w-[150px] text-white bg-green-500 hover:bg-green-700"
                  >
                    Make Admin
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
