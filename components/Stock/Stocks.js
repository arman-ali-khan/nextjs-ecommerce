
import { useEffect, useState } from 'react';
import { BiTrendingUp } from 'react-icons/bi';
import StockCard from './StocksCard';

const Stocks = () => {
   const [currentPage,setCurrentPage] = useState('')

    const [loading,setLoading] = useState(true)

    // filter with category
    const [filterCat,setFilterCat] = useState('')
    console.log(filterCat)
    
// all stocks with count 
    const [allProducts,setProducts] = useState({})

    const products = allProducts.stocks;
console.log(products);
    
// get stocks 
    useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/stocks?page=${currentPage}&filter=${filterCat}`);
          const jsonData = await response.json();
          setProducts(jsonData)
          setLoading(false)
        } 
        catch (error) {
          setLoading(false)
        }
      };
  
      fetchData();
    }, [filterCat]);



    const productCount = products
const count = Math.ceil((productCount?.count || 10 )/ 10)


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
      content =   allProducts.stocks?.map((product,i)=>  <StockCard key={i} product={product} />)
    }


    // show All category
    const [showCat,setShowCat] = useState(false)
    return (
        <section className='container mx-auto my-3 overflow-hidden'>
          {/* Stocks category */}
          <div className='my-6'>
            <div>
              <ul className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6'>
                {
                  [...Array(12).keys()].slice(0,showCat?12:6).map((item,i)=>{
                  return  <li key={i} className='w-full flex justify-center '>
                  <button className={`bg-base-200 ${filterCat==='' ?"bg-base-300":''} hover:bg-base-300 w-full rounded py-4 border border-teal-400  items-center gap-2`} onClick={()=>setFilterCat('')}  > <span className='w-full flex justify-center '><img className='rounded-full w-14' src="https://res.cloudinary.com/dcckbmhft/image/upload/v1689330390/nobinImage/c0iq5awgopbluhxoe0lo.webp" alt="" /></span> All</button>
                </li>
                  })
                }
              </ul>
            <div className='flex justify-center w-full'>
                <button className='w-44 py-2 border border-teal-400' onClick={()=>setShowCat(!showCat)}>{showCat?'Show Less':'See More'}</button>
            </div>
            </div>
          </div>
            {/* Title */}
         <div className='flex items-center justify-between px-3 md:px-0'>
                <h2 className='md:text-2xl w-full py-6 md:uppercase text-teal-600 flex items-center gap-2 border-b border-teal-600'> <span><BiTrendingUp /></span> Our Stocks</h2>
            </div>
            {/* Card */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-2'>
           
            { content}
        </div>
        <div className='flex justify-center my-2'>
          
        <div className="btn-group rounded-md">
  {
    [...Array(count).keys()].map((product,i)=> <button  onClick={()=>setCurrentPage(i)} key={i} className={`bg-teal-600 w-full py-6 btn border-none text-white hover:bg-teal-700 duration-300 ${currentPage===i &&'bg-teal-700'}`}>{i+1}</button>)
  }
</div>
        </div>
        </section>
        
    );
};

export default Stocks;