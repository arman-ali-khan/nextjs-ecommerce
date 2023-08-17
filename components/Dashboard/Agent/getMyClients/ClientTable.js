import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ClientTable = ({client}) => {
    const {user} = useAllContext()
    const [orders,setOrders] =useState([])

    useEffect(() => {
      if(client?.email && user?.email){
        axios.get(`/api/orders/getclientorders?client=${client?.email}&email=${user?.email}`)
        .then(res => {
     setOrders(res.data)
 })
 .catch(err => {
     console.log(err)
 })
      }
    }, [client?.email,user?.email])
    return (
        <tr key={client._id}>
       <th>{client.stock}</th>
       <td>{client?.name}</td>
       <td>  {client?.email}</td>
       <td>  <Link className='text-teal-600 bg-teal-100 px-2 py-1 rounded' href={`/agent/client/orders?email=${client.email}`}>{orders.length} Orders</Link></td>
       <td>  {client?.phone}</td>
       <td>  {client?.balance}</td>
       
     </tr>
    );
};

export default ClientTable;