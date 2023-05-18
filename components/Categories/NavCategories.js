import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { TbCategory } from "react-icons/tb";

const NavCategories = () => {
  const [loading,setLoading] = useState(false)
  const [showCategory, setShowCategory] = useState(false);
  const [categories,setCategories] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get("/api/categories")
    .then((response) =>{
      setCategories(response.data)
      console.log(response.data)
      setLoading(false)
    })
       .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  },[])
  return (
    <div className="md:w-44 lg:w-64  relative">
      <button
        onClick={() => setShowCategory(!showCategory)}
        className={` px-7 border border-teal-600 font-bold w-full flex items-center justify-between py-1 rounded-full duration-300 ${showCategory ? 'bg-teal-600 text-white': ''}`}
      >
        <p className="flex items-center gap-1"><TbCategory /> Categories</p> <span>{showCategory ? <BiUpArrow />:<BiDownArrow />}</span>
      </button>
      <button
        onClick={() => setShowCategory(false)}
        className={`w-screen h-screen fixed left-0 top-0 -z-10 ${
            showCategory || "hidden "
        }`}
      ></button>
      <div
        className={`absolute bg-teal-50 border border-teal-600 rounded w-64 shadow-lg gap-1 ${
            showCategory || "hidden"
        }`}
      >
        {
           loading ? <div className="h-44 w-full flex items-center justify-center">
            <div className="border-4 border-teal-600 rounded-full h-12 w-12 border-dashed animate-spin"></div>
           </div>
           :
            <ul>
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.label}`}>
            <li className="px-4 py-4 rounded border-b bg-white">
              <span className="flex items-center hover:underline hover:text-teal-600 gap-3">
                <img className="w-8 h-8" src={category.icon} alt="" />
                <p className="font-bold">{category.value}</p>
              </span>
            </li>
          </Link>
          ))}
        </ul>
        }
       
      </div>
    </div>
  );
};

export default NavCategories;
