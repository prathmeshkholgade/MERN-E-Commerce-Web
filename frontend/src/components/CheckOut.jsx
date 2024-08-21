import React, { useState } from "react";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import PriceDetails from "./PriceDetails";
import { useForm } from "react-hook-form";
import AddressPopPup from "./AddressPopPup";
import { createOrder } from "../app/features/order/orderSlice";

export default function CheckOut() {
  const { register, handleSubmit } = useForm();
  const carts = useSelector((state) => state?.User?.User?.user?.cart);
  const address = useSelector((state) => state?.User?.User?.user?.address);
  const user = useSelector((state) => state?.User?.User?.user);
  const [showAddForm, setshowAddForm] = useState(false);
  const disPatch = useDispatch();
  const hoverShowForm = () => {
    setshowAddForm(!showAddForm);
  };
  const totalAmount =
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

  const placeOrder = async (data) => {
    try {
      console.log(data);
      console.log(totalAmount);
      const selectedAddress = address.find((add) => add._id === data.address);
      const phoneNumber = selectedAddress.number;
      const products = carts.map((product) => ({
        productId: product.product._id,
        quantity: product.quantity,
      }));
      const orderData = {
        address: data.address, // the selected address ID
        amount: totalAmount, // total amount calculated
        products: products,
        quantity: totalQuantity,
        userId: user._id,
      };
      carts.map((product) => {
        console.log(product.product._id);
      });
      const orderResponse = await disPatch(createOrder({ orderData })).unwrap();
      console.log(orderResponse);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: orderResponse.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Prathmesh Kholgade",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderResponse.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8080/payment/verify",
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: phoneNumber,
        },
        notes: {
          address: data.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative w-[95%] mx-auto mt-8  flex flex-col-reverse sm:flex-row">
      <div>
        {address && address.length > 0 ? (
          <div className="w-fit h-fit p-2">
            <h4 className="py-2  text-2xl font-semibold">DELIVERY ADDRESS </h4>
            <hr />
            <div className=" ">
              {address.map((res, idx) => (
                <div className="flex items-center ">
                  <input
                    type="radio"
                    value={res._id}
                    className="pr-4"
                    {...register("address", { required: true })}
                    defaultChecked={idx === address.length - 1}
                  />
                  <p className="p-2 text-lg tracking-normal">
                    <span className="font-bold">{res.name} </span>{" "}
                    <span>{res.locality}</span> <span>{res.landmark}</span>{" "}
                    <span>{res.city}</span> <span>{res.state}</span>{" "}
                    <span>{res.pinCode}</span>
                  </p>{" "}
                </div>
              ))}
              <p className="pl-4 text-lg" onClick={hoverShowForm}>
                {" "}
                {showAddForm ? (
                  <i className="ri-close-circle-line text-2xl"></i>
                ) : (
                  <>
                    <span className="mr-4 text-2xl font-bold"> +</span>
                    <span>Add a new address</span>{" "}
                  </>
                )}
              </p>
              {showAddForm && (
                <Address
                  showAddForm={showAddForm}
                  setshowAddForm={setshowAddForm}
                />
              )}
            </div>
          </div>
        ) : (
          <Address showAddForm={showAddForm} setshowAddForm={setshowAddForm} />
        )}
        <hr />
        <div>
          <h3 className="text-xl font-semibold py-2">Product</h3>
          {carts &&
            carts.map((product, idx) => (
              <div className="w-[90%] mx-auto">
                <CartProduct cart={product} />
              </div>
            ))}
        </div>
        <div className="flex justify-end items-end py-2">
          <button
            onClick={handleSubmit(placeOrder)}
            className="bg-orange-400 py-4 px-6 text-white font-semibold rounded"
          >
            PLACE ORDER
          </button>
        </div>

        <hr />
      </div>

      <div className=" flex-grow">
        <div className=" flex justify-center ">
          <PriceDetails />
        </div>

        {/* {carts&& carts.map((item,idx)=> <CartProduct cart={item} />)} */}
      </div>
    </div>
  );
}
