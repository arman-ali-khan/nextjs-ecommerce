import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ClientTable from './ClientTable';

const GetMyClients = () => {
    const {user} = useAllContext()
    const [clients,setClients] = useState([])

    // loading 
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`/api/getMyClient?email=${user.email}`)
        .then(res=>{
            console.log(res.data)
            setClients(res.data)
            setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            setLoading(false)
        });
    },[])

    const client = loading ?<span className='flex justify-center w-full'>
       <span className='border-2 h-12 w-12 rounded-full border-teal-800 border-dashed animate-spin'></span> 
    </span>
    :
     clients?.map((client,i)=><ClientTable client={client} key={i}/>) 
    return (
        <div>
            <UserLayout title={'Clients'}>
        <div className="overflow-x-auto w-full my-4 mb-12">
<table className="table w-full">
 {/* head */}
 <thead>
   <tr>
     <th>Stock</th>
     <th>Name</th>
     <th>email</th>
     <th>orders</th>
     <th>phone</th>
     <th>balance</th>
   </tr>
 </thead>
 <tbody>
   {/* row 1 */}

   {
     client
   }
 </tbody>
</table>
</div>
         </UserLayout>
        </div>
    );
};

export default GetMyClients;