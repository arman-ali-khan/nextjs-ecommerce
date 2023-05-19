import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";

const HeroCategories = () => {
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios.get("/api/categories")
    .then((response) =>{
      console.log(response.data)
      setLoading(false)
    })
       .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  },[])
 
  return (
    <div className="md:w-full lg:w-full md:ml-12 relative ">
     
      <div
        className={` bg-teal-50 rounded my-3 md:my-0 w-full gap-1 `}
      >
        {
           loading ? <div className="h-44 w-full flex items-center justify-center">
            <div className="border-4 border-teal-600 rounded-full h-12 w-12 border-dashed animate-spin"></div>
           </div>
           :
           <CategoryList />
        }
      </div>
    </div>
  );
};

export default HeroCategories;
