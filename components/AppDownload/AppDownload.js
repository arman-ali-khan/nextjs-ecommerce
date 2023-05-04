import React from 'react';
import { BsApple } from 'react-icons/bs';

const AppDownload = () => {
    return (
        <div className='flex items-center justify-between bg-teal-100'>
            <div className='w-full'>
                <img src="https://kachabazar-store.vercel.app/_next/image?url=%2Fapp-download-img-left.png&w=640&q=75" alt="" />
            </div>
            <div className='text-center'>
            <h2 className='text-3xl font-bold'>Get Your Daily Needs From Our KachaBazar Store</h2>
            <p className='my-4'>There are many products you will find our shop, Choose your daily necessary product from our KachaBazar shop and get some special offer.</p>
            <div className='flex items-center gap-2'>
               <div>
                <a href="#"><img src="https://kachabazar-store.vercel.app/app/app-store.svg" alt="" /></a>
               </div>
               <div>
                <a href="#"><img src="https://kachabazar-store.vercel.app/app/play-store.svg" alt="" /></a>
               </div>
            </div>
            </div>
            <div className='w-full'>
                <img src="https://kachabazar-store.vercel.app/_next/image?url=%2Fapp-download-img.png&w=640&q=75" alt="" />
            </div>
        </div>
    );
};

export default AppDownload;