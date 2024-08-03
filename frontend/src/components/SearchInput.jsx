import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  clearSearchResults,
  searchProducts,
} from "../app/features/product/productSlice";

export default function SearchInput() {
  const [search, setsearch] = useState("");
  const products = useSelector((state) => state.Product.searchProducts);
  const [showSuggestion, setshowSuggestion] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is final data now");
    console.log(products);
  };
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setshowSuggestion(false);
    }
  };
  useEffect(() => {
    console.log(search);
    console.log(search.length);
    if (search !== "") {
      dispatch(searchProducts(search));
      console.log(products);
    } else {
      dispatch(clearSearchResults());
    }
  }, [search, dispatch]);

  return (
    <div className="w-[90%] sm:w-full sm:h-full mx-auto relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          
          value={search}
          required
          onChange={(e) => setsearch(e.target.value)}
          onBlur={() => setshowSuggestion(false)}
          onFocus={() => setshowSuggestion(true)}
          className="w-full h-full pl-6 py-2 rounded-lg"
          placeholder="What are you looking for ?"
        />
        <button onClick={handleSubmit}>
          {" "}
          <i className="ri-search-2-line absolute right-9 sm:right-4 py-2 "></i>
        </button>
      </form>
      {products.length > 0 && showSuggestion && (
        <div className="bg-zinc-100 max-h-96 w-full absolute p-4 overflow-hidden">
          {products.map((item, idx) => (
            <div className="flex gap-4 p-2 text-lg hover:bg-zinc-200 rounded-lg">
              <i className="ri-search-2-line"></i> <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
