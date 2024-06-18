// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import useAuth from "../Components/CustomHook/useAuth";
// import usePublicAxiosSecure from "../Components/CustomHook/usePublicAxiosSecure";
// import SocailLogin from "../Components/SocailLogin/SocailLogin";
// import authenticaton from "../assets/others/authentication2.png";
// import woodImg from "../assets/reservation/wood-grain-pattern-gray1x.png";

import axios from "axios";
import Lottie from "lottie-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import animationData from "../../Animation - 1717208947732.json";
import useAuth from "../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../components/shared/HeadingComp/Headingcomp";
import SocialLogin from "../components/shared/SocialLogin/SocialLogin";

const Register = () => {
  const { createEmailAndPassword, UpdateUser } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    const FileUpload = { image: user.UploadPhoto[0] };
    const upload_api_image_bb = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_BB_API_KEY
    }`;

    try {
      const data = await createEmailAndPassword(user.email, user.password);
      console.log(data);
      if (data) {
        try {
          const res = await axios.post(upload_api_image_bb, FileUpload, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });
          console.log(res.data.status);
          if (res.data.status === 200) {
            setUserPhoto(res?.data?.data?.display_url);

            try {
              await UpdateUser(user.name, res?.data?.data?.display_url);
              const userInfo = {
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                image: res?.data?.data?.display_url,
              };
              try {
                const res = await axiosSecure.post("/users", userInfo);
                console.log(res);
                if (res.data.insertedId) {
                  navigate(location?.state ? location.state : "/");
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              } catch (err) {
                console.log(err);
              }
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User Already Exist please Login !",
      });
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center my-5 md:my-10">
        <div className="flex w-[95%] md:w-[90%] mx-auto  ">
          <div className="   p-10 md:p-16 shadow-xl border-2    mx-auto   ">
            <HeadingComp
              lightText={"Register"}
              boldText={"your account"}
            ></HeadingComp>
            <div className="flex flex-col items-center md:gap-20 gap-6 justify-between  lg:flex-row-reverse">
              <div className="text-center flex  items-center mt-6 md:mt-0 border md:border-none  h-[350px]  md:h-[480px] w-full lg:w-[50%]">
                <Lottie animationData={animationData} loop={true} />
              </div>
              <div className="  w-full lg:w-[50%] ">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <div className="flex flex-col md:flex-row  gap-1 justify-between ">
                    <div className=" w-full md:w-1/2">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        className="px-4 text-sm w-full border-2 py-2"
                      />

                      {errors.name && (
                        <span className="text-sm text-red-700">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="label">
                        <span className="label-text">User Type</span>
                      </label>
                      <select
                        className="px-4 w-full md:1/2
                         border-2  text-sm py-2"
                        defaultValue={"default"}
                        {...register("role", {
                          required: "Email is required",
                        })}
                      >
                        <option disabled value={"default"}>
                          Select Type Please
                        </option>
                        <option value="user">User</option>
                        <option value="deliveryMan">DeliveryMan</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1  justify-between">
                    <div className="w-full md:w-1/2">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 w-full
                         border-2  text-sm py-2"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-700">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "password must be strong uppercase lowercase symbol and letter included ",
                          },
                        })}
                        type="password"
                        placeholder="password like abcABC@123"
                        className="px-4 w-full text-sm border-2 py-2"
                      />
                      {errors.password && (
                        <p className="text-sm text-red-700">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1  justify-between">
                    <div className="w-full md:w-1/2 ">
                      <label className="label">
                        <span className="label-text">Upload Photo</span>
                      </label>
                      <input
                        {...register("UploadPhoto")}
                        type="file"
                        className="px-4 w-full
                         border-2  text-sm py-1"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-700">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 ">
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone is required",
                          pattern: {
                            value: /^(01[3-9]\d{8})$/,
                            message:
                              "Phone number must be a valid 11-digit Bangladeshi number starting with 01 and followed by digits 3-9",
                          },
                        })}
                        type="phone"
                        placeholder="Enter your Phone Number "
                        className="px-4 w-full
                        border-2  text-sm py-2"
                      />
                      {errors.password && (
                        <p className="text-sm text-red-700">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-control text-xl mt-2">
                    <input
                      type="submit"
                      className=" btn text-white hover:from-[#17469E] hover:to-[#00BEF2] bg-gradient-to-r from-[#00BEF2] to-[#17469E] "
                      value={"Register"}
                    ></input>
                  </div>
                </form>
                <div className="text-center px-8  border-2 mt-2 space-y-2 py-3">
                  <p className="text-md">
                    Already registered?{" "}
                    <Link
                      className="text-[#00BEF2] text-sm hover:text-[#17469E]"
                      to="/login"
                    >
                      Go to log in
                    </Link>
                  </p>
                  <p>Or sign up with</p>
                  <SocialLogin></SocialLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
