import Layout from '@/Layout/Layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { authentication } from '@/firebase/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useProducts } from '@/context/ProductsProvider';
import actionTypes from '@/state/ProductState/actionTypes';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter()
    const [verify,setVerify]  = useState(false)
    const [OTP,setOTP]  = useState('')

    const {userState,userDispatch} = useProducts()
console.log(userState)
    const generateRecaptcha = () =>{
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
         
        }
      }, authentication);
    }



    const handleRegister = (e) =>{
      e.preventDefault()
      userDispatch({type:actionTypes.GETTING_USER_START})
        const phoneNumber = e.target?.phone?.value
        const password = e.target?.password?.value
        const otp = e.target?.otp?.value
        console.log(phoneNumber,password,otp)
       if(phoneNumber.length > 13 && password.length) {
       
        generateRecaptcha()
        let appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
        .then((confirmationResult) => {
          setVerify(true)
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        }).catch((error) => {
          // Error; SMS not sent
         console.log(error)
        });
       }
    }

    

    const verifyOTP = () =>{
      if(OTP.length===6){
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(OTP).then((result) => {
          // User signed in successfully.
          const user = result.user;
          userDispatch({type:actionTypes.GETTING_USER_SUCCESS,payload:user})
          router.push('/')
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          userDispatch({type:actionTypes.GETTING_USER_ERROR})
        });
      }
    }



    return (
        <Layout title={'Register || Nobin Udyokta'}>
            <div className='my-20 items-center container mx-auto flex justify-center'>
              <form onSubmit={(e)=>handleRegister(e)} className='w-96 bg-base-200 rounded-xl px-3 py-6 flex flex-col gap-2'>
                <div>
                    <h2 className='text-2xl uppercase text-teal-600 font-bold'>{verify ? 'Verify Account':'New Account Create'}</h2>
                </div>
               {
                verify ?  <label className='flex flex-col'>
                OTP Code
              <input name='otp' value={OTP} onChange={(e)=>setOTP(e.target.value)} className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="number" />
              </label>
                :
                <>
                 {/* Phone number */}
                 <label className='flex flex-col'>
                Phone Number
              <input name='phone' defaultValue={'+8801'} className='border border-teal-600 px-4 mx-6 py-3 rounded' type="text" />
              </label>
              {/* Password */}
                <label className='flex flex-col'>
                Password
              <input name='password' className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="password" />
              </label>
                </>
               }
              {/* Register */}
              <div className='mx-6'>
                {
                  verify ?  <div onClick={verifyOTP} className='w-full text-center cursor-pointer px-3 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white'>Verify</div>
                  :
                   <button className='w-full px-3 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white'>Register</button>
                }
               
               {
                verify &&  <button onClick={()=>setVerify(false)} className='w-full mt-6 px-3 py-2 rounded bg-rose-600 hover:bg-rose-700 text-white'>Cancel</button>
               }
              </div>
              <div className='flex flex-col gap-2 mx-6'>
                {/* Recover Password */}
                <Link className='text-teal-600 hover:underline font-bold' href={'#'}>Recover Password</Link>
                {/* Already have an account */}
                <Link className='text-teal-600 hover:underline font-bold' href={'/account/login'}><span className='text-black'>Already have an account?</span> <span>Login</span></Link>
              </div>
              <div id='sign-in-button'></div>
              </form>
            </div>
        </Layout>
    );
};

export default index;