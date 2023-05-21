import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ClientTable from './ClientTable';

const GetMyClients = () => {
    const {user} = useAllContext()
    const [clients,setClients] = useState([])

    useEffect(()=>{
        axios.get(`/api/getMyClient?email=${user.email}`)
        .then(res=>{
            console.log(res.data)
            setClients(res.data)
        })
        .catch(err=>{
            console.log(err)
        });
    },[])
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
     clients?.map((client,i)=><ClientTable client={client} key={i}/>)
   }
 </tbody>
</table>
</div>
         </UserLayout>
        </div>
    );
};

export default GetMyClients;