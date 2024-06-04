import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import animationData from "../../Animation - 1717194133919.json";
import useAuth from "../components/shared/CustomHook/useAuth";
import HeadingComp from "../components/shared/HeadingComp/Headingcomp";
import SocialLogin from "../components/shared/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const form = location?.state?.form?.pathname || "/";
  const { logInEmailAndPassword } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const onSubmit = async (user) => {
    try {
      const data = await logInEmailAndPassword(user.email, user.password);
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(form);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Don't have a user please Register!",
      });
      navigate("/register");
    }
  };
  const handleCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
      setMessage("");
    } else {
      setMessage("Wrong Captcha Try again !");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center my-4 md:my-10">
        <div className=" w-[95%] md:w-[90%] mx-auto border shadow-xl bg-white ">
          <div className="  p-10 md:p-16 mx-auto   ">
            <HeadingComp
              lightText={"Login"}
              boldText={"Your Account"}
            ></HeadingComp>
            <div className="flex flex-col items-center md:gap-20 gap-6 justify-between  lg:flex-row">
              <div className="text-center flex   items-center mt-6 md:mt-0 border md:border-none  h-[350px]  md:h-[480px] w-full lg:w-[50%]">
                <Lottie animationData={animationData} loop={true} />
              </div>
              <div className="  w-full lg:w-[50%] ">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <div className=" w-full">
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
                      className="px-4 w-full border py-2"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-700">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="">
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
                      className="px-4 border w-full py-2"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-700">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label className="label ">
                      <LoadCanvasTemplate />
                    </label>
                    <input
                      onBlur={handleCaptcha}
                      type="text"
                      name="captcha"
                      placeholder="Type Captcha above"
                      className="px-4 border py-2"
                    />
                    <small className="text-red-700 ml-5 ">{message}</small>
                    {/* <button className="btn btn-outline btn-xs mt-2">
                      validate
                    </button> */}
                  </div>

                  <div className="form-control mt-2">
                    <input
                      disabled={disabled}
                      type="submit"
                      className=" btn text-white bg-[#4BA3FA]"
                      value={"Login"}
                    ></input>
                  </div>
                </form>
                <div className="text-center border p-5  space-y-2 py-2 mt-2">
                  <p className="text-sm">
                    You don't have a Account?{" "}
                    <Link
                      className="text-[#4BA3FA] hover:text-[#1453A7]"
                      to="/register"
                    >
                      Go to Register
                    </Link>
                  </p>
                  <p>Or Login up with</p>
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

export default Login;
