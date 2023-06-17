import Profile from '@/components/Pages/Home/Profile/Profile';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';

const user = () => {
    return (
        <PrivateRoutes>
            <Profile />
        </PrivateRoutes>
    );
};

export default user;