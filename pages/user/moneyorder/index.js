import UserLayout from '@/Layout/UserLayout';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';
import MoneyOrder from '@/components/User/MoneyOrder/MoneyOrder';
import React from 'react';

const index = () => {
    return (
       <PrivateRoutes>
         <UserLayout title={'Money Orders'}>
            <MoneyOrder />
        </UserLayout>
       </PrivateRoutes>
    );
};

export default index;