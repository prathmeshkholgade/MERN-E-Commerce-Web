import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../app/features/order/orderSlice";
import OrderCard from "./OrderCard";

export default function OrdersDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.User?.user);
  const orders = useSelector((state) => state?.Order?.order?.orders);
  console.log(orders);
  const getData = async () => {
    const res = await dispatch(orderDetails(user._id)).unwrap();
  };
  useEffect(() => {
    if (user && user._id) {
      getData();
    }
  }, [user]);
  return (
    <div className="mt-8 w-[90%] mx-auto ">
      <h1 className="text-lg my-2">Your Order Details</h1>
      {orders && orders.map((order) => <OrderCard order={order} />)}
    </div>
  );
}
