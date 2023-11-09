import UserLayout from '@/Layout/UserLayout';
import AllProducts from '@/components/Dashboard/Admin/Products/AllProducts';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';

const products = () => {
    return (
      <PrivateRoutes>
         <UserLayout title={'All Products'}>
        <AllProducts />
       </UserLayout>
      </PrivateRoutes>
    );
};

export default products;