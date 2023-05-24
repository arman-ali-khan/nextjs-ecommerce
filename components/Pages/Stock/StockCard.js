import ProductCard from '@/components/Products/ProductCard';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { MdOutlineAdd } from 'react-icons/md';
import StockProduct from './StockProduct';

const StockCard = ({stock}) => {
    const products = stock.products;

    return (
        <>
        <div className='bg-teal-100 text-teal-600 px-4 py-1 my-4'>
            <p className='text-xl font-bold'>{moment(stock.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
            {
                products.map(product=> <StockProduct product={product} key={product._id}/>)
            }
        </div>
        </>
    );
};

export default StockCard;