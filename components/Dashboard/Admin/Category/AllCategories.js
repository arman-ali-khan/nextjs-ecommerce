import UserLayout from '@/Layout/UserLayout';
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCategory, BiTrash } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';

const AllCategories = () => {

    // get context
  const { user } = useAllContext()

  // get token from cookie
const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')

  const [categories,setCategories] = useState([])

  // get Categories from mongodb
  useEffect(()=>{
    axios.get(`/api/categories`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
            setCategories(res.data)
          })
  },[])

  // delete categories
  const handleDeleteCategories = (id) =>{
    axios.delete(`/api/category/delete?id=${id}&email=${user.email}`)
    .then(res=>{
        toast.success('Category deleted successfully')
    })
  }
    return (
        <PrivateRoutes>
        <UserLayout title={'Categories'}>
       <div className="overflow-x-auto w-full my-4 mb-12">
       <div className='bg-teal-600 w-56 px-5 py-2 rounded mx-3'>
    <Link className='border-teal-600 px-2 py-1 text-white flex items-center gap-2' href={'/admin/@add/new-category'}><BiCategory size={25} />Add Category</Link>
    </div>
<table className="table w-full">
    
{/* head */}
<thead>
  <tr>
    <th>icon</th>
    <th>Label</th>
    <th>Value</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {/* row 1 */}
  {
    categories?.map((category,i)=><tr key={category._id}>
      <td><img src={category.icon} className='w-6 h-6 rounded' alt="" /></td>
      <td>{category.label}</td>
      <td>{category.value}</td>
      
      <td>
       <Link href={`/category/${category.value}`}><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></Link>
       <button onClick={()=>handleDeleteCategories(category.value)} className='bg-rose-100 text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200'><BiTrash /></button>
       </td>
    </tr>)
  }
</tbody>
</table>
</div>
        </UserLayout>
      </PrivateRoutes>
    );
};

export default AllCategories;