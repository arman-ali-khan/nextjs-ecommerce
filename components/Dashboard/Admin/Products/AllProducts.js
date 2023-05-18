import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';

const AllProducts = () => {
          // get context
  const { user } = useAllContext()

  // loading 
  const [loading,setLoading] = useState(true)

  // router get
  const router = useRouter()

  // get token from cookie
const token = accessToken('accessToken')

  const [products,setProducts] = useState([])

  console.log(products)
  // get orders from mongodb
  useEffect(()=>{
    
    axios.get(`/api/products`)
    .then(res=>{
        setProducts(res.data.allFiles)
        setLoading(false)
          })
  },[loading])

  const [productLoading,setProductLoading] = useState(false)

  const handleDeleteProduct = (id)=>{
    axios
      .delete(`/api/product/delete?id=${id}&email=${user.email}`,{
        headers: {
                  authorization: `Bearer ${token}`,
                },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Product Deleted successfully");
        setProductLoading(false);
        router.push('/admin/products')
        setLoading(true)
      })
      .catch((err) => {
        setProductLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  }

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
       <td>{product.price} <span className='line-through text-xs'>{product.oldPrice}</span> </td>
       <td className='flex items-center font-bold'>  {product?.stock}</td>
       <td className='!py-0'>
        <span className='flex items-center'>
        <Link href={`/product/${product.id}`}><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>View</button></Link>
       <Link href={`/admin/edit/${product.id}`}>
       <button className='bg-teal-100 text-base text-teal-600 p-3 rounded-full hover:bg-teal-200'><BiPencil /></button>
       </Link>
        <button onClick={()=>handleDeleteProduct(product.id)} className='bg-rose-100 text-base text-rose-600 p-3 rounded-full hover:bg-rose-200'><BiTrash /></button>
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