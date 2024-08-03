import React from "react";
import Carousel from "./Carousel";

import img1 from "../imgs/img1.jpg";
import img4 from "../imgs/img4.jpg";
import img2 from "../imgs/img2.jpg";
import img3 from "../imgs/img3.jpg";
import Carousel2 from "./Carousel2";
import ProductContainer from "./ProductContainer";

export default function Body() {
  const imgs = [img1, img4, img2, img3];
  return (
    <>
      <div className="w-[90%] h-[25vh] sm:h-[50vh] mx-auto mt-4 sm:mt-8 flex-grow">
        <Carousel2 sliders={imgs} />
      </div>

      <div className="sm:w-[90%] mx-auto">
        <ProductContainer />
      </div>
    </>
  );
}
