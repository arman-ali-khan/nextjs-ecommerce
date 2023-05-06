import Layout from "@/Layout/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BsPercent } from "react-icons/bs";
import { MdCoPresent, MdOutlineSpaceDashboard } from "react-icons/md";
import { RiParenthesesLine } from "react-icons/ri";
import { TbCurrencyTaka, TbGardenCart } from "react-icons/tb";
function UserLayout({children}) {
  const [showMony, setShowMoney] = useState(false);
  const [moneyClass, setMoneyClass] = useState("");
  const [moneyLoading, setMoneyLoading] = useState(false);

  const handleMoneyShow = () =>{
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
    <Layout title={"User"}>
      <div className="container mx-auto mt-12 py-3">
        <div className="w-full -z-20 relative h-44 flex-shrink-0 my-2 overflow-hidden bg-teal-500 rounded-lg  shadow-lg flex justify-center">
        <svg className="absolute top-0 -z-20 left-0 mb-0 opacity-10" viewBox="0 0 375 283" fill="none" >
        <rect x="159.52" y="175" width="200" height="200" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
        <rect y="107.48" width="200" height="200" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
      </svg>
        <div className=" absolute w-full  z-50 h-full top-0 left-0 bg-card" ></div>
          <div className=" md:-bottom-16 -bottom-8">
            <img
              className="md:w-44  z-50 mx-auto w-20 md:h-44 h-20 rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src="http://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
              alt=""
            />
            <div className="w-full relative overflow-hidden bg-base-100  px-6 rounded-md my-3 py-4">
              <h2 className="text-xl md:text-2xl font-bold">Arman Ali Khan</h2>
              <div className={`mx-auto flex justify-center relative`}>
                <p
                  onClickCapture={() => setMoneyLoading(false)}
                  onClick={() => setMoneyClass("")}
                >
                  Your balence is $2345
                </p>
                <button
                  onClickCapture={() => setMoneyLoading(true)}
                  onClick={handleMoneyShow}
                  className={`absolute text-white bg-teal-600 h-6 rounded-full top-0 duration-300 w-full  ${setMoneyClass==='' ?'left-0':'-left-96'}`}
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
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 my-12 md:my-20 gap-2">
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
                  12
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
                  $9745
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
        <div className="md:flex gap-3">
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
     
    </Layout>
  );
}
export default UserLayout;
