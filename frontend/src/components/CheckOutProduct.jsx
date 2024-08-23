import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartQuantity } from "../app/features/product/productSlice";
import { updateProductQuantity } from "../app/features/order/CheckOutSlice";

export default function CheckOutProduct({ product }) {
  const [productQunatity, setproductQunatity] = useState(product?.quantity);
  const dispatch = useDispatch();
  const increaseQunatity = () => {
    setproductQunatity((prevQ) => prevQ + 1);
    console.log(product.product._id);
  };
  const decreaseQunatity = () => {
    setproductQunatity((prevQ) => (prevQ > 1 ? prevQ - 1 : 1));
  };
  useEffect(() => {
    dispatch(
      updateProductQuantity({
        productId: product.product._id,
        quantity: productQunatity,
      })
    );
  }, [productQunatity, dispatch]);
  return (
    <div className="relative">
      <Link to={`/products/${product?.product?._id}`}>
        <div className="border border-zinc-200 sm:w-full   flex my-4 p-2">
          <div className="flex w-full sm:h-36">
            <div className="bg-red-400 w-28 h-28 sm:w-36 sm:h-36 ">
              <img
                className="w-full h-full bg-cover"
                src={product?.product?.image[0].url}
                alt=""
              />
            </div>
            <div className="flex-grow p-2">
              <p className="text-lg">{product?.product?.name}</p>
              <div className="flex gap-4 py-2">
                <p className="font-medium">
                  {" "}
                  &#8377;{product.product.sellingPrice * product?.quantity}
                </p>{" "}
                <p className=" line-through"> {product?.product?.price}</p>
              </div>
              <p className="text-sm mb-4">Qty: {product?.quantity}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3">
        <i
          //   onClick={(e) => deleteproductItem(product.product._id, e)}
          className="ri-delete-bin-6-fill text-red-600 hover:text-lg"
        ></i>
      </div>
      <div className="bg-[#F0F0F0] text-center py-2 w-28  rounded-full flex justify-evenly absolute z-10 bottom-4 right-4">
        <i className="ri-subtract-fill text-lg" onClick={decreaseQunatity}></i>{" "}
        <p>{productQunatity}</p>{" "}
        <i className="ri-add-line text-lg" onClick={increaseQunatity}></i>
      </div>
    </div>
  );
}
