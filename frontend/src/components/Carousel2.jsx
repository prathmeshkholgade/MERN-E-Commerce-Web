import React, { useEffect, useState } from "react";

export default function Carousel2({ sliders }) {
  const [currImg, setcurrImg] = useState(0);
  const priviousSlide = () => {
    if (currImg === 0) setcurrImg(sliders.length - 1);
    else setcurrImg(currImg - 1);
  };
  const nextSlide = () => {
    if (currImg === sliders.length - 1) setcurrImg(0);
    else setcurrImg(currImg + 1);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currImg]);

  return (
    <div className="w-full h-full relative group">
      <div
        style={{ backgroundImage: `url(${sliders[currImg]})` }}
        className="w-full h-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="btn absolute w-full h-full top-0  justify-between items-center text-2xl px-4  flex   sm:hidden  sm:group-hover:flex">
        <button className="" onClick={priviousSlide}>
          <i className="ri-arrow-left-circle-fill"></i>
        </button>
        <button className="" onClick={nextSlide}>
          <i className="ri-arrow-right-circle-fill"></i>
        </button>
      </div>
      <div className=" gap-4 py-4 absolute w-full bottom-0 flex justify-center items-center">
        {sliders.map((item, idx) => (
          <div
            onClick={() => setcurrImg(idx)}
            key={idx}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              currImg === idx ? "bg-white" : "bg-gray-300"
            }  `}
          ></div>
        ))}
      </div>
    </div>
  );
}
