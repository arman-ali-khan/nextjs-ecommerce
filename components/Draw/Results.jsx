import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ResultCard from "./ResultCard";
const Results = () => {

    // get all result
    const [allResults,setAllResults] = useState([])

    // loading
    const [loading,setLoading] = useState(false)

    const router = useRouter()
    // get params
    const drawId = router.query.resutlId

    // draw result api call
    useEffect(()=>{
       if(drawId){
        axios.get(`/api/draw/getResult?drawId=${drawId}`)
        .then(res=>{
          setAllResults(res.data)
            toast.success(res.data.message)
            setLoadingI(false)
          console.log(res.data)
        })
       }
    },[drawId])
  return (
    <div className="container mx-auto ">
      <div className="px-4 py-2 bg-teal-600 rounded-md font-bold text-white">
        <h2>Draw Results</h2>
      </div>
      {/* Result body */}
     { loading ?<div className="flex items-center justify-center w-full h-screen">
          <div className="w-96 mx-auto">
          {/* <Lottie animationData={loader} loop={true} /> */}
          </div>
        </div>
        :
      <div className="w-full sm:m-12">
        {  allResults?.length ?
            allResults?.map((result,i)=><ResultCard result={result} key={i} />)
            :
            'No data'
        }
      </div>
        }
    </div>
  );
};

export default Results;
