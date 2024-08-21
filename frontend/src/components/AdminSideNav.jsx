import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function AdminSideNav({ length }) {
  const allOrders = useSelector((state) => state?.Order?.totalOrder?.orders);
  return (
    <div className="bg-zinc-200 w-48 h-full flex justify-center">
      <ul className="mt-4">
        <NavLink
          to={"/admin"}
          className={({ isActive }) => (isActive ? "text-blue-700" : "")}
        >
          <li className="py-2">AllProducts</li>
        </NavLink>
        <NavLink
          to={"/add"}
          className={({ isActive }) => (isActive ? "text-blue-700" : "")}
        >
          {" "}
          <li className="py-2">Add New Products</li>{" "}
        </NavLink>
        <NavLink to={"/orders"}>
          {" "}
          <li className="py-2">Orders {allOrders && allOrders.length}</li>{" "}
        </NavLink>
      </ul>
    </div>
  );
}
