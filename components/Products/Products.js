
import ProductCard from './ProductCard';
import { BiTrendingUp } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import {  useProducts } from '@/context/ProductsProvider';

const Products = () => {
   const {state} = useProducts()
    const products  = state.products;
    return (
        <section className='container mx-auto md:my-12 my-3 overflow-hidden'>
            {/* Title */}
         <div className='flex items-center justify-between px-3 md:px-0'>
                <h2 className='md:text-2xl px-4 py-2 md:uppercase text-teal-600 flex items-center gap-2 border-b border-teal-600'> <span><BiTrendingUp /></span> Popular Products</h2>
                <Link href={'#'} className='md:text-2xl md:uppercase text-teal-600 hover:bg-teal-600 hover:text-white duration-300 rounded border-b border-teal-600 px-4 py-2 flex items-center gap-2'>See More <span><BsArrowRight /></span> </Link>
            </div>
            {/* Card */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
           
            {
            state.loading ? [...Array(products.length).keys()].map((product,i)=><ProductCard key={i} product={product} />)
            :
               products.map((product,i)=><ProductCard key={i} product={product} />)
            }
        </div>
        <div className='flex justify-center my-2'>
        <div className="btn-group">
  <button className="bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 duration-300 rounded-l-md">1</button>
  <button className="bg-teal-800 px-4 py-2 text-white hover:bg-teal-700 duration-300">2</button>
  <button className="bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 duration-300">3</button>
  <button className="bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 duration-300 rounded-r-md">4</button>
</div>
        </div>
        </section>
        
    );
};

export default Products;