import UserLayout from '@/Layout/UserLayout';
import CashIn from '@/components/Dashboard/Money/CashIn/CashIn';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Cashin'}>
            <CashIn />
        </UserLayout>
    );
};

export default index;