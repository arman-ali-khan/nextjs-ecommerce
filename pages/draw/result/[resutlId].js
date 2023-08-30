import Layout from "@/Layout/Layout";
import Results from "@/components/Draw/Results";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const resutlId = () => {
    const router = useRouter()
    // get params
    const drawId = router.query.resutlId

    // draw result api call
    useEffect(()=>{
       if(drawId){
        axios.get(`/api/draw/makeDraw?id=${drawId}`)
        .then(res=>{
            console.log(res.data)
            toast.success(res.data.message)
        })
       }
    },[drawId])
    return (
        <Layout title={'Draw Results'}>
            <div className="my-16">
            <Results />
            </div>
        </Layout>
    );
};

export default resutlId;