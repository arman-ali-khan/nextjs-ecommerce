import Slider from '@/components/Dashboard/Admin/Slider/Slider';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';

const index = () => {
    return (
        <PrivateRoutes>
            <Slider />
        </PrivateRoutes>
    );
};

export default index;