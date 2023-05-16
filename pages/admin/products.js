import UserLayout from '@/Layout/UserLayout'; 
import AllProducts from '@/components/Dashboard/Admin/Products/AllProducts';
import React from 'react';

const products = () => {
    return (
       <UserLayout title={'All Products'}>
        <AllProducts />
       </UserLayout>
    );
};

export default products;