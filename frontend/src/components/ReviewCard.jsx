import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../app/features/product/productSlice";
import { setMessage } from "../app/features/message/messageSlice";
import { useParams } from "react-router-dom";

export default function ReviewCard({ rew }) {
  const dispatch = useDispatch();
  const user = useSelector((state, action) => state.User?.User?.user);
  const { id } = useParams();
  const deleteReviewItem = async (productId, reviewId) => {
    try {
      const res = await dispatch(deleteReview(productId, reviewId)).unwrap();
    } catch (err) {
      console.log(err);
      dispatch(setMessage({ message: err, success: false }));
    }
  };
  return (
    <div className="border border-zinc-400 w-full sm:w-[45%] lg:w-[30%] p-2  lg:p-4 relative">
      <p className="font-semibold text-lg pb-2">@{rew?.owner?.fullName}</p>
      <p className="starability-result text-sm" data-rating={rew.rating}>
        Rated: 3 stars
      </p>{" "}
      <p className="py-2">{rew.comment}</p>{" "}
      <p className="">
        Posted on
        {new Date(rew.createdAt).toLocaleString().split(",")[0]}
      </p>
      {user && user?._id === rew?.owner?._id && (
        <button
          onClick={() => deleteReviewItem({ productId: id, reviewId: rew._id })}
          className="absolute bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg right-2 bottom-4 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}
