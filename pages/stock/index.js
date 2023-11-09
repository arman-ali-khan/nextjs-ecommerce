import Layout from '@/Layout/Layout';
import Stock from '@/components/Pages/Stock/Stock';
import { useAllContext } from '@/context/ContextProvider';
import React from 'react';

const index = () => {
    

    return (
        <Layout title={'Checkout your order'}>
           <Stock />
        </Layout>
    );
};

export default index;