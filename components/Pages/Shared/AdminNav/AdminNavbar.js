import Link from "next/link";
import React, { useState } from "react";
import { BsCart, BsCartCheck, BsCartCheckFill, BsFillSearchHeartFill, BsMenuApp } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import CategorirsSidebar from "@/components/Sidebars/CategorirsSidebar";
import UserSidebar from "@/components/Sidebars/UserSidebar";
import CartSidebar from "@/components/Sidebars/CartSidebar";
import NavCategories from "@/components/Categories/NavCategories";
import AdminSidebar from "@/components/Dashboard/Admin/AdminSidebar/AdminSidebar";
import Image from "next/image";

const AdminNavbar = () => {
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
    <div className="md:fixed z-50 w-full flex justify-center md:top-0 md:bottom-auto">
      {/* Right side checkout button */}
      <div onClick={()=>setShowCart(true)} className="fixed cursor-pointer select-none right-0 top-1/2 md:block hidden  bg-teal-500 px-4 z-10 py-2 rounded-l-md">
          <p className="text-white font-bold flex items-center gap-2 py-2"> <span><BsCartCheckFill /></span> 15 Items</p>
          <p className="bg-white px-3 py-1 rounded-md font-bold text-teal-600">$423</p>
        </div>

      <div className="fixed md:sticky md:top-0 md:bottom-auto bottom-2 w-full md:flex items-center justify-between md:mx-auto z-50 md:container border-2 border-teal-600 bg-white px-6 py-1 rounded-full">
        {/* Navbar start */}
        <div className="fixed md:static py-1 w-full bg-teal-600 md:bg-transparent md:w-auto left-0 flex !z-50 justify-center items-center md:justify-start top-1 rounded-full">
          {/* Logo */}
          <Link href={'/'}><Image src={'/logo.svg'} height={60} width={60} alt=""></Image></Link>
        </div>
        {/* Desktop fixed categories */}
        <div className="md:block hidden">
          <NavCategories />
        </div>
        {/* Search box */}
        <div className=" w-full flex justify-center">
          {showSearch ? (
            <div className="flex !z-[999999999] fixed md:static top-1 left-0 w-full items-center md:w-64 lg:w-72 xl:w-96">
              <input
                placeholder="Search for products (e.g. fish, apple, oil)"
                className="px-6 w-full py-2 border border-teal-600 rounded-l-full text-teal-700 focus-within:outline-none focus-within:border-teal-700 focus-within:bg-teal-50 "
                type="search"
              />
              <span className="border-4 text-white border-teal-600 md:px-3 px-5 bg-teal-600 py-2 rounded-r-full cursor-pointer hover:bg-teal-700">
                <BsSearch size={20} />
              </span>
            </div>
          ) : (
            <ul className=" items-center hidden md:flex py-2">
              {/* Desktop nav link area */}
              <li>
                <Link
                  className={`px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"#"}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/offers"}
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/user"}
                >
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* Mobile bottom navbar */}
        <div className="flex justify-between md:justify-normal z_index !z-50 w-full md:w-auto items-center gap-2">
          <span className={`text-2xl cursor-pointer md:hidden hover:text-teal-600`}
            onClick={handleCategoriesSidebar}
          >
            <RiMenu4Line />
          </span>
          <span className={`text-2xl cursor-pointer hover:text-teal-600 ${showSearch && 'text-teal-600'} px-1 py-2`}
            onClick={() => setShowSearch(!showSearch)}
          >
            <BsSearch />
          </span>
          <span className={`md:hidden cursor-pointer text-2xl md hover:text-teal-600`} text-2xl>
            <AiOutlineHome />
          </span>
          <span className={`text-2xl cursor-pointer hover:text-teal-600 ${showCart && 'text-teal-600'} px-4 py-2`} onClick={handleCartSidebar}>
            <BsCart />
          </span>
          <span className={`text-2xl cursor-pointer hover:text-teal-600 ${showUser && 'text-teal-600'} px-4 py-2`} onClick={handleUserSidebar} >
            <AiOutlineUserAdd />
          </span>
        </div>
      </div>
      {/* mobile category sidebar */}
      <div
        className={`${
          showSidebar ? "left-0" : "-left-96"
        } duration-300 md:hidden w-72 z-20 top-12 bottom-12 h-screen fixed`}
      >
        <button
          className={`fixed top-0 left-0 -z-10 w-full h-screen ${
            showSidebar || "hidden"
          }`}
          onClick={() => setShowSidebar(false)}
        ></button>
        <AdminSidebar />
      </div>
      {/* mobile + desktop user sidebar */}
      <div
        className={`${
          showUser ? "right-0 md:top-[30%] md:left-[10%] lg:left-[25%] xl:left-[30%]" : "-right-[9999px] md:-top-96 md:left-[30%]" 
        } duration-300  z-20 w-full md:w-[600px] md:h-96 top-12 h-screen fixed`}
      >
        <button
          className={`fixed top-0 -z-10 left-0 w-full h-screen ${
            showUser || "hidden"
          }`}
          onClick={() => setShowUser(false)}
        ></button>
        <UserSidebar />
      </div>
      {/* mobile + desktop cart sidebar  */}
      <div
        className={`${
          showCart ? "right-0 md:right-0":"-right-[900px]"
        } duration-300 w-full md:w-[500px] z-20 px-3 bg-base-100 py-2 top-12 md:top-14 h-screen fixed`}
      >
        <button
          className={`fixed top-0 -z-10 right-0 w-full h-screen ${
            showCart || "hidden"
          }`}
          onClick={() => setShowCart(false)}
        ></button>
        <CartSidebar showCart={showCart} setShowCart={setShowCart} />
      </div>
    </div>
  );
};

export default AdminNavbar;
