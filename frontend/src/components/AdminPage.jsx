import React, { useEffect } from "react";
import AdminSideNav from "./AdminSideNav";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../app/features/product/productSlice";
import ProductCard from "./ProductCard";
import { totalOrder } from "../app/features/order/orderSlice";

export default function AdminPage() {
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.Product.Products);

  const loadData = async () => {
    dispatch(allProducts());
    dispatch(totalOrder());
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="flex mt-8">
      <div className="">
        <AdminSideNav />
      </div>
      <div className=" w-full flex flex-wrap gap-4 p-2">
        {AllProducts &&
          AllProducts.map((product) => (
            <>
              <ProductCard key={product._id} product={product} />
            </>
          ))}
      </div>
    </div>
  );
}
