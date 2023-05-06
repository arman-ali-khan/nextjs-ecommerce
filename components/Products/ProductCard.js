import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import {MdOutlineAdd} from 'react-icons/md'

const ProductCard = ({product}) => {
    return (
        <div className={`shadow-xl rounded-md ${product.image || 'bg-teal-100 animate-pulse h-44'}`}>
            <div className={` h-64 bg-base-100 ${product.image || 'bg-teal-200 animate-pulse h-32'}`}>
                <img src={product.image} alt="" />
            </div>

            <div className={`flex items-center justify-between px-3 ${product.image || 'hidden'}`}>
                <div>
                <div className='flex justify-between items-center tooltip' data-tip={`Original Price ${product.price}৳ Discount Price ${product.price - 100}৳`}>
                <h4 className='text-teal-600 font-bold'>৳{product.price} <span className='text-gray-500 font-thin line-through'>৳{product.price - 100}</span></h4>
                <div>
                    <span className='flex items-center'>
                        {
                            [...Array(product.rating).keys()].map((rate,i)=><span data-tip={`${product.rating} Star Rating`} className='text-yellow-500 tooltip' key={i}><BsStarFill /></span>)
                        }
                        </span>
                </div>
                </div>
                <p className='text-lg font-bold'>{product.model}</p>
                </div>
               
            </div>
            <div className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600 ${product.image || 'hidden'}`}>
                    <button>Add To Cart</button>
                    <span className=' px-4 py-2'><MdOutlineAdd size={20} /></span>
                </div>
        </div>
    );
};

export default ProductCard;