import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get("reference");
  return (
    <div className="mt-12 p-4 flex justify-center items-center flex-col" >
      <h2 className="py-2 text-lg">Order SuccessFull </h2>
      <p>
        Reference No. <span className="font-semibold">{reference} </span>{" "}
      </p>
    </div>
  );
}
