import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { signUpUser } from "../app/features/user/userSlice";
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await dispatch(signUpUser(data)).unwrap();
      navigate("/");
    } catch (err) {
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
    <div className=" w-full h-[70vh]  flex justify-center items-center ">
      <form
        className="w-full sm:w-[90%] md:w-[80%] lg:w-[55%]  mx-auto py-4 flex flex-col justify-center items-center mt-14 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-[70%] sm:w-1/2">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
        </div>
        <div className="w-[70%] sm:w-1/2 py-2">
          <label htmlFor="name">FullName</label>
          <input
            type="text"
            placeholder="FullName"
            id="name"
            {...register("fullName", {
              required: { value: true, message: "please enter fullname" },
            })}
            className="w-full rounded-lg"
          />
          {errors.fullName && (
            <p className="text-red-600">{errors.fullName.message}</p>
          )}
        </div>
        <div className="w-[70%] sm:w-1/2 py-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "please enter email",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              minLength: {
                value: 8,
                message: "Email must be at least 8 characters",
              },
            })}
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
              required: { value: true, message: "please enter password" },
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
            })}
            id="password"
            className="w-full rounded-lg"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="w-[70%] sm:w-1/2">
          {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        </div>
        <div className="w-[70%] sm:w-1/2 mt-4">
          <button className="bg-purple-400 w-full py-2 rounded-lg">
            Sign Up
          </button>
        </div>
        <div className="w-[70%] sm:w-1/2 py-2">
          <p>
            Already have an account ?{" "}
            <NavLink to={"/login"}>
              <span className="font-semibold ">Login</span>{" "}
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
