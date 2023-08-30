import axios from "axios";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";

const Results = () => {

    // get all result
    const [allResults,setAllResults] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/draw/getResult`)
        .then(res=>{
            setAllResults(res.data)
        })
    },[])
  return (
    <div className="container mx-auto ">
      <div className="px-4 py-2 bg-teal-600 rounded-md font-bold text-white">
        <h2>Draw Results</h2>
      </div>
      {/* Result body */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full my-2 sm:gap-2 gap-1">
        { allResults.length ?
            allResults.map((result,i)=><ResultCard result={result} key={i} />)
            :
            'Loading...'
        }
      </div>
    </div>
  );
};

export default Results;
