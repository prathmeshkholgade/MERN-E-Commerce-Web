import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import Message from "./components/Message";
import ProductContainer from "./components/ProductContainer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow mt-14">
        <Message />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
