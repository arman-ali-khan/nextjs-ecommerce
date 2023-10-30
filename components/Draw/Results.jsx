import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import loader from "../../public/loader.json";
import ResultCard from "./ResultCard";
const Results = () => {

    // get all result
    const [allResults,setAllResults] = useState([])

    // loading
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
      setLoading(true)
        axios.get(`/api/draw/getResult`)
        .then(res=>{
          setAllResults(res.data)
          setLoading(false)
        })
        .catch(err=>{
          console.error(err);
          setLoading(false)
        })
    },[])
  return (
    <div className="container mx-auto ">
      <div className="px-4 py-2 bg-teal-600 rounded-md font-bold text-white">
        <h2>Draw Results</h2>
      </div>
      {/* Result body */}
     { loading ?<div className="flex items-center justify-center w-full h-screen">
          <div className="w-96 mx-auto">
          <Lottie animationData={loader} loop={true} />
          </div>
        </div>
        :
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full my-2 sm:gap-2 gap-1">
        {  allResults.length ?
            allResults.map((result,i)=><ResultCard result={result} key={i} />)
            :
            'Loading...'
        }
      </div>
        }
    </div>
  );
};

export default Results;
