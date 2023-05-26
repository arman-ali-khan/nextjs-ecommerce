import Link from 'next/link';
import React, { useState } from 'react';
import {BiCategory, BiHomeAlt2, BiMenuAltRight} from 'react-icons/bi'
import {TbBread, TbCurrencyTaka, TbMessageDots, TbReportMoney, TbShoppingCartPlus, TbUsers} from 'react-icons/tb'
import {GiFruitBowl, GiMedicines} from 'react-icons/gi'
import {FiShoppingCart, FiUsers} from 'react-icons/fi'
import { MdOutlineDashboard, MdSupportAgent } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { CiPercent } from 'react-icons/ci';

const AdminSideNav = () => {
    const [showMenu,setShowMenu] = useState(false)
   
    return (
        <div className='h-full bg-white border-r overflow-x-hidden overflow-y-auto pt-12 pb-28'>
            <div className='grid absolute top-0 w-full md:hidden grid-cols-2 bg-white'>
                <button onClick={()=>setShowMenu(false)} className={`py-2  border-teal-600 w-full border-b border-r ${showMenu || 'bg-teal-600 text-white'} flex items-center gap-2 px-2`}> <span><BiCategory size={20} /></span> Admin</button>
                <button onClick={()=>setShowMenu(true)} className={`py-2 border-teal-600 md:hidden border-b ${showMenu && 'bg-teal-600 text-white'} flex items-center gap-2 px-2`}><span><BiMenuAltRight size={20} /></span> Menu</button>
            </div>
           
          {
            showMenu ? 
            <>
             {/* Menu */}
           <ul className='md:hidden'>
            <li>
                <Link className='border-teal-600 w-full px-2 py-4 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-4 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-4 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-4 border-b flex items-center gap-2' href={'#'}>Menu</Link>
            </li>
           </ul>
           </>
            :
           <>
             {/* Categories */}
             <ul className='flex flex-col gap-2  w-64 '>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex  items-center gap-2' href={'/user'}> <MdOutlineDashboard size={25} /> Dashboard</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/admin/products'}><FiShoppingCart size={25} />Products</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/admin/categories'}><BiCategory size={25} />Categories</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}><MdSupportAgent size={25} />Agents</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/agent/getmyclient'}><TbUsers size={25} />Clients</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}><TbMessageDots size={25} />Message</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}><FiUsers size={25} />Users</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/user/orders'}> <BsCartCheck size={25} />Orders</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}> <CiPercent size={25} />Revenue</Link>
            </li>
            <li>
            <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/user/moneyorder'}> <TbReportMoney size={25} />Money Orders</Link>
            </li>
           </ul>
           </>
          }
          
        </div>
    );
};

export default AdminSideNav;