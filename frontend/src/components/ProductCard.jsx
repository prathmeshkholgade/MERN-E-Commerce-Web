import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <>
      {product && (
        <div
          className="w-[45%]  sm:w-[30%] md:w-[20%] lg:w-[15%] p-2 bg-zinc-100 rounded-lg cursor-pointer "
          onClick={() => {}}
        >
          {" "}
          <Link to={`/products/${product._id}`}>
            <div>
              <img
                src={product.image[0].url}
                alt=""
                className=" w-full h-52 object-contain sm:object-cover rounded-lg hover:scale-105"
              />
            </div>
            <div className="px-2 relative">
              <p className="py-2">{product.name}</p>
              <div className="flex gap-4">
              <p className="font-medium"> &#8377;{Math.floor(product.price * 0.9)}</p>
              <p className="line-through text-zinc-600"> &#8377;{product.price}</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
