import UserLayout from '@/Layout/UserLayout';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';
import GetAllTicket from '@/components/User/GetAllTicket/GetAllTicket';

const index = () => {
    return (
        <UserLayout title={'My Ticket'}>
            <PrivateRoutes>
            <GetAllTicket />
            </PrivateRoutes>
        </UserLayout>
    );
};

export default index;