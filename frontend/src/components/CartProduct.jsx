import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteFromCart,
  updateCartQuantity,
} from "../app/features/product/productSlice";

export default function CartProduct({ cart }) {
  const [cartItemNum, setcartitemNum] = useState(cart?.quantity);
  const dispatch = useDispatch();
  const finalPrice = Math.floor(cart?.product.price * 0.9);

  const increaseCount = () => {
    setcartitemNum((prevNum) => prevNum + 1);
  };
  const decreaseCount = () => {
    setcartitemNum((prevNum) => {
      if (prevNum > 1) {
        return prevNum - 1;
      } else {
        return 1;
      }
    });
  };
  const deleteCartItem = (id, event) => {
    event.stopPropagation();
    dispatch(deleteFromCart(id));
  };
  useEffect(() => {
    if (cartItemNum > 0) {
      dispatch(
        updateCartQuantity({ id: cart?.product?._id, quantity: cartItemNum })
      );
    }
  }, [cartItemNum, dispatch]);
  return (
    <>
      <div className="relative">
        <Link to={`/products/${cart?.product?._id}`}>
          <div className="border border-zinc-200 sm:w-full   flex my-4 p-2">
            <div className="flex w-full sm:h-36">
              <div className="bg-red-400 w-28 h-28 sm:w-36 sm:h-36 ">
                <img
                  className="w-full h-full bg-cover"
                  src={cart?.product?.image[0].url}
                  alt=""
                />
              </div>
              <div className="flex-grow p-2">
                <p className="text-lg">{cart?.product?.name}</p>
                <div className="flex gap-4 py-2">
                  <p className="font-medium">
                    {" "}
                    &#8377;{finalPrice * cartItemNum}
                  </p>{" "}
                  <p className=" line-through"> {cart?.product?.price}</p>
                </div>
                <p className="text-sm mb-4">Qty: {cart?.quantity}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <i
            onClick={(e) => deleteCartItem(cart.product._id, e)}
            className="ri-delete-bin-6-fill text-red-600 hover:text-lg"
          ></i>
        </div>
        <div className="bg-[#F0F0F0] text-center py-2 w-28  rounded-full flex justify-evenly absolute z-10 bottom-4 right-4">
          <i className="ri-subtract-fill text-lg" onClick={decreaseCount}></i>{" "}
          <p>{cartItemNum}</p>{" "}
          <i className="ri-add-line text-lg" onClick={increaseCount}></i>
        </div>
      </div>
    </>
  );
}
