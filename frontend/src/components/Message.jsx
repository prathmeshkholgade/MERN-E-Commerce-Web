import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../app/features/message/messageSlice";

export default function Message() {
  const message = useSelector((state) => state.Message.message);
  const success = useSelector((state) => state.Message.success);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  return (
    <>
      {message && (
        <div className=" text-center py-3 ">
          <div
            className={`${
              success ? "bg-green-300" : "bg-red-400"
            } w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%]  py-2 mx-auto rounded-lg relative`}
          >
            {message}
            <div
              className={"absolute top-1.5 right-0 text-xl text-center mr-4"}
              onClick={() => dispatch(clearMessage())}
            >
              <i className="ri-close-circle-line hover:text-2xl"></i>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
