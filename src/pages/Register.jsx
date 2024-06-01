// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAuth from "../Components/CustomHook/useAuth";
// import usePublicAxiosSecure from "../Components/CustomHook/usePublicAxiosSecure";
// import SocailLogin from "../Components/SocailLogin/SocailLogin";
// import authenticaton from "../assets/others/authentication2.png";
// import woodImg from "../assets/reservation/wood-grain-pattern-gray1x.png";

import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import animationData from "../../Animation - 1717208947732.json";
import useAuth from "../components/shared/CustomHook/useAuth";
import HeadingComp from "../components/shared/HeadingComp/Headingcomp";
import SocialLogin from "../components/shared/SocialLogin/SocialLogin";

const Register = () => {
  const { createForGoogle, createEmailAndPassword, UpdateUser } = useAuth();
  //   const [axiosPublicSecure] = usePublicAxiosSecure();
  const navigate = useNavigate();
  //   const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    try {
      const data = await createEmailAndPassword(user.email, user.password);
      console.log(data);
      if (data) {
        try {
          await UpdateUser(user.name, user?.PhotoURL);
          navigate(location?.state ? location.state : "/");
        } catch (err) {
          console.log(err);
        }

        //   try {
        //     const userObj = {
        //       name: user?.name,
        //       email: user?.email,
        //     };
        //     const res = await axiosPublicSecure.post("/dashboard/users", userObj);
        //     console.log(res.data);
        //     Swal.fire({
        //       position: "center",
        //       icon: "success",
        //       title: "User Created Successfully",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //
        //   } catch (err) {
        //     console.log(err);
        //   }
      }
    } catch (err) {
      console.log(err);
    }
    // data.reset();
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
                        type="Name"
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
                        <span className="label-text">PhotoURL</span>
                      </label>
                      <input
                        {...register("PhotoURL", { required: true })}
                        type="text"
                        name="PhotoURL"
                        placeholder="Photo Url"
                        className="px-4 text-sm w-full border-2 py-2"
                      />
                      {errors.PhotoURL && (
                        <span className="text-sm text-red-700">
                          This field is required
                        </span>
                      )}
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
