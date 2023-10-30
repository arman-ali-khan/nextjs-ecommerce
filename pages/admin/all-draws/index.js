import UserLayout from '@/Layout/UserLayout';
import AllDraws from '@/components/Dashboard/Admin/AllDraws/AllDraws';

const index = () => {
    return (
        <UserLayout title={'All Draws'}>
            <AllDraws />
        </UserLayout>
    );
};

export default index;