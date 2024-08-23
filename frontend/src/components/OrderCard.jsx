import React from "react";
import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
  console.log(order);
  return (
    order && (
      <div className="bg-zinc-100 my-2">
        <p className="">OrderId : {order?.paymentInfo.orderId}</p>
        <div className=" w-full flex justify-evenly mt-2">
          <div className=" flex flex-col  mt-2 w-[40%] ">
            {order.product.map((product) => (
              <Link to={`/products/${product.products._id}`}>
                <div className="flex gap-6 p-2  w-full">
                  {" "}
                  <div className="w-20">
                    <img src={product.products.image[0].url} alt="" />
                  </div>
                  <div>
                    <p>{product.products.name}</p>
                    <p className="my-2">{product.sellingPrice}</p>
                    <p>QTY:{product.quantity}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className=" pt-4 flex flex-col p-4 justify-center">
            <p>Total Price : {order.totalPrice}</p>{" "}
            <p>Total Quantity : {order.quantity}</p>
          </div>
          <div className="flex flex-col justify-center  ">
            {" "}
            <p> Delivered on few days</p>
          </div>
        </div>
      </div>
    )
  );
}
