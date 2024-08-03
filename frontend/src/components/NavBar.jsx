import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../app/features/user/userSlice";
export default function NavBar() {
  const [toggleMenu, settoggleMenu] = useState(false);
  const [searchInput, setsearchinput] = useState(false);
  const user = useSelector((state) => state.User.User);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  const searchItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "cart" },
  ];
  const toggle = () => {
    settoggleMenu(!toggleMenu);
    if (searchInput) {
      setsearchinput(false);
    }
  };
  const toggleSearch = () => {
    setsearchinput(!searchInput);
    if (toggleMenu) {
      settoggleMenu(false);
    }
  };

  return (
    <div className=" p-2 justify-between  w-full  flex md:justify-evenly items-center flex-wrap md:flex-nowrap fixed z-10  bg-gray-50 shadow-md ">
      <div className="flex">
        <div className="  md:hidden  text-end " onClick={toggle}>
          <i className="ri-menu-2-line"></i>
        </div>
        <h2 className="md:text-lg ml-4 ">NewSamaratInterPrises</h2>
      </div>

      <div
        className={`hidden w-[60%] md:w-[35%] rounded-lg relative  sm:flex z-10`}
      >
        <SearchInput />
      </div>
      <div
        className={`${
          searchInput ? "block" : "hidden"
        } sm:hidden absolute top-12 w-full bg-white py-2 z-10`}
      >
        <SearchInput />
      </div>
      <div className="hidden sm:flex md:hidden gap-4">
        <i className="ri-shopping-cart-line"></i>
        <i className="ri-account-circle-line"></i>
      </div>

      <div
        className={`${
          toggleMenu ? "block" : "hidden"
        }  links  md:flex items-center absolute md:static left-0 top-14  w-full md:w-auto bg-zinc-50 md:bg-transparent z-10`}
      >
        <ul className="py-2 px-8 flex flex-col items-start md:flex-row  md:p-2  md:items-center  lg:gap-8  ">
          {searchItems.map((item, idx) => (
            <NavLink
              to={item.path}
              key={idx}
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              {" "}
              <li
                className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent`}
              >
                {item.name}
              </li>
            </NavLink>
          ))}

          {user ? (
            <NavLink onClick={handleLogout}>
              <li
                className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent`}
              >
                Logout
              </li>
            </NavLink>
          ) : (
            <>
              <NavLink to={"login"}>
                <li
                  className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent`}
                >
                  Login
                </li>
              </NavLink>
              <NavLink to={"/signup"}>
                <li
                  className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent`}
                >
                  Signup
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>

      <div className="sm:hidden flex gap-2">
        <div onClick={toggleSearch}>
          <i className="ri-search-2-line  "></i>
        </div>

        <i className="ri-shopping-cart-line"></i>
        <i className="ri-account-circle-line"></i>
      </div>
    </div>
  );
}
