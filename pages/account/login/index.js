import Layout from '@/Layout/Layout';
import Link from 'next/link';
import React from 'react';

const index = () => {
    return (
        <Layout title={'Login || Nobin Udyokta'}>
            <div className='my-20 items-center container mx-auto flex justify-center'>
              <div className='w-96 bg-base-200 rounded-xl px-3 py-6 flex flex-col gap-2'>
                <div>
                    <h2 className='text-2xl uppercase text-teal-600 font-bold'>Login</h2>
                </div>
                <label className='flex flex-col'>
                Phone Number
              <input className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="text" />
              </label>
                <label className='flex flex-col'>
                Password
              <input className='border border-teal-600 px-4 mx-6 py-3 rounded ' type="password" />
              </label>
              <div className='mx-6'>
                <button className='w-full px-3 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white'>Login</button>
              </div>
              <div className='flex flex-col gap-2 mx-6'>
                <Link className='text-teal-600 hover:underline font-bold' href={'#'}>Recover Password</Link>
                <Link className='text-teal-600 hover:underline font-bold' href={'/account/register'}>Create New Account</Link>
              </div>
              </div>
            </div>
        </Layout>
    );
};

export default index;