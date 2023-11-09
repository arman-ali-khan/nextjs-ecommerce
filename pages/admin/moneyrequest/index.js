import UserLayout from '@/Layout/UserLayout';
import AllMoneyRequest from '@/components/Dashboard/Admin/AllMoneyRequest/AllMoneyRequest';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Money Request'}>
            <AllMoneyRequest />
        </UserLayout>
    );
};

export default index;