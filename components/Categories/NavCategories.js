import Link from "next/link";
import React, { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const NavCategories = () => {
  const [showCategory, setShowCategory] = useState(false);
  const categories = [
    {
      id: 1,
      title: "Fish & Meat",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
    {
      id: 2,
      title: "Fruits & Vegetable",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
    {
      id: 3,
      title: "Fish & Meat",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
    {
      id: 4,
      title: "Fish & Meat",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
    {
      id: 5,
      title: "Fish & Meat",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
  ];
  return (
    <div className="md:w-44 lg:w-64 ml-12 relative">
      <button
        onClick={() => setShowCategory(!showCategory)}
        className={` px-7 border border-teal-600 font-bold w-full flex items-center justify-between py-1 rounded-full duration-300 ${showCategory ? 'bg-teal-600 text-white': ''}`}
      >
        <p>Categories</p> <span>{showCategory ? <BiUpArrow />:<BiDownArrow />}</span>
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
        <ul>
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.label}`}>
              <li className="px-4 py-4 rounded border-b bg-white">
                <span className="flex items-center hover:underline hover:text-teal-600 gap-3">
                  <img className="w-8 h-8" src={category.icon} alt="" />
                  <p className="font-bold">{category.title}</p>
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavCategories;
