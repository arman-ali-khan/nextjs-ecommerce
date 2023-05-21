import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiDownArrow, BiLocationPlus, BiUpArrow } from "react-icons/bi";
import { TbCategory } from "react-icons/tb";

const Location = () => {
  const [showCategory, setShowCategory] = useState(false);
  const categories = [
    {
      id: 1,
      title: "Muraripur",
      label: "muraripur",
    },
    {
      id: 2,
      title: "Mokrompur",
      label: "mokrompur",
    },
    {
      id: 3,
      title: "Jadobpur",
      label: "jadobpur",
    },
    {
      id: 4,
      title: "Mohodipur",
      label: "mohodipur",
    },
    {
      id: 5,
      title: "Gopalpur",
      label: "Gopalpur",
    },
  ];

  const handleLocation = (data)=>{
    localStorage.setItem("location",JSON.stringify(data));
  }




  return (
    <div className=" relative">
      <button
        onClick={() => setShowCategory(!showCategory)}
        className={` px-3 border border-white md:border-teal-600 font-bold flex items-center justify-between py-1 rounded-full duration-300 ${showCategory ? 'bg-teal-600 text-white': ' text-white md:text-black '}`}
      >
        {/* <p className="flex items-center gap-1"><BiLocationPlus /> {location?.title}</p> <span></span> */}
      </button>
      <button
        onClick={() => setShowCategory(false)}
        className={`w-screen h-screen fixed left-0 top-0 -z-10 ${
            showCategory || "hidden "
        }`}
      ></button>
      <div
        className={`absolute -left-20 bg-teal-50 border border-teal-600 rounded w-56 shadow-lg gap-1 ${
            showCategory || "hidden"
        }`}
      >
        <ul>
          {categories.map((category,i) => (
            <button onClick={()=>handleLocation(category)} key={i} className="w-full" >
              <li className="px-4 py-2 rounded border-b bg-white">
                <span className="flex items-center hover:underline hover:text-teal-600 gap-3">
                  <p className="font-bold">{category.title}</p>
                </span>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Location;
