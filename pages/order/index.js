import Layout from '@/Layout/Layout';
import Order from '@/components/Pages/Order/Order';
import { useAllContext } from '@/context/ContextProvider';
import React from 'react';

const index = () => {
    

    return (
        <Layout title={'Checkout your order'}>
           <Order />
        </Layout>
    );
};

export default index;