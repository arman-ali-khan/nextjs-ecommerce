import Layout from '@/Layout/Layout';
import ProductCard from '@/components/Products/ProductCard';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiTrendingUp } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

const index = () => {
    // context provider
    const {search} = useAllContext()
    // search data
    const [searchData,setSearchData] = useState([])

    // fetch search data 
    useEffect(()=>{
       if(search){
        axios.get(`/api/search/q?title=${search}`)
        .then(res=>setSearchData(res.data))
       }
    },[search])

    return (
        <Layout title={`Search results of ${search}`}>
             <div className='flex my-12 items-center justify-between px-3 md:px-0'>
                <h2 className='md:text-2xl px-4 py-2 md:uppercase text-teal-600 flex items-center gap-2 border-b border-teal-600'> <span><BiTrendingUp /></span> Search results of {search}</h2>
                <Link href={'#'} className='md:text-2xl md:uppercase text-teal-600 hover:bg-teal-600 hover:text-white duration-300 rounded border-b border-teal-600 px-4 py-2 flex items-center gap-2'>See More <span><BsArrowRight /></span> </Link>
            </div>
            {/* Card */}
            <div className='grid grid-cols-2 my-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 overflow-hidden'>
           
            {
                searchData.map((product,i)=><ProductCard key={i} product={product} />)
            }
        </div>
         
        </Layout>
    );
};

export default index;