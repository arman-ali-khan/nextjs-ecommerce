import UserLayout from '@/Layout/UserLayout';
import Profile from '@/components/Pages/Home/Profile/Profile';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';

const user = () => {
    return (<UserLayout title={'User'}>
        <PrivateRoutes>
            <Profile />
        </PrivateRoutes>
    </ UserLayout>);
};

export default user;