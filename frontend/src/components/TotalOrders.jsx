import React from "react";
import AdminSideNav from "./AdminSideNav";

export default function TotalOrders() {
  const allOrders = useSelector((state) => state?.Order?.totalOrder?.orders);
  return (
    <div className="mt-6 h-full w-full flex gap-4 ">
      <div className="h-full ">
        <AdminSideNav />
      </div>
      <div>
        <h3>All Orders</h3>
      </div>
    </div>
  );
}
