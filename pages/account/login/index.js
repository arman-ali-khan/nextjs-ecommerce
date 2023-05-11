import Layout from '@/Layout/Layout';
import { useAllContext } from '@/context/ContextProvider';
import setCookie, { accessCookie } from '@/hooks/setCookie';
import actionTypes from '@/state/ProductState/actionTypes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';

const index = () => {
 
  const router = useRouter()
  const {loginUser,userDispatch,userState } = useAllContext()

  // get params url
  const {n} = router.query
console.log(n)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleLoginUser = (data) =>{
    

    userDispatch({type:actionTypes.GETTING_USER_START})
    const email = data.email
    const password = data.password
    loginUser(email,password)
    .then((userCredential) => {
      // Signed in 
     
      const user = userCredential.user;
      
      userDispatch({type:actionTypes.GETTING_USER_SUCCESS,payload:{user}})
      toast.success('Login success')
      axios.post(`${process.env.NEXT_PUBLIC_API_PRO}/api/jwt`,{user:user.email},{
        headers:{
          'content-type':'application/json'
      },}).then((response) => {
       setCookie(response.data)
      
      }, (error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      })
      if(n){
        router.push(`/search`)
       }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
      userDispatch({type:actionTypes.GETTING_USER_ERROR,payload:{errorMessage}})
    });
  }

    return (
        <Layout title={'Login || Nobin Udyokta'}>
            <div className='my-20 items-center container mx-auto flex justify-center'>
              <form onSubmit={handleSubmit(handleLoginUser)} className='w-96 bg-base-200 rounded-xl px-3 py-6 flex flex-col gap-2'>
                <div>
                    <h2 className='text-2xl uppercase text-teal-600 font-bold'>Login</h2>
                </div>
                <label className='flex flex-col'>
                Email Address
              <input {...register("email", { required: true })} className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="text" />
              </label>
              {errors.email && <span className='text-rose-600'>This field is required</span>}
                <label className='flex flex-col'>
                Password
              <input {...register("password", { required: true })} className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="password" />
              </label>
              {errors.password && <span className='text-rose-600'>This field is required</span>}
              <div className='mx-6'>
                <button className='w-full px-3 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white'>{!userState.loading ? "Login":"Loading..."}</button>
              </div>
             
              <div className='flex flex-col gap-2 mx-6'>
             <p className='text-rose-600'> {
                 userState.errorMessage
              }</p>
                <Link className='text-teal-600 hover:underline font-bold' href={'#'}>Recover Password</Link>
                <Link className='text-teal-600 hover:underline font-bold' href={'/account/register'}>Create New Account</Link>
              </div>
              </form>
            </div>
        </Layout>
    );
};

export default index;