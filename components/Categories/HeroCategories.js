import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import { useAllContext } from "@/context/ContextProvider";

const HeroCategories = () => {
  // context
  const {showCategory,setShowCategory}  = useAllContext()
  const [loading,setLoading] = useState(false)
  const [categories,setCategories] = useState([])


  useEffect(() => {
    setLoading(true)
    axios.get("/api/categories")
    .then((response) =>{
      setLoading(false)
      setCategories(response.data)
    })
       .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  },[])

  const category = categories.slice(0,9)

  const seemore =  false
 
  return (
    <div className="md:w-full lg:w-full md:ml-12 relative ">
     
      <div
        className={` bg-teal-50 rounded my-3 md:my-0 w-full gap-1 `}
      >
        {
           loading ? <div className="h-96 w-full flex items-center justify-center">
            <div className="border-4 border-teal-600 rounded-full h-12 w-12 border-dashed animate-spin"></div>
           </div>
           :
           <CategoryList categories={category} seemore={seemore} />
        }
          <Link onClick={()=>setShowCategory(true)} className="px-4 py-2 text-center hover:underline font-bold flex justify-center" href={'#'}>See More</Link>
      </div>
    </div>
  );
};

export default HeroCategories;
