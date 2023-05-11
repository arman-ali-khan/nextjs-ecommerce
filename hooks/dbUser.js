import axios from 'axios';
import React, { useState } from 'react';
import { accessCookie } from './setCookie';
import { useAllContext } from '@/context/ContextProvider';
import { toast } from 'react-hot-toast';


const dbUser = (email) => {
  
    const token =  accessCookie('accessToken')


    const [dbUser,setDbUser] = useState({})
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/getUser/${email}`,{
        headers: {authorization: `Bearer ${token}`}
      })
    .then(res=>setDbUser(res.data))
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
       toast.error('Access Token is invalid')
      };
    });
    return dbUser
};

export default dbUser; 