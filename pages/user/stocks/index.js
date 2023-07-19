import UserLayout from '@/Layout/UserLayout';
import MyStocks from '@/components/User/MyStocks/MyStocks';

const index = () => {
    return (
        <div>
           <UserLayout title={'My Stocks'}>
          <MyStocks />
           </UserLayout>
        </div>
    );
};

export default index;