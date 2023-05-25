import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {BiCategory, BiHomeAlt2, BiMenuAltRight} from 'react-icons/bi'
import {TbBread} from 'react-icons/tb'
import {GiFruitBowl, GiMedicines} from 'react-icons/gi'
import CategoryList from '../Categories/CategoryList';
import axios from 'axios';
import { useAllContext } from '@/context/ContextProvider';
import CategoryListMobile from '../Categories/CategoryListMobile';

const CategorirsSidebar = () => {
    const [showMenu,setShowMenu] = useState(false)

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
        <div className='h-full bg-white border-r overflow-y-auto pt-12 pb-28'>
            <div className='grid grid-cols-2 bg-white top-0 absolute w-full '>
                <button onClick={()=>setShowMenu(false)} className={`py-2  border-teal-600 border-b border-r ${showMenu || 'bg-teal-600 text-white'} flex items-center gap-2 px-2`}> <span><BiCategory size={20} /></span> Categories</button>
                <button onClick={()=>setShowMenu(true)} className={`py-2 border-teal-600 border-b ${showMenu && 'bg-teal-600 text-white'} flex items-center gap-2 px-2`}><span><BiMenuAltRight size={20} /></span> Menu</button>
            </div>
           
          {
            showMenu ? 
            <>
             {/* Menu */}
           <ul>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
           </ul>
           </>
            :
           <div>
             {/* Categories */}
             <CategoryListMobile categories={categories} />
           </div>
          }
          
        </div>
    );
};

export default CategorirsSidebar;