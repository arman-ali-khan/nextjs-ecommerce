import UserLayout from '@/Layout/UserLayout';
import AllMoneyRequest from '@/components/Dashboard/Admin/AllMoneyRequest/AllMoneyRequest';
import AllUsers from '@/components/Dashboard/Admin/AllUsers/AllUsers';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'All Users'}>
            <AllUsers />
        </UserLayout>
    );
};

export default index;