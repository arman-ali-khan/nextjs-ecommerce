import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import { BiTrash } from 'react-icons/bi';

const UserOrders = () => {
      // get context
  const { user,dbUser } = useAllContext()

  // get token from cookie
const token = accessToken('accessToken')

  const [orders,setOrders] = useState([])

  console.log(orders)
  // get orders from mongodb
  useEffect(()=>{
    axios.get(`/api/order?email=${user.email}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
            setOrders(res.data)
          })
  },[])
    return (
       <PrivateRoutes>
         <UserLayout title={'Orders'}>
        <div className="overflow-x-auto w-full my-4 mb-12">
<table className="table w-full">
 {/* head */}
 <thead>
   <tr>
     <th>Id</th>
     <th>Order Time</th>
     <th>Status</th>
     <th>Total</th>
     <th>Action</th>
   </tr>
 </thead>
 <tbody>
   {/* row 1 */}
   {
     orders?.map((order,i)=><tr key={i}>
       <th>{i+1}</th>
       <td>{moment(order.date).fromNow()}</td>
       <td>{order?.status}</td>
       <td className='flex items-center font-bold'> <TbCurrencyTaka className='font-bold' size={20}/> {order?.total}</td>
       <td>
        <span className='flex items-center'>
        <Link href={`/order/${order.id}`}><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></Link>
        {/* delete btn */}
        <label htmlFor="my-modal-4" className='bg-rose-100 inline-block text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200'><BiTrash /></label>
        </span>
        </td>
     </tr>)
   }
 </tbody>
</table>
<Modal dbUser={dbUser} />
</div>
         </UserLayout>
       </PrivateRoutes>
    );
};

export default UserOrders;


const Modal =({dbUser})=> {
  return <><input type="checkbox" id="my-modal-4" className="modal-toggle" />
  <label htmlFor="my-modal-4" className="modal cursor-pointer">
    <label className="modal-box relative" htmlFor="">
      <h3 className="text-lg font-bold">You want to cancel your order</h3>
      <p className="py-4">If you realy want to cancel your order please connect your agent {dbUser.agent}</p>
    </label>
  </label>
  </>
}

