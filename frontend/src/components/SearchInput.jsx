import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearSearchResults,
  searchProducts,
  searchResults,
} from "../app/features/product/productSlice";
import { useForm } from "react-hook-form";
export default function SearchInput() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const suggestionProducts = useSelector(
    (state) => state.Product.searchProducts
  );

  const [showSuggestion, setshowSuggestion] = useState(false);
  const [searchDelay, setSearchDelay] = useState(null);

  const search = watch("search") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(searchResults(search));
    setshowSuggestion(false);
    navigate(`/search`);
  };

  const handleClick = (name) => {
    setValue("search", name);
    dispatch(searchResults(name));
    navigate("/search");
    setshowSuggestion(false);
  };

  useEffect(() => {
    if (search && search.length >= 3) {
      if (searchDelay) {
        clearTimeout(searchDelay);
      }
      const delay = setTimeout(() => {
        dispatch(searchProducts(search));
      }, 1000); // 2 seconds delay

      setSearchDelay(delay);
    } else {
      dispatch(clearSearchResults());
    }
  }, [search, dispatch]);

  return (
    <div className="w-[90%] sm:w-full sm:h-full mx-auto relative">
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("search", { required: true })}
          onBlur={() => setshowSuggestion(false)}
          onFocus={() => setshowSuggestion(true)}
          className="w-full h-full pl-6 py-2 rounded-lg"
          placeholder="What are you looking for?"
        />
        <button className="absolute">
          <i className="ri-search-2-line absolute right-9 sm:right-4 py-2 "></i>{" "}
        </button>
      </form>
      {suggestionProducts.length > 0 && showSuggestion && (
        <div className="bg-zinc-100 max-h-96 w-full absolute p-4 overflow-hidden">
          {suggestionProducts.map((item, idx) => (
            <div
              className="flex gap-4 p-2 text-lg hover:bg-zinc-200 rounded-lg"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleClick(item.name)}
            >
              <i className="ri-search-2-line"></i> <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
