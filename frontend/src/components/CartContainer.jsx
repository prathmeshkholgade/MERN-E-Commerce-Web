import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../app/features/product/productSlice";
import { Link, NavLink } from "react-router-dom";
export default function CartContainer() {
  const carts = useSelector((state) => state?.User?.User?.user?.cart);
  const itemsPrice =
    carts &&
    carts.reduce(
      (preV, currV) => preV + (currV.product ? currV.product.price : 0),
      0
    );
  const dispatch = useDispatch();
  const deleteCartItem = (id, event) => {
    event.stopPropagation();
    dispatch(deleteFromCart(id));
  };
  console.log(carts);
  return (
    <div className="w-[95%] mx-auto sm:py-4 sm:flex gap-12  ">
      {carts?.length > 0 ? (
        <>
          <div className="sm:w-1/2 h-[60vh] sm:h-[80vh] overflow-auto">
            {carts.map((cart, idx) => (
              <div className="relative">
                <Link to={`/products/${cart?.product?._id}`}>
                  <div className="border border-zinc-200 sm:w-full flex my-4 p-2">
                    <div className="bg-red-400 w-28 h-28 sm:w-36 sm:h-36 ">
                      <img
                        className="w-full h-full bg-cover"
                        src={cart?.product?.image[0].url}
                        alt=""
                      />
                    </div>
                    <div className="flex-grow p-2">
                      <p>{cart?.product?.name}</p>
                      <p className="py-2"> {cart?.product?.price}</p>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-3 right-3">
                  <i
                    onClick={(e) => deleteCartItem(cart.product._id, e)}
                    className="ri-delete-bin-6-fill text-red-600 hover:text-lg"
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-100 my-4 p-4 sm:w-[40%] lg:w-[30%] flex flex-col h-fit">
            <div>
              <h2 className="font-semibold text-zinc-700 text-lg py-2">
                Products Details
              </h2>
            </div>

            <hr />
            <div className="flex justify-between p-4">
              <p className="text-lg text-zinc-700">
                Price ({carts && carts.length} items){" "}
              </p>
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
          </div>
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
