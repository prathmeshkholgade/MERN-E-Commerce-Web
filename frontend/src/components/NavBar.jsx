import React, { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../app/features/user/userSlice";
export default function NavBar() {
  const [toggleMenu, settoggleMenu] = useState(false);
  const [searchInput, setsearchinput] = useState(false);
  const user = useSelector((state) => state?.User?.User?.user);
  const [showmenu, setShowMenu] = useState(false);
  const cartCount = useSelector((state) => state?.User?.User?.user?.cart);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    dispatch(logOut());
  };
  const handleToggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log(showmenu);
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
    <div className=" p-2 justify-between  w-full  flex md:justify-evenly items-center flex-wrap md:flex-nowrap fixed z-10  bg-gray-50 shadow-md  ">
      <div className="flex">
        <div className="  md:hidden  text-end " onClick={toggle}>
          <i className="ri-menu-2-line"></i>
        </div>
        <h2 className="md:text-lg ml-4 ">E-commerce</h2>
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
        <Link to={"/cart"} className="relative">
          {" "}
          <i className="ri-shopping-cart-line font-semibold"></i>{" "}
          <span className="bg-red-500 px-1 text-sm text-white rounded-lg absolute -left-2 -top-2">
            {cartCount?.length}
          </span>
        </Link>

        <i className="ri-account-circle-line" onClick={handleToggleMenu}></i>
      </div>

      {user && (
        <div className="hidden md:block" onClick={handleToggleMenu}>
          <div className=" flex justify-center items-center cursor-pointer">
            <p className="font-semibold text-center">
              {user.fullName}{" "}
              <i className="ri-arrow-drop-down-line text-lg text-center"></i>
            </p>
          </div>{" "}
        </div>
      )}

      <div
        className={`${
          toggleMenu ? "block" : "hidden"
        }  links  md:flex items-center absolute md:static left-0 top-14  w-full md:w-auto bg-zinc-50 md:bg-transparent z-10 `}
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
                className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent relative`}
              >
                {idx === 1 && (
                  <i className="ri-shopping-cart-line text-xl text-black"></i>
                )}{" "}
                {idx === 1 && (
                  <span className="bg-red-500 px-1 text-sm text-white rounded-lg absolute left-4 -top-2 ">
                    {cartCount?.length}
                  </span>
                )}{" "}
                {item.name}
              </li>
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink onClick={handleLogout}>
                <li
                  className={`hover:text-gray-600 font-semibold hover:bg-gray-200 w-full py-1 px-2 rounded-lg  md:hover:bg-transparent`}
                >
                  Logout
                </li>
              </NavLink>
            </>
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
      {showmenu && (
        <div className="bg-zinc-50 absolute right-0 top-10  md:right-[26%] md:top-16 w-32 flex flex-col justify-center text-center rounded-lg shadow-lg">
          <ul>
            <NavLink to={"/myorder"}>
              <li className="py-2  border-b-2 border-slate-200 ">Orders</li>
            </NavLink>
            {user?.isAdmin && (
              <NavLink to={"/admin"}>
                {" "}
                <li className="py-2  border-b-2 border-slate-200">Admin</li>
              </NavLink>
            )}
          </ul>
        </div>
      )}
      <div className="sm:hidden flex gap-2">
        <div onClick={toggleSearch}>
          <i className="ri-search-2-line  "></i>
        </div>

        <Link to={"/cart"} className="relative px-2">
          {" "}
          <i className="ri-shopping-cart-line"></i>
          <span className="bg-red-500 px-1 text-sm text-white rounded-lg absolute -left-1 -top-1 ">
            {cartCount?.length}
          </span>
        </Link>
        <div onClick={handleToggleMenu}>
          <i className="ri-account-circle-line"></i>
        </div>
      </div>
    </div>
  );
}
