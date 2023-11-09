import UserLayout from '@/Layout/UserLayout';
import AllAgents from '@/components/Dashboard/Admin/AllAgents/AllAgents';
import React from 'react';

const index = () => {
    return (
        <UserLayout title={'All Agents'}>
            <AllAgents />
        </UserLayout>
    );
};

export default index;