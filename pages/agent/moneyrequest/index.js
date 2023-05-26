import UserLayout from '@/Layout/UserLayout';
import MoneyRequest from '@/components/Dashboard/Agent/MoneyRequest/MoneyRequest';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Money Request'}>
            <MoneyRequest />
        </UserLayout>
    );
};

export default index;