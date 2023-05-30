import Layout from '@/Layout/Layout';
import Stocks from '@/components/Stock/Stocks';
import React from 'react';

const index = () => {
    return (
        <Layout title={'Stocks'}>
            <Stocks />
        </Layout>
    );
};

export default index;