import UserLayout from '@/Layout/UserLayout';
import SendMoney from '@/components/Dashboard/Money/SendMoney/SendMoney';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'Send money'}>
            <SendMoney />
        </UserLayout>
    );
};

export default index;