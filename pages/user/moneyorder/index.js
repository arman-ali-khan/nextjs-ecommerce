import UserLayout from '@/Layout/UserLayout';
import MoneyOrder from '@/components/User/MoneyOrder/MoneyOrder';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Money Orders'}>
            <MoneyOrder />
        </UserLayout>
    );
};

export default index;