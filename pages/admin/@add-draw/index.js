import UserLayout from '@/Layout/UserLayout';
import CreateDraw from '@/components/Dashboard/Admin/CreateDraw/Draw';

const index = () => {
    return (
        <UserLayout title={'Raffel Draw'}>
            <CreateDraw />
        </UserLayout>
    );
};

export default index;