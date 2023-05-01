import Link from "next/link";
import React, { useState } from "react";
import { BsCart, BsFillSearchHeartFill, BsMenuApp } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import CategorirsSidebar from "@/components/Sidebars/CategorirsSidebar";
import UserSidebar from "@/components/Sidebars/UserSidebar";
import CartSidebar from "@/components/Sidebars/CartSidebar";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showCart, setShowCart] = useState(false);

//  hide sidebars
const handleCategoriesSidebar = () =>{
    setShowSidebar(!showSidebar)
    setShowCart(false)
    setShowUser(false)

}
 const handleUserSidebar = () =>{
    setShowSidebar(false)
    setShowCart(false)
    setShowUser(!showUser)
}
 const handleCartSidebar = () =>{
    setShowSidebar(false)
    setShowCart(!showCart)
    setShowUser(false)
} 
  return (
    <>
      <div className="fixed md:static bottom-2 w-full md:flex items-center justify-between md:mx-auto md:container border-2 border-teal-600 px-6 py-1 rounded-full">
        <div className="fixed md:static py-3 w-full bg-teal-600 md:bg-transparent md:w-auto left-0 flex justify-center items-center md:justify-start top-1 rounded-full">
          <CiShoppingTag size={35} />
          Logo
        </div>
        <div className="">
          {showSearch ? (
            <div className="flex fixed md:static top-1 left-0 w-full items-center md:w-96">
              <input
                placeholder="Search for products (e.g. fish, apple, oil)"
                className="px-6 w-full md:py-2 py-4 border border-teal-600 rounded-l-full text-teal-700 focus-within:outline-none focus-within:border-teal-700 focus-within:bg-teal-50 "
                type="search"
              />
              <span className="border-4 border-teal-600 md:px-3 px-5 bg-teal-600 md:py-2 py-4 rounded-r-full cursor-pointer hover:bg-teal-700">
                <BsSearch size={20} />
              </span>
            </div>
          ) : (
            <ul className=" items-center hidden md:flex py-2">
              <li>
                <Link
                  className="px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60 "
                  href={"#"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60 "
                  href={"#"}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60 "
                  href={"#"}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60 "
                  href={"#"}
                >
                  Blog
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex justify-between md:justify-normal z-50 w-full md:w-auto items-center gap-2">
          <span
            className="text-4xl md:text-2xl md:hidden hover:text-teal-600"
            onClick={handleCategoriesSidebar}
          >
            <RiMenu4Line />{" "}
          </span>
          <span
            className="text-4xl md:text-2xl hover:text-teal-600 px-4 py-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <BsSearch />
          </span>
          <span className="md:hidden text-4xl md hover:text-teal-600" text-2xl>
            <AiOutlineHome />
          </span>
          <span onClick={handleCartSidebar} className="text-4xl md:text-2xl hover:text-teal-600 px-4 py-2">
            <BsCart />
          </span>
          <span onClick={handleUserSidebar} className="text-4xl md:text-2xl hover:text-teal-600 px-4 py-2">
            <AiOutlineUserAdd />
          </span>
        </div>
      </div>
      {/* category */}
      <div
        className={`${
          showSidebar ? "left-0" : "-left-96"
        } duration-300 md:hidden  w-72 top-16 h-screen -z-10 fixed`}
      >
        <button
          className={`fixed top-0 left-0 w-full h-screen -z-30 ${
            showSidebar || "hidden"
          }`}
          onClick={() => setShowSidebar(false)}
        ></button>
        <CategorirsSidebar />
      </div>
      {/* user sidebar */}
      <div
        className={`${
          showUser ? "right-0" : "-right-96"
        } duration-300 md:hidden  w-72 top-16 h-screen -z-10 fixed`}
      >
        <button
          className={`fixed top-0 right-0 w-full h-screen -z-30 ${
            showUser || "hidden"
          }`}
          onClick={() => setShowUser(false)}
        ></button>
        <UserSidebar />
      </div>
      {/* cart  */}
      <div
        className={`${
          showCart ? "right-0" : "-right-[900px]"
        } duration-300 md:hidden w-full px-3 py-2 top-16 h-screen -z-10 fixed`}
      >
        <button
          className={`fixed top-0 right-0 w-full h-screen -z-30 ${
            showCart || "hidden"
          }`}
          onClick={() => setShowCart(false)}
        ></button>
        <CartSidebar />
      </div>
    </>
  );
};

export default Navbar;
