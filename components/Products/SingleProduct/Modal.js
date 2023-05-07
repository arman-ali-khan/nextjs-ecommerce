import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const Modal = ({ id, setId }) => {
    const [modalData, setModalData] = useState({});
    const [loading,setLoading] = useState(true)
    useEffect(() => {
      axios.get(`/api/product/${id}`).then((res) => {
        setModalData(res.data)
        setLoading(false)
      });
    }, []);
    console.log(modalData);
  return (
    <div
      class="fixed inset-0 z-30 my-20 md:my-0 overflow-y-auto text-center"
      id="headlessui-dialog-10"
      role="dialog"
      aria-modal="true"
    >
   
      <div class="min-h-screen px-4 ">
        <div onClick={()=>setId('')}
          class="fixed inset-0 bg-black cursor-pointer ease-out duration-300 opacity-25"
          id="headlessui-dialog-overlay-12"
          aria-hidden="true"
        ></div>
        <span class="inline-block h-screen align-middle " aria-hidden="true">
          
        </span>
        <div class="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl  rounded-2xl opacity-100 relative scale-100">
        <div class=" right-5 absolute z-[999999] top-5">
          <button
            onClick={()=>setId('')}
            type="button"
            class="inline-flex  justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-teal-600 rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
          </button>
        </div>
          <div class="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl ">
            <div
              class="flex-shrink-0 md:w-96 flex items-center justify-center h-auto cursor-pointer"
              href="/product/rainbow-chard"
            >
              <span className="span-order w-44">
             {
              loading && <div className="h-96 w-full bg-base-300 animate-pulse"></div>
             }
             {
              modalData.images &&  <ImageGallery className="h-96 w-44" showNav={false} autoPlay={true} showPlayButton={false} items={modalData?.images} />
             }
              </span>
            </div>
            <div class="w-full flex flex-col p-5 md:p-8 text-left">
              <div class="mb-2 md:mb-2.5 block -mt-1.5">
                <Link
                  class="text-heading text-teal-600 text-lg md:text-xl lg:text-2xl font-semibold  hover:text-blue-600 cursor-pointer"
                  href={`/product/${modalData.id}`}
                >
                 {modalData.title}
                </Link>
                <div class="relative">
                  <span class="bg-emerald-100 text-emerald-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold ">
                    Stock :
                    <span class="text-red-500 dark:text-red-400 pl-1 font-bold">
                      {modalData.stock}
                    </span>
                  </span>
                </div>
              </div>
              <p class="text-sm leading-6 text-gray-500 md:leading-6">
               {modalData.description}
              </p>
              <div class="flex items-center my-4">
                <div class=" product-price font-bold">
                  <span class="inline-block text-2xl">${modalData.price}</span>
                </div>
              </div>
              <div class="mb-1"></div>
              <div class="flex items-center mt-4">
                <div class="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                  <div class="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border w-32 md:w-auto h-11 md:h-12 border-gray-300">
                    <button
                      disabled=""
                      class="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                    >
                      <span class="text-dark text-base">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </button>
                    <p class="font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8 md:w-20 xl:w-24">
                      1
                    </p>
                    <button
                      class="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                      tabindex="0"
                    >
                      <span class="text-dark text-base">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <button class="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-teal-500 hover:bg-teal-600 w-full h-12">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div class="flex items-center mt-4">
                <div class="flex flex-col items-center justify-between space-s-3 sm:space-s-4 w-full">
                  <div>
                    <span class=" font-semibold py-1 text-sm d-block">
                      <span class="text-gray-700"> Category:</span>
                      {
                        modalData.categories?.map((category,i)=> <button key={i}
                        type="button"
                        class="text-gray-600  font-medium underline ml-2 hover:text-teal-600"
                      >
                       {category.label}
                      </button>)
                     }
                      
                    </span>
                    <div class="flex flex-row">
                    
                     {
                        modalData.tags?.map((tag,i)=> <span key={i} class="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold  mt-2">
                        {tag.value}
                      </span>)
                     }
                    </div>
                  </div>
                  <div>
                    <Link href={`/product/${modalData.id}`}>
                    <button class="font-sans bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-medium text-sm text-white">
                      Details
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;