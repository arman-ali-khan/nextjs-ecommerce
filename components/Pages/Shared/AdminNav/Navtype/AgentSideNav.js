import Link from 'next/link';
import React, { useState } from 'react';
import {BiCategory, BiHomeAlt2, BiMenuAltRight} from 'react-icons/bi'
import {TbBread, TbReportMoney, TbUsers} from 'react-icons/tb'
import {GiFruitBowl, GiMedicines} from 'react-icons/gi'
import { BsCartCheck } from 'react-icons/bs';
import { CiPercent } from 'react-icons/ci';
import { MdOutlineRequestPage } from 'react-icons/md';

const AdminSideNav = () => {
    const [showMenu,setShowMenu] = useState(false)
   
    return (
        <div className='h-full bg-white border-r'>
            <div className='grid md:hidden grid-cols-2 bg-white'>
                <button onClick={()=>setShowMenu(false)} className={`py-2  border-teal-600 w-full border-b border-r ${showMenu || 'bg-teal-600 text-white'} flex items-center gap-2 px-2`}> <span><BiCategory size={20} /></span> Agent</button>
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
             <ul className='flex flex-col gap-2 w-64'>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex  items-center gap-2' href={'/user'}> <BiHomeAlt2 size={25} /> Dashboard</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/agent/getmyclient'}><TbUsers size={25} />My Clients</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/user/orders'}><BsCartCheck size={25} />My Orders</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}> <CiPercent size={25} />My Revenue</Link>
            </li>
            <li>
            <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/user/moneyorder'}> <TbReportMoney size={25} />Money Orders</Link>
            </li>
            <li>
            <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'/agent/moneyrequest'}> <MdOutlineRequestPage size={25} />Money Request</Link>
            </li>
           </ul>
           </>
          }
          
        </div>
    );
};

export default AdminSideNav;