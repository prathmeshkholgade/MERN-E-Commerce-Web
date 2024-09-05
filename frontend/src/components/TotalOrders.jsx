import React from "react";
import AdminSideNav from "./AdminSideNav";
import { useSelector } from "react-redux";
import OrderList from "./OrderList";
import { Link } from "react-router-dom";

export default function TotalOrders() {
  const allOrders = useSelector((state) => state?.Order?.totalOrder?.orders);
  console.log(allOrders);
  return (
    <div className="mt-2 h-screen flex">
      <div className="">
        <AdminSideNav />
      </div>
      <div className="mt-4 p-2">
        <h3>All Orders</h3>
        <div>
          {allOrders &&
            allOrders.map((order) => (
              <Link key={order._id} to={`/order/${order._id}`}>
                {" "}
                <OrderList order={order} />{" "}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
