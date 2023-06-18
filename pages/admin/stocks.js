import UserLayout from "@/Layout/UserLayout";
import AllStocks from "@/components/Dashboard/Admin/Products/AllStocks";

const stocks = () => {
    return (
        <UserLayout title={'Stocks'}>
            <AllStocks />
        </UserLayout>
    );
};

export default stocks;