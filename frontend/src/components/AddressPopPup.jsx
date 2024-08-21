import React from "react";
import Address from "./Address";

export default function AddressPopPup({ setFormShow }) {
  return (
    <div className="relative h-full bg-white p-4 flex flex-col rounded-lg shadow-lg w-[90%] ">
      <div className="">
        <div className="flex text-lg justify-between">
          <h1>Add New Address </h1>
          <p className="text-2xl" onClick={() => setFormShow(false)}>
            <i className="ri-close-circle-line"></i>
          </p>
        </div>{" "}
        <div className="absolute ">
          <Address />
        </div>
      </div>
    </div>
  );
}
