import NavCategories from "@/components/Categories/NavCategories";
import CartSidebar from "@/components/Sidebars/CartSidebar";
import UserSidebar from "@/components/Sidebars/UserSidebar";
import { useAllContext } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineHome, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BsCart, BsSearch } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import Notifications from "../Notifications/Notifications";
import AdminSideNav from "./Navtype/AdminSideNav";
import AgentSideNav from "./Navtype/AgentSideNav";
import UserSideNav from "./Navtype/UserSideNav";

const AdminNavbar = () => {
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // context
  const { user, logOut, state ,setSearch,dbUser} = useAllContext();
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

const handleLogout = () =>{
  logOut()
}

const orderPath = router.pathname


  // all product price
  let price = state.cart.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);


    // search 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

 

 const handleSearch  = (data) =>{
   setSearch(data?.search)
   router.push('/search')

 }
  return (
    <div className="md:fixed z-50 w-full flex justify-center md:top-0 md:bottom-auto">
    

      <div className="fixed md:sticky md:top-0 md:bottom-auto bottom-2 w-full md:flex items-center justify-between md:mx-auto z-50 md:container border-2 border-teal-600 bg-white md:px-6 py-1 rounded-full">
        {/* Navbar start */}
        <div className="fixed md:hidden lg:flex md:static py-1 w-full bg-teal-600 md:bg-transparent md:w-auto left-0 flex !z-50 justify-between px-4 items-center md:justify-start top-0 rounded-full">
          {/* Logo */}
          <Link href={"/"}>
            <img className="w-9 md:w-16" src={"/logo.svg"} alt="" />
          </Link>
          {/*Notification mobile  */}
          <div className="md:hidden">
          <Notifications />
          </div>
        </div>
        {/* Desktop fixed categories */}
        <div className="hidden md:flex items-center gap-4">
          <NavCategories />
          {/*Notification desktop  */}
          <div className="hidden md:block">
            
            <Notifications />
             </div>
        </div>
        {/* Search box */}
        <div className=" w-full flex justify-center">
          {showSearch ? (
            <form onSubmit={handleSubmit(handleSearch)} className="flex !z-[999999999] fixed md:static top-1 left-0 w-full items-center md:w-64 lg:w-72 xl:w-96">
              <input
                {...register("search", { required: true })}
                placeholder="Search for products (e.g. fish, apple, oil)"
                className="px-6 w-full py-2 border border-teal-600 rounded-l-full text-teal-700 focus-within:outline-none focus-within:border-teal-700 focus-within:bg-teal-50 "
                type="search"
              />
              <button  onClick={()=>handleSearch()} className="border-4 text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed border-teal-600 md:px-3 px-5 bg-teal-600 py-2 rounded-r-full cursor-pointer hover:bg-teal-700">
                <BsSearch size={20} />
              </button>
            </form>
          ) : (
            <ul className=" items-center hidden md:flex py-2">
              {/* Desktop nav link area */}
              <li>
                <Link
                  className={`px-3 py-2 md:px-2 lg:px-3 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 md:px-2 lg:px-3 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/@stock"}
                >
                  Stock
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 md:px-2 lg:px-3 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/draw"}
                >
                  Draw
                </Link>
              </li>
              <li>
                <Link
                  className={`px-3 py-2 md:px-2 lg:px-3 hover:text-teal-600 duration-300 rounded hover:bg-opacity-60`}
                  href={"/user"}
                >
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* Mobile bottom navbar */}
        <div className="flex justify-between md:justify-normal z_index !z-50 w-full md:w-auto items-center ">
          <span
            className={`text-2xl cursor-pointer flex justify-center py-2 w-full md:hidden hover:text-teal-600`}
            onClick={handleCategoriesSidebar}
          >
            <RiMenu4Line />
          </span>
          <span
            className={`text-2xl cursor-pointer md:px-4 w-full flex justify-center hover:text-teal-600 ${
              showSearch && "text-teal-600"
            } px-1 py-2`}
            onClick={() => setShowSearch(!showSearch)}
          >
            <BsSearch />
          </span>
          <Link
            className={`md:hidden cursor-pointer flex py-2 justify-center w-full text-2xl md hover:text-teal-600`} href={'/'}><span
            text-2xl
          >
            <AiOutlineHome />
          </span></Link>
          <span
            className={`text-2xl relative cursor-pointer h-full w-full hover:text-teal-600 ${
              showCart && "text-teal-600"
            } flex justify-center py-2`}
            onClick={handleCartSidebar}
          >
            <BsCart />
            <span
              className={`absolute top-0 right-0  w-full flex justify-center text-sm py-1 rounded-full ${
                state.cart.length === 0 ? "" : " bg-rose-100"
              } text-rose-600`}
            >
              {state.cart.length === 0 ? "" : state.cart.length}
            </span>
          </span>
          {user?.uid ? (
            <div className="dropdown py-0 flex dropdown-top md:dropdown-bottom dropdown-left">
              <label
                className={`text-2xl cursor-pointer hover:text-teal-600 ${
                  showUser && "text-teal-600"
                } px-4 py-2`}
                tabIndex={0}
              >
                <AiOutlineUser />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
               <Link
                  href={"/user"}
                  className={`font-bold cursor-pointer hover:text-teal-600 ${
                    showUser && "text-teal-600"
                  } px-4 py-2`}
                >
                  {user.displayName} ( {dbUser.balance})
                </Link>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href={"/account/login"}
              className={`text-2xl cursor-pointer hover:text-teal-600 ${
                showUser && "text-teal-600"
              } px-4 py-2`}
            >
              <AiOutlineUserAdd />
            </Link>
          )}
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
        {/*  Sidenav */}
        {
          dbUser.type === "admin" && <AdminSideNav />
        }
        {
          dbUser.type === "agent" && <AgentSideNav />
        }
        {
          dbUser.type === "user" && <UserSideNav />
        }
        
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
