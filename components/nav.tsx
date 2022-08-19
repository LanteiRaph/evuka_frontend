import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { BsCart4 } from "react-icons/bs";
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdCastForEducation } from "react-icons/md";
export const NavBar = () => {
  //Xtract the router
  const router = useRouter();
  //Change to given route
  const pushRoute = (route: string) => {
    router.push(route);
  };
  //Extract the user and logout function form the Auth context
  const { user, logout } = useContext(AuthContext);

  //Extract the cart from the cart context
  const { cart } = useContext(CartContext);
  //Creat local state values[term...]
  const [term, setTerm] = useState("");

  //hangle input change
  const handleChange = (e: any) => {
    setTerm(e.target.value);
  };

  //handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/search/" + term);
    setTerm("");
  };

  return (
    <>
      <nav className="border border-gray-200 px-6 py-4 mx-auto mx-w-7xl">
        <div className="flex gap-x-2 justify-between  md:gap-x-6 h-18">
          <button className="inline-block md:hidden">
            <CgMenuLeftAlt className="h-6 w-6 text-gray-900" />
          </button>
          <a href="/" className="hidden md:inline-flex items-center">
            <MdCastForEducation />
          </a>
          <ul className="hidden text-gray-700 md:flex md:gap-x-8 md:items-center">
            <li>
              <Link href={"/"}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href={"/course"}>
                <a href="">Course</a>
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <a href="">Community</a>
              </Link>
            </li>
          </ul>
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center w-4/12 lg:w-5/12"
          >
            <input
              value={term}
              onChange={handleChange}
              type="search"
              name="Search"
              id="search"
              className="hidden sm:inline-block flex-1 py-1.5 px-4 text-gray-700 bg-gray-100 rounded-full border border-gray-100 transition focus:outline-none focus:bg-white focus:border-gray-700"
            />
          </form>
          <div className="flex flex-row reverse gap-x-2 items-center md:gap-x-4 lg:flex-row">
            <Link href={"/cart"}>
              <div className="flex items-center relative">
                <div
                  className={
                    "absolute h-4 w-4 bg-red-400 rounded-full -top-2 -right-1 " +
                    `${!cart.length ? "hidden" : ""}`
                  }
                ></div>
                <BsCart4 className="w-7 h-7" />
              </div>
            </Link>
            <button className="hidden lg:inline-block py-1.5 px-5 rounded-full border border-gray-200">
              Upload
            </button>
            {!user ? (
              <>
                <button
                  onClick={() => pushRoute("/auth/login")}
                  className="hidden lg:inline-block py-1.5  px-5 bg-purple-500 hover:bg-purple-700 text-white font-bold  rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => pushRoute("/auth/signup")}
                  className="hidden lg:inline-block py-1.5 px-5 border border-gray-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button onClick={() => pushRoute("/user")} className="object-cover overflow-hidden w-10 h-10 rounded-full border border-gray-200">
                  <img src="/img/avatar-1.jpeg" alt="" />
                </button>
                <button onClick={logout} className="hidden lg:inline-block py-1.5  px-5 bg-purple-500 hover:bg-purple-700 text-white font-bold  rounded">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
