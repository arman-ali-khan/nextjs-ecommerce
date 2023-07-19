import UserLayout from "@/Layout/UserLayout";
import AllStocks from "@/components/Dashboard/Admin/Products/AllStocks";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";

const stocks = () => {
    return (
        <UserLayout title={'Stocks'}>
           <PrivateRoutes> <AllStocks /></PrivateRoutes>
        </UserLayout>
    );
};

export default stocks;