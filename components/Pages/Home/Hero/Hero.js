import HeroCategories from '@/components/Categories/HeroCategories';
import Categories from '@/components/Categories/NavCategories';
import HeroSlider from '@/components/Sliders/HeroSlider';
import React from 'react';

const Hero = () => {
    return (
        <div className='mt-12 md:mt-14 flex flex-col-reverse md:flex-row gap-3 container mx-auto '>
            <div className='md:w-4/12 w-full px-3 z-10'>
                <HeroCategories />
            </div>
            <div className='md:w-8/12 w-full px-3 z-10'>
                <HeroSlider />
            </div>
           
        </div>
    );
};

export default Hero;