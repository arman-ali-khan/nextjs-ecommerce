
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import AllDrawCard from './AllDrawCard';

const AllDraws = () => {
   const [currentPage,setCurrentPage] = useState('')

    const [loading,setLoading] = useState(true)
    

    const [products,setProducts] = useState([])


// update after buy
const [update,setUpdate] = useState(false)

    useEffect(() => {
      axios.get(`/api/draw`)
      .then(res=>{
         setProducts(res.data)
          setLoading(false)
      })
     
    }, [loading,update]);





    let content ;
    if(loading) {
      content = [...Array(10).keys()].map((product,i)=> <div key={i}
      className={`shadow-xl h-72 rounded-md bg-gray-300 animate-pulse`}
    >
      <label className="cursor-pointer" >
        <div
          className={`h-56 bg-base-300 animate-pulse`}
        >
        </div>

        <div
          className={`flex items-center justify-between px-3 `}
        >
          <div>
            <div
              className="flex justify-between items-center "
            >
              <h4 className="text-teal-600 font-bold">
                
                <span className="text-gray-500 text-sm font-thin line-through">
                 
                </span>
              </h4>
              <div>
              </div>
            </div>
          </div>
        </div>
      </label>
      <div
        className={`flex cursor-pointer select-none justify-between items-center bg-base-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600 `}
      >
      </div>
      <div>
        </div>
    </div>)
    }
    // if(error){
    //   content = <p className='text-red-600 text-center'>Error While Load Data</p>
    // }

    if(!loading && products?.length===0){
      content = <p className='text-red-600 text-center'>No Data Found</p>
    }

    if(!loading  && products?.length){
      content =   products?.map((product,i)=>  <AllDrawCard setUpdate={setUpdate} update={update} key={i} product={product} />)
    }
    return (
        <section className='container mx-auto my-3 overflow-hidden'>
            {/* Title */}
            <div className='bg-teal-600 w-56 my-4 px-5 py-2 rounded mx-3'>
    <Link className='border-teal-600 px-2 py-1 text-white flex items-center gap-2' href={'/admin/@add-draw'}><BiCategory size={25} />Add New Draw</Link>
    </div>
            {/* Card */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  sm:gap-2'>
           
            { content}
        </div>

        </section>
        
    );
};

export default AllDraws;