import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logInUser } from "../app/features/user/userSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await dispatch(logInUser(data)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("root", {
        type: "manual",
        message: err || "an error occurred",
      });
      setTimeout(() => {
        clearErrors("root");
      }, 5000);
    }
  };

  return (
    <div className=" w-full h-[70vh] flex justify-center items-center ">
      <form
        className="w-full sm:w-[90%] md:w-[80%] lg:w-[55%]  mx-auto py-4 flex flex-col justify-center items-center  mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-[70%] sm:w-1/2">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p>Welcome Back ! Please enter your details</p>
        </div>
        <div className="w-[70%] sm:w-1/2 py-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            {...register("email", {
              required: { value: true, message: "Please enter email " },
            })}
            placeholder="Email"
            id="email"
            className="w-full rounded-lg"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="w-[70%] sm:w-1/2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Please enter password" },
            })}
            id="password"
            className="w-full rounded-lg"
          />
          {errors.password && (
            <p className="text-red-600"> {errors.password.message}</p>
          )}
        </div>
        <div className="w-[70%] sm:w-1/2">
          {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        </div>
        <div className="w-[70%] sm:w-1/2">
          <p className="text-end py-2">Forgot Password</p>
        </div>
        <div className="w-[70%] sm:w-1/2 mt-4">
          <button className="bg-purple-400 w-full py-2 rounded-lg">
            Login
          </button>
        </div>
        <div className="w-[70%] sm:w-1/2 py-2">
          <p>
            Don't have an account ?{" "}
            <NavLink to={"/signup"}>
              {" "}
              <span className="font-semibold">Sign Up</span>{" "}
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
