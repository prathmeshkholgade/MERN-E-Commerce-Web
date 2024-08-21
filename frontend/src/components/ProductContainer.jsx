import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../app/features/product/productSlice";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import NewProducts from "./NewProducts";
export default function ProductContainer() {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.Product.Products);
  const loadData = async () => {
    dispatch(allProducts());
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="w-full justify-evenly my-8 flex gap-4 sm:gap-5 flex-wrap items-center lg:justify-normal sm:justify-center">
      {AllProducts &&
        AllProducts.map((product) => (
          <>
            <ProductCard key={product._id} product={product} />
          </>
        ))}
    </div>
  );
}
