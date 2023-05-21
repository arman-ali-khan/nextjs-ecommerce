import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCheckCircle, BiTrash } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';

const ClientOrders = () => {
    const {user} = useAllContext()
    // get all users orders
    const [clientsOrders,setClientsOrders] = useState([])

    // get email from query string
    const router = useRouter()
    const {email} = router.query

    // delete update orders
    const [updateOrders,setUpdateOrders] = useState(false)

    useEffect(()=>{
        axios.get(`/api/agent/client/orders?client=${email}`)
        .then(res=>{
            console.log(res.data)
            setClientsOrders(res.data)
        })
        .catch(err=>{
            console.log(err)
        });
    },[email,updateOrders])

    // delete order
    const handleDeleteOrder= (id)=>{
       axios.delete(`/api/order/delete?id=${id}&email=${user.email}`)
       .then(res=>{
        console.log(res.data)
        toast.success('Order deleted successfully')
        setUpdateOrders(!updateOrders)
       })
             .catch(err=>{
        console.log(err)
        toast.error(err.message)
       })
    }

    // status
    const [status,setStatus] = useState('')

    // update order status
    const handleUpdateOrderStatus = (id)=>{
        axios.patch(`/api/order/update?id=${id}`,{status})
        .then((response)=>{
            console.log(response.data)
            toast.success('Order status updated successfully')
            setUpdateOrders(!updateOrders)
        })
               .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
    }

    return (
        <div>
            <div>
            <UserLayout title={'Clients'}>
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
     clientsOrders?.map((order,i)=><tr key={order._id}>
       <th>{i+1}</th>
       <td>{moment(order.date).fromNow()}</td>
       <td  className={`${order.status==='Delivered' ? 'bg-teal-200':''}`}>
        {/* Update order status */}
       <span  className='flex items-center gap-3'>
       <select defaultValue={order.status} onChange={(e)=>setStatus(e.target.value)}  className='select select-bordered select-sm'>
            <option value="Processing" key="1">Processing</option>
            <option value="Packaging" key="1">Packaging</option>
            <option value="Out for delivery" key="1">Out for delivery</option>
            <option value="Delivered" key="1">Delivered</option>
        </select>
        <button className='text-success text-3xl ' onClick={()=>handleUpdateOrderStatus(order.id)}><BiCheckCircle /></button>
       </span>
       </td>
       <td className=' items-center font-bold'> 
       <span className='flex items-center'><TbCurrencyTaka className='font-bold' size={20}/> {order?.total.toFixed(2)}</span>
       </td>
       <td>
        <Link href={`/order/${order.id}`}><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></Link>
        <button onClick={()=>handleDeleteOrder(order.id)} className='bg-rose-100 text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200'><BiTrash /></button>
        </td>
     </tr>)
   }
   
 </tbody>
</table>
</div>
         </UserLayout>
        </div>
        </div>
    );
};

export default ClientOrders;