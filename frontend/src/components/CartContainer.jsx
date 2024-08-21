import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../app/features/product/productSlice";
import { Link, NavLink } from "react-router-dom";
import CartProduct from "./CartProduct";
import PriceDetails from "./PriceDetails";
export default function CartContainer() {
  const carts = useSelector((state) => state?.User?.User?.user?.cart);
  const itemsPrice =
    carts &&
    carts.reduce(
      (preV, currV) =>
        preV +
        (currV.product
          ? Math.floor(currV.product?.price * 0.9 * currV.quantity)
          : 0),
      0
    );
  const totalQuantity =
    carts && carts.reduce((preV, currV) => preV + currV.quantity, 0);
  console.log(carts);
  return (
    <div className="w-[95%] mx-auto sm:py-4 sm:flex gap-12  ">
      {carts?.length > 0 ? (
        <>
          <div className="sm:w-1/2 h-[60vh] sm:h-[80vh] overflow-auto">
            {carts.map((cart, idx) => (
              <CartProduct cart={cart} />
            ))}
          </div>
          <PriceDetails/>
        </>
      ) : (
        <>
          <div className=" sm:w-[80%] flex flex-col justify-center items-center bg-zinc-100  h-96 m-auto p-4">
            <p className="text-xl">Your Cart is empty</p>

            <p className="my-2">add items to it now</p>
            <NavLink to={"/"}>
              <button className="bg-blue-400 p-2 rounded-lg w-40 hover:bg-blue-300">
                Show Now
              </button>{" "}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
