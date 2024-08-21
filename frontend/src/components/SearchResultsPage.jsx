import React from "react";
import ProductCart from "./ProductCard";
import { useSelector } from "react-redux";
export default function SearchResultsPage() {
  const products = useSelector((state) => state.Product.searchResults);
  return (
    <div className="w-[95%] mx-auto flex flex-wrap mt-12 gap-4">
      {products.map((product) => (
        <ProductCart product={product} />
      ))}
    </div>
  );
}
