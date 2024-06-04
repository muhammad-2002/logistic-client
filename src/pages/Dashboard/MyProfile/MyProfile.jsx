import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import useUsers from "../../../components/shared/CustomHook/useUsers";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [FileUpload, setFileUpload] = useState("");
  const ImageFile = {
    image: FileUpload,
  };
  const [users, refetch] = useUsers();
  console.log(users);
  const upload_api_image_bb = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_BB_API_KEY
  }`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleUpload = async () => {
    try {
      const res = await axios.post(upload_api_image_bb, ImageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.status === 200) {
        const response = await axiosSecure.patch(
          `/profile-update/${users?._id}`,
          {
            image: res?.data?.data?.display_url,
          }
        );
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Picture Updated done",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    setFileUpload(file);
  };

  return (
    <div className="container mx-auto shadow-xl border-2  p-14">
      <div className="flex flex-col items-center">
        <img
          src={users.image}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
        <label className="btn text-white hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E] mt-5">
          <input onChange={handleImageUpload} type="file" className="hidden" />
          Upload Profile Picture
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label className="label">
            <span className="label-text text-md ">Name :</span>
          </label>
          <div className="px-4  text-md w-full  py-2">{users.name}</div>
        </div>
        <div className="w-full md:w-1/2">
          <label className="label">
            <span className="label-text text-md ">Email :</span>
          </label>
          <div className="px-4  text-md w-full  py-2">{users.email}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label className="label">
            <span className="label-text text-md ">User Id :</span>
          </label>
          <div className="px-4  text-md w-full  py-2">{users._id}</div>
        </div>
        <div className="w-full md:w-1/2">
          <label className="label">
            <span className="label-text text-md ">User Role :</span>
          </label>
          <div className="px-4  text-md w-full  py-2">Role as {users.role}</div>
        </div>
      </div>
      <div className="form-control text-xl mt-4">
        <input
          onClick={handleUpload}
          type="submit"
          className="btn text-white hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E]"
          value="Update Profile"
        />
      </div>
    </div>
  );
};

export default MyProfile;
