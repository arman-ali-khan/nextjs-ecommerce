import Layout from "@/Layout/Layout";
import Draws from "@/components/Draw/Draws";

const index = () => {
    return (
        <Layout title={`Raffle Draw`}>
            <Draws />
        </Layout>
    );
};

export default index;