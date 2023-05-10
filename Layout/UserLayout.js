import Layout from "@/Layout/Layout";
import AdminNavbar from "@/components/Pages/Shared/AdminNav/AdminNavbar";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import { useAllContext } from "@/context/ContextProvider";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BsPercent } from "react-icons/bs";
import { MdCoPresent, MdOutlineSpaceDashboard } from "react-icons/md";
import { RiParenthesesLine } from "react-icons/ri";
import { TbCurrencyTaka, TbGardenCart } from "react-icons/tb";
function UserLayout({children,title,description,thumb}) {

  const {user,dbUser,loading} = useAllContext()

  const [showMony, setShowMoney] = useState(false);
  const [moneyClass, setMoneyClass] = useState("");
  const [moneyLoading, setMoneyLoading] = useState(false);

  const handleMoneyShow = () =>{
    // money show loading
      setMoneyLoading(true);
    const timer = setTimeout(() => {
        setMoneyClass("!-left-64");
      }, 5000);
      return () => {
          clearTimeout(timer)
          setMoneyLoading(false);
      };
  }

  return (
    <PrivateRoutes>
       <AdminNavbar />
       <Head>
        <title>{title || `Profile of ${dbUser.name}`}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:image"
          content={thumb}
        />
      </Head>
      <div className="container mx-auto mt-12 py-3 relative">
        <div className=" md:-bottom-20 -bottom-8 relative">
        <div className="w-full mb-20  absolute -z-10 md:h-64 h-44 flex-shrink-0 my-5  bg-teal-500 rounded-lg  shadow-lg flex justify-center">
        
        </div>
        {
          user?.uid ? 
          <img
              className="md:w-44  flex justify-center mx-auto w-20  object-cover h-[11rem] rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src={dbUser?.photo}
              alt=""
            />
            :
            <img
              className="md:w-44  flex justify-center mx-auto w-20  object-cover h-[11rem] rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src="http://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
              alt=""
            />
        }
            <div className="w-64 mx-auto text-center bg-teal-100   overflow-hidden relative  px-6 rounded-md my-3 py-4">
              <h2 className="text-xl md:text-2xl font-bold">{dbUser?.name}</h2>
              <p>{dbUser?.phone}</p>
              <p>{dbUser?.email}</p>
              <div className={`mx-auto flex justify-center relative`}>
                <p
                  onClickCapture={() => setMoneyLoading(false)}
                  onClick={() => setMoneyClass("")}
                >
                  Your balence is ${dbUser?.balence}
                </p>
                <button
                  onClickCapture={() => setMoneyLoading(true)}
                  onClick={handleMoneyShow}
                  className={`absolute text-white bg-teal-600 h-6 rounded-full top-0 duration-300 w-full  ${moneyClass==='' ?'left-0':'-left-96'}`}
                >
                  {moneyLoading ? (
                    <span className="h-3 px-3  rounded-full border border-teal-600 animate-pulse bg-teal-600 border-dashed">Money Loading...</span>
                  ) : (
                    "See your money"
                  )}
                </button>
              </div>
            </div>
          </div>
        <div className="grid grid-cols-2 md:grid-cols-4 my-[4rem]  gap-2">
          <div>
            <div className="flex items-center py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
               <BsPercent />
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  ${dbUser?.stock}
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Stocks
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
               <BsPercent />
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  {dbUser?.order || 0}
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Orders
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
               <BsPercent />
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  ${dbUser?.revenue}
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
               <BsPercent />
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  $9745
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
           <h2 className="text-2xl"> User Dashboard</h2>
        </div>
        <div className="md:flex gap-3 ">
        <div className="md:w-44 w-full">
        <ul>
            <Link href={'/user'}>
            <li className="py-3 px-2 border-b hover:text-teal-600 duration-300 flex items-center gap-2">
            <MdOutlineSpaceDashboard size={20} />
                Dashboard
                </li>
            </Link>
            <Link href={'/user/orders'}>
            <li className="py-3 px-2 border-b hover:text-teal-600 duration-300  flex items-center gap-2">
            <TbGardenCart size={20} />
                My Orders
                </li>
            </Link>
            <Link href={'/user/earns'}>
            <li className="py-3 px-2 border-b hover:text-teal-600 duration-300  flex items-center gap-2">
            <TbCurrencyTaka size={20} />
                My Toal Earn
                </li>
            </Link>
            <Link href={'/user/stocks'}>
            <li className="py-3 px-2 border-b hover:text-teal-600 duration-300  flex items-center gap-2">
            <AiOutlineStock size={20} />
                My Stocks
                </li>
            </Link>
            
            
            
        </ul>
        </div>
        <div className="w-full">
            {children}
        </div>
      </div>
      </div>
     
    </PrivateRoutes>
  );
}
export default UserLayout;
