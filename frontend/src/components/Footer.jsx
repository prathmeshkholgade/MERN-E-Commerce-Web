import React from "react";

export default function footer() {
  return (
    <div className="bg-zinc-100 p-2 sm:px-4 sm:py-8 w-full flex flex-col sm:flex-row  justify-evenly items-center">
      <div className="w-3/5 sm:w-fit">
        <h2 className="text-lg">&copy; NewSamaratEnterPrises</h2>
        <div className=" flex gap-4 py-2">
          <i className="ri-instagram-line text-lg hover:text-xl"></i>
          <i className="ri-facebook-circle-fill text-lg hover:text-xl"></i>
          <i className="ri-twitter-fill text-lg hover:text-xl"></i>
        </div>
      </div>
      <div className="w-3/5 sm:w-fit ">
        <p className="text-lg  font-semibold">Company</p>
        <ul className="flex sm:flex-col gap-2">
          <li>About</li>
          <li>Products</li>
        </ul>
      </div>
    </div>
  );
}
