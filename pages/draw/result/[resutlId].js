import Layout from "@/Layout/Layout";
import Results from "@/components/Draw/Results";

const resutlId = () => {
   
    return (
        <Layout title={'Draw Results'}>
            <div className="my-16">
            <Results />
            </div>
        </Layout>
    );
};

export default resutlId;