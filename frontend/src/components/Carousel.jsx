import React, { useState } from "react";

export default function Carousel({ sliders }) {
  let [current, setcurrent] = useState(0);
  const priviousSlide = () => {
    if (current === 0) setcurrent(sliders.length - 1);
    else setcurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === sliders.length - 1) setcurrent(0);
    else setcurrent(current + 1);
  };

  return (
    <div className=" relative w-full  h-full  bg-red-500 overflow-hidden rounded-lg group">
      <div
        className={`flex w-full h-full transition ease-out duration-500   `}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {sliders.map((item, idx) => (
          <img src={item} className="w-full  h-full block object-cover  " />
        ))}
      </div>

      <div className="absolute flex  justify-between items-center top-0 h-full w-full text-2xl px-5">
        <button onClick={priviousSlide}>
          <i class="ri-arrow-left-circle-fill"></i>
        </button>
        <button onClick={nextSlide}>
          <i class="ri-arrow-right-circle-fill"></i>
        </button>
      </div>
      <div className="absolute bottom-0 py-4 w-full flex justify-center gap-2 items-center hover:group-[]: ">
        {sliders.map((item, idx) => (
          <div
            onClick={() => setcurrent(idx)}
            className={`rounded-full cursor-pointer w-4 h-4  ${
              idx === current ? "bg-white" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
