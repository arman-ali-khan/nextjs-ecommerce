import Link from "next/link";
import React, { useState } from "react";

const HeroCategories = () => {
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
      title: "Fish & Vegetable",
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
    {
      id: 5,
      title: "Fish & Meat",
      label: "fish-and-meat",
      icon: "https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=48&q=75",
    },
  ];
  return (
    <div className="md:w-full lg:w-full md:ml-12 relative ">
     
      <div
        className={` bg-teal-50 rounded my-3 md:my-0 w-full gap-1 `}
      >
        <ul className="grid grid-cols-3 gap-1 md:grid-cols-none">
          {categories.map((category) => (
            <Link className="border border_primary md:border-none flex items-center rounded" key={category.id} href={`/category/${category.label}`}>
              <li className="md:px-4 w-full py-2 rounded bg-white">
                <span className="flex flex-col md:flex-row items-center hover:underline hover:text_primary md:gap-3">
                  <img className="w-8 h-8" src={category.icon} alt="" />

                  <p className="md:font-bold leading-4 md:hidden">{category.title.slice(0,12)}{category.title.length>12 ? "...":""}</p>

                  <p className="md:font-bold leading-4 hidden md:block">{category.title}</p>
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroCategories;
