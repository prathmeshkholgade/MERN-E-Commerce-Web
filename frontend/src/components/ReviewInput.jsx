import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  addReview,
  fetchSingleProduct,
} from "../app/features/product/productSlice";
import { useParams } from "react-router-dom";
export default function ReviewInput() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    try {
      console.log(id);
      console.log(data);
      dispatch(addReview({ id, data }));
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full md:w-1/2 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold mb-2">Leave a Review</h1>
        <div className="">
          <fieldset class="starability-slot">
            <legend>Rating:</legend>
            <input
              type="radio"
              id="no-rate"
              class="input-no-rate"
              {...register("rating")}
              name="rating"
              value="1"
              checked
              aria-label="No rating."
            />
            <input
              type="radio"
              {...register("rating")}
              id="first-rate1"
              name="rating"
              value="1"
            />
            <label for="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              {...register("rating")}
              id="first-rate2"
              name="rating"
              value="2"
            />
            <label for="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              {...register("rating")}
              id="first-rate3"
              name="rating"
              value="3"
            />
            <label for="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              {...register("rating")}
              id="first-rate4"
              name="rating"
              value="4"
            />
            <label for="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              {...register("rating")}
              id="first-rate5"
              name="rating"
              value="5"
            />
            <label for="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
        </div>
        <div className="my-2">
          <label htmlFor="comment">Comment</label>
          <textarea
            className="w-full h-28"
            {...register("comment", {
              required: { value: true, message: "Please write a review" },
            })}
          ></textarea>
          {errors.comment && (
            <p className="text-red-400">{errors.comment.message}</p>
          )}
        </div>
        <div>
          <button
            disabled={isSubmitting}
            className="bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded border border-black  py-2 px-4 transition duration-75 ease-in-out"
          >
            {isSubmitting ? "Submitting..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
