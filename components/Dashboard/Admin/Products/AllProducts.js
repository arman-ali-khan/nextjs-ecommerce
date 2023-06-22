import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiPencil, BiTrash } from 'react-icons/bi';

const AllProducts = () => {
          // get context
  const { user } = useAllContext()

  // loading 
  const [loading,setLoading] = useState(true)

  // router get
  const router = useRouter()

  // get token from cookie
const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')

  const [products,setProducts] = useState([])
  // count
  const [productCount,setProductCount] = useState()
  const count = Math.ceil((productCount?.count || 10 )/ 10)
  // pagination
  const [currentPage,setCurrentPage] = useState(0)
  // get orders from mongodb
  useEffect(()=>{
    
    axios.get(`/api/products?page=${currentPage}`)
    .then(res=>{
        setProducts(res.data.allFiles)
        setProductCount(res.data)
        setLoading(false)
          })
  },[loading,currentPage])

  const [productLoading,setProductLoading] = useState(false)

  const handleDeleteProduct = (id)=>{
    axios
      .delete(`/api/product/delete?id=${id}&email=${user.email}`,{
        headers: {
                  authorization: `Bearer ${token}`,
                },
      })
      .then((response) => {
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
                <Link className='px-4 py-2 inline-block bg-teal-100 text-teal-600 rounded hover:bg-teal-200 hover:underline' href={'/admin/stocks'}>Stocks Product</Link>
<table className="table w-full">
 {/* head */}
 <thead>
   <tr>
     <th>Id</th>
     <th>Title</th>
     <th>Original Price</th>
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
       <td>{product.originalPrice} </td>
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
{
    [...Array(count).keys()].map((product,i)=> <button onClick={()=>setCurrentPage(i)} key={i} className={`bg-teal-600 px-4 py-2 btn border-none text-white hover:bg-teal-700 duration-300 ${currentPage===i &&'bg-teal-700'}`}>{i+1}</button>)
  }
</div>
    );
};

export default AllProducts;