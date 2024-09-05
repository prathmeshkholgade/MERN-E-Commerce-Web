import React from "react";

export default function OrderList({ order }) {
  return (
    <div className="flex gap-10 p-2">
      <p>{order.user.fullName}</p>
      <p>{order.user.email}</p>
      <p>{order.quantity}</p>
      <p>{order.totalPrice}</p>
      <p>{order.isPaid ? "Paid" : "unPaid"}</p>
      <p>{order.status}</p>
    </div>
  );
}
