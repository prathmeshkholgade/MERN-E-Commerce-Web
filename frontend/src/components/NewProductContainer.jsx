import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allProducts } from "../app/features/product/productSlice";
import NewProducts from "./NewProducts";
export default function NewProductContainer() {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.Product.Products);
  const loadData = async () => {
    dispatch(allProducts());
  };
  useState(() => {
    loadData();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {AllProducts &&
            AllProducts.map((product) => (
              <NewProducts key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
