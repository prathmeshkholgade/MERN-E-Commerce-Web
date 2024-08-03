import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function SimilarProduct() {
  const simiralProducts = useSelector((state) => state.Product.similarProduct);
  return (
    simiralProducts.length > 0 && (
      <>
        <h2 className="px-8 text-2xl font-semibold py-2">
          You might also like this product{" "}
        </h2>
        <div className="px-8 py-2 flex gap-4 flex-wrap">
          {simiralProducts.map((product, idx) => (
            <>
              {" "}
              <ProductCard key={product._id} product={product} />
            </>
          ))}
        </div>
      </>
    )
  );
}
