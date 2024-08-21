import React from "react";
import { useForm } from "react-hook-form";
import { addAddressDetails } from "../app/features/user/userSlice";
import { useDispatch } from "react-redux";

export default function Address({ showAddForm, setshowAddForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const indiaStates = [
    "Choice State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const onSubmit = (data) => {
    try {
      dispatch(addAddressDetails(data));
      setshowAddForm(false);
    } catch (err) {}
    console.log(data);
  };

  return (
    <div className={(`${showAddForm ? "w-full" : "sm:w-1/2"}   `, "shadow-sm")}>
      <form
        action=""
        className="border border-gray-200 shadow-sm lg:flex flex-col p-4 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-xl"> 1 Address Details</h3>
        <div className="w-full lg:flex justify-between py-2 ">
          <div className="lg:w-[40%]">
            <label className="">FullName</label>
            <div className="w-full mt-2">
              <input
                type="text"
                {...register("name", {
                  required: { value: true, message: "Enter FullName" },
                })}
                placeholder="FullName"
                className="w-full rounded-lg border border-gray-400 "
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <label>Number</label>
            <div className=" mt-2">
              <input
                {...register("number", {
                  required: { value: true, message: "Enter Number" },
                })}
                type="number"
                placeholder="Contact Number"
                className="w-full rounded-lg border-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="lg:flex justify-between gap-2 flex-wrap py-2">
          <div>
            <label className="">City/Town</label>
            <div>
              <input
                type="text"
                placeholder="City"
                {...register("city", {
                  required: { value: true, message: "Enter City" },
                })}
                className="rounded-lg border-gray-400 w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="select">Select State</label>
            <div>
              <select
                className="rounded-lg w-full"
                {...register("state", {
                  required: true,
                  message: "Select State",
                })}
              >
                {indiaStates.map((state, idx) => (
                  <option value={state}>{state} </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label>pinCode</label>
            <div>
              <input
                type="number"
                placeholder="PinCode"
                {...register("pinCode", {
                  required: { value: true, message: "Enter Pincode" },
                })}
                className="rounded-lg border-gray-400 w-full"
              />
            </div>
          </div>
        </div>

        <div className="py-2">
          <label>Locality,Area,Street</label>
          <div>
            <input
              type="text"
              placeholder="Locality"
              {...register("locality", {
                required: { value: true, message: "Enter Locality" },
              })}
              className="w-full rounded-lg border-gray-400"
            />
          </div>
        </div>
        <div className="py-2">
          <label>Landmark</label>
          <div>
            <input
              type="text"
              placeholder="E.g. near apollo hospital"
              {...register("landmark", {
                required: { value: true, message: "Enter street" },
              })}
              className="w-full rounded-lg border-gray-400 "
            />
          </div>
        </div>
        <div className="lg:flex gap-8">
          <div className="py-2 lg:w-[40%]">
            <label>Email</label>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Enter Email" },
                })}
                className="w-full rounded-lg border-gray-400"
              />
            </div>
          </div>
          <div className="py-2  lg:w-[40%]">
            <label>Alternate Mobile Number</label>
            <div>
              <input
                type="number"
                {...register("alternateNumber", {
                  validate: (value) =>
                    value === "" ||
                    value.length === 10 ||
                    "Enter a valid 10-digit number",
                })}
                placeholder="Alternate Number"
                className="w-full rounded-lg border-gray-400 "
              />
              {errors.alternateNumber && (
                <p>{errors.alternateNumber.message}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button className="bg-green-400 p-2 rounded-lg">Add Address</button>
        </div>
      </form>
    </div>
  );
}
