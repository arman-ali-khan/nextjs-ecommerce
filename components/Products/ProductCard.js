import React from 'react';
import {MdOutlineAdd} from 'react-icons/md'
const ProductCard = ({items}) => {
    return (
        <div className='shadow-xl rounded-md'>
            <div>
                <img src="https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FYfJTLV4%2FNeem-Original-honey-Turmeric-Soap-75g.jpg&w=256&q=75" alt="" />
            </div>

            <div className='flex items-center justify-between px-3'>
                <div>
                <h4 className='text_primary font-bold'>$79.24 <span className='text-gray-500 font-thin line-through'>$60</span></h4>
                <p className='text-lg font-bold'>Nivea Soap</p>
                </div>
               
            </div>
            <div className='flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600 text-black  pl-4 hover:bg_primary rounded hover:text-white'>
                    <button>Add</button>
                    <span className=' px-4 py-2'><MdOutlineAdd size={20} /></span>
                </div>
        </div>
    );
};

export default ProductCard;