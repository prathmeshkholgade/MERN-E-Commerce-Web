import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function PriceDetails() {
  const carts = useSelector((state) => state?.User?.User?.user?.cart);
  const location = useLocation();
  const path = location.pathname;
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
  return (
    <div className="bg-zinc-100 my-4 p-4 lg:w-[360px] lg:h-fit flex flex-col h-fit">
      <div>
        <h2 className="font-semibold text-zinc-700 text-lg py-2">
          Products Details
        </h2>
      </div>

      <hr />
      <div className="flex justify-between p-4">
        <p className="text-lg text-zinc-700">Price ({totalQuantity} items)</p>
        <p>{itemsPrice}</p>
      </div>
      <div className="flex justify-between p-4">
        <p className="text-lg text-zinc-700">Delivery Charges </p>
        <p className="">
          <span className="text-green-700 px-2">Free</span>{" "}
          <span className="line-through">200</span>
        </p>
      </div>
      <hr />
      <div className="flex justify-between p-4">
        <p className="text-lg font-semibold">Total Amount </p>
        <p className="text-lg font-semibold"> &#8377; {itemsPrice}</p>
      </div>
      {path !== "/checkout" && (
        <div>
          <Link to={"/checkout"}>
            {" "}
            <button className="bg-green-300 w-full p-2 rounded-lg font-semibold tracking-wider">
              CheckOut
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
