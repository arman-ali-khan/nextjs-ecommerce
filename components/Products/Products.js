import React from 'react';
import ProductCard from './ProductCard';

const Products = () => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
            {
                [...Array(6).keys()].map((items,i)=><ProductCard key={i} items={items} />)
            }
        </div>
    );
};

export default Products;