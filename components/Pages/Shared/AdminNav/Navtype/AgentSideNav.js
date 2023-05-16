import Link from 'next/link';
import React, { useState } from 'react';
import {BiCategory, BiHomeAlt2, BiMenuAltRight} from 'react-icons/bi'
import {TbBread} from 'react-icons/tb'
import {GiFruitBowl, GiMedicines} from 'react-icons/gi'

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
             <ul className='flex flex-col gap-2'>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex  items-center gap-2' href={'#'}> <BiHomeAlt2 size={25} /> Dashboard</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}><TbBread size={25} />Message</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}><GiFruitBowl size={25} />My Clients</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}> <GiMedicines size={25} />Orders</Link>
            </li>
            <li>
                <Link className='border-teal-600 w-full px-2 py-1 text-teal-600 flex items-center gap-2' href={'#'}> <GiMedicines size={25} />Money Order</Link>
            </li>
           </ul>
           </>
          }
          
        </div>
    );
};

export default AdminSideNav;