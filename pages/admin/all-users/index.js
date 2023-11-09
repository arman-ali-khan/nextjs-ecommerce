import UserLayout from '@/Layout/UserLayout';
import AllUsers from '@/components/Dashboard/Admin/AllUsers/AllUsers';

const index = () => {
    return (
        <UserLayout title={'All Users'}>
            <AllUsers />
        </UserLayout>
    );
};

export default index;