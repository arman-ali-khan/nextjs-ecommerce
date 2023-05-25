
import ProductCard from './ProductCard';
import { BiTrendingUp } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import {  useAllContext, } from '@/context/ContextProvider';

const Products = () => {
   const {state,currentPage, setCurrentPage} = useAllContext()
   const {products:product,loading,error} = state;
    const products  = product.allFiles;
    




    const productCount = product
const count = Math.ceil((productCount?.count || 10 )/ 5)


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
        className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600 `}
      >
      </div>
      <div>
        </div>
    </div>)
    }
    if(error){
      content = <p className='text-red-600 text-center'>Error While Load Data</p>
    }

    if(!loading && !error && products?.length===0){
      content = <p className='text-red-600 text-center'>No Data Found</p>
    }

    if(!loading && !error && products?.length){
      content =   products?.map((product,i)=><ProductCard key={i} product={product} />)
    }
    return (
        <section className='container mx-auto md:my-12 my-3 overflow-hidden'>
            {/* Title */}
         <div className='flex items-center justify-between px-3 md:px-0'>
                <h2 className='md:text-2xl px-4 py-2 md:uppercase text-teal-600 flex items-center gap-2 border-b border-teal-600'> <span><BiTrendingUp /></span> Popular Products</h2>
                <Link href={'#'} className='md:text-2xl md:uppercase text-teal-600 hover:bg-teal-600 hover:text-white duration-300 rounded border-b border-teal-600 px-4 py-2 flex items-center gap-2'>See More <span><BsArrowRight /></span> </Link>
            </div>
            {/* Card */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-2'>
           
            { content}
        </div>
        <div className='flex justify-center my-2'>
          
        <div className="btn-group rounded-md">
  {
    [...Array(count).keys()].map((product,i)=> <button onClick={()=>setCurrentPage(i)} key={i} className={`bg-teal-600 px-4 py-2 btn border-none text-white hover:bg-teal-700 duration-300 ${currentPage===i &&'bg-teal-700'}`}>{i+1}</button>)
  }
</div>
        </div>
        </section>
        
    );
};

export default Products;