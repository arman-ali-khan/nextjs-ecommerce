import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';

const AllProducts = () => {
          // get context
  const { user } = useAllContext()

  // get token from cookie
const token = accessToken('accessToken')

  const [products,setProducts] = useState([])

  console.log(products)
  // get orders from mongodb
  useEffect(()=>{
    axios.get(`/api/products`)
    .then(res=>{
        setProducts(res.data.allFiles)
          })
  },[])

    return (
             <div className="overflow-x-auto text-sm md:text-base w-full md:my-4 mb-12">
                <Link className='px-4 py-2 inline-block bg-teal-100 text-teal-600 rounded hover:bg-teal-200 hover:underline' href={'/admin/@add/new-product'}>Add New Product</Link>
<table className="table w-full">
 {/* head */}
 <thead>
   <tr>
     <th>Id</th>
     <th>Title</th>
     <th>Price</th>
     <th>Stock</th>
     <th>Action</th>
   </tr>
 </thead>
 <tbody>
   {/* row 1 */}
   {
     products?.map((product,i)=><tr key={product._id}>
       <th>{product.id}</th>
       <td className={`${product.stock < 5 && '!bg-rose-100 text-rose-600'}`}>{product.title}</td>
       <td>{product.price}</td>
       <td className='flex items-center font-bold'>  {product?.stock}</td>
       <td className='!py-0'>
        <span className='flex items-center'>
        <Link href={`/product/${product.id}`}><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>View</button></Link>
        <button className='bg-teal-100 text-base text-teal-600 px-2 py-1 rounded-full hover:bg-teal-200'><BiPencil /></button>
        <button className='bg-rose-100 text-base text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200'><BiTrash /></button>
        </span>
        </td>
     </tr>)
   }
 </tbody>
</table>
</div>
    );
};

export default AllProducts;