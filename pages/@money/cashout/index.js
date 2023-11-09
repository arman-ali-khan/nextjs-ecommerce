import UserLayout from '@/Layout/UserLayout';
import CashOut from '@/components/Dashboard/Money/CashOut/CashOut';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Cashout'}>
            <CashOut />
        </UserLayout>
    );
};

export default index;