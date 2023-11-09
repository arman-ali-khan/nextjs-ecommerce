import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { TbCategory } from "react-icons/tb";
import CategoryList from "./CategoryList";

const NavCategories = () => {
  const [loading,setLoading] = useState(false)
  const {showCategory,setShowCategory}  = useAllContext()
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
        className={`absolute bg-base-200 border border-teal-600 rounded-xl w-64 shadow-lg gap-1 ${
            showCategory || "hidden"
        }`}
      >
        {
           loading ? <div className="h-44 w-full flex items-center justify-center">
            <div className="border-4 border-teal-600 rounded-full h-12 w-12 border-dashed animate-spin"></div>
           </div>
           :
           <CategoryList categories={categories} />
        }
      
      </div>
    </div>
  );
};

export default NavCategories;
