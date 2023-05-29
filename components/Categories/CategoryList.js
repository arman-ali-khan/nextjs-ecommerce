import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CategoryList = ({categories}) => {

    return (
        <ul className="grid grid-cols-3 gap-0 md:grid-cols-none">
        {categories?.map((category,i) => (
           <Link className="border  border-teal-600 md:border-none flex items-center rounded" key={i} href={`/category/${category.value}`}>
            <li className="md:px-4 w-full py-1 border-b rounded-xl bg-white">
              <span className="flex flex-col md:flex-row items-center hover:underline hover:text-teal-600 md:gap-3">
                <img className="w-8 h-8" src={category.icon} alt="" />

                <p className="md:font-bold text-center text-xs leading-3 md:hidden">{category.label}</p>

                <p className="md:font-bold leading-4 hidden md:block">{category.label}</p>
              </span>
            </li>
          </Link>
         
        ))}
      </ul>
    );
};

export default CategoryList;