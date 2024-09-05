import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addOrder } from "../app/features/order/orderSlice";

export default function OrderInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.Order?.OrderInfo);
  console.log(order);

  const getOrder = async (id) => {
    await dispatch(addOrder({ id }));
  };
  useEffect(() => {
    getOrder(id);
  }, [id, dispatch]);
  return (
    order && (
      <div className="mt-10">
        <div className="mt-4 flex justify-evenly gap-4 ">
          <div className="border border-slate-600 w-72 flex flex-col gap-2 p-2">
            <h4>Customer Details</h4>
            <div className="flex justify-between ">
              <p>Name</p> <p>{order.user.fullName}</p>
            </div>
            <div className="flex  justify-between">
              <p>Email</p> <p>{order.user.email}</p>
            </div>
            <div className="flex justify-between">
              <p>Number</p> <p>{order.shippingAddress.number}</p>
            </div>
          </div>
          <div className="border border-slate-600 w-72 flex flex-col gap-2 p-2">
            <h4>Delivery Address</h4>
            <div className="flex justify-between ">
              <p>Address line</p> <p>{order.shippingAddress.landmark}</p>
            </div>
            <div className="flex  justify-between">
              <p>Street</p> <p>{order.shippingAddress.locality}</p>
            </div>
            <div className="flex  justify-between">
              <p>City</p> <p>{order.shippingAddress.city}</p>
            </div>
            <div className="flex  justify-between">
              <p>state</p> <p>{order.shippingAddress.state}</p>
            </div>
            <div className="flex  justify-between">
              <p>pinCode</p> <p>{order.shippingAddress.pinCode}</p>
            </div>
            <div className="flex justify-between">
              <p>Number</p> <p>{order.shippingAddress.number}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex ">
          <div className="w-1/2">
            <table className="w-full">
              <thead>
                {" "}
                <tr>
                  <th>Item Summary</th>
                  <th>QTY</th>
                  <th>Price</th>
                  <th>TotalPrice</th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {/* <div className="flex flex-col gap-4 w-full"> */}
                {order.product.map((product) => (
                  <tr>
                    <div className="flex">
                      <td className="flex">
                        <img
                          src={product.products.image[0].url}
                          className="w-20 h-20 object-cover p-2"
                        />
                        <span className="p-2">{product.products.name}</span>{" "}
                      </td>
                    </div>
                    {/* <div> */}
                    <td> {product.quantity} </td>
                    <td> {product.sellingPrice} </td>
                    <td> {product.quantity * product.sellingPrice} </td>
                    {/* </div> */}
                  </tr>
                ))}
                {/* </div> */}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-semibold">Ordedr Summary</h4>
            <p>{order.totalPrice}</p>
          </div>
        </div>
      </div>
    )
  );
}
