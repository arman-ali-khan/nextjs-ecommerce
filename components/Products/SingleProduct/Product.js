import Layout from "@/Layout/Layout";
import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Product = ({ data: product }) => {
  const { dispatch, state } = useAllContext();

  const selected = state.cart.find((cart) => cart._id === product._id);

  const added = selected?.quantity > 0;
  console.log(added);

  const handleAddToCart = () => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
    toast.success("Added to Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: actionTypes.DECREMENT_CART, payload: product });
    toast.success("Remove one product");
  };

  return (
    <Layout
      title={product.title}
      description={product.description}
      thumb={product.images[0].original}
    >
      <div class="w-full mt-12 rounded-lg p-3 lg:p-12 bg-white">
        <div class="flex flex-col xl:flex-row">
          <div class="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12">
            <div className="span-order h-96">
              <ImageGallery
                className="h-96"
                showNav={false}
                autoPlay={true}
                showPlayButton={false}
                items={product.images}
              />
            </div>
          </div>
          <div class="w-full">
            <div class="flex flex-col w-full md:flex-row lg:flex-row xl:flex-row">
              <div class=" w-full  xl:pr-6 md:pr-6 md:w-2/3 mob-w-full">
                <div>
                  <div class="mb-6">
                    <h1 class="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold  text-gray-800">
                      {product.title}
                    </h1>
                    <p class="uppercase  font-medium text-gray-500 text-sm">
                      SKU :{" "}
                      <span class="font-bold text-gray-600">{product.SKU}</span>
                    </p>
                    <div class="relative">
                      <span class="bg-teal-100 text-teal-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold ">
                        Stock :
                        <span class="text-red-500 dark:text-red-400 pl-1 font-bold">
                          {product.stock}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div class=" product-price font-bold">
                    <span class="inline-block text-2xl">${product.price}</span>
                  </div>
                  <div class="mb-4"></div>
                  <div>
                    <div class="text-sm leading-6 text-gray-500 md:leading-7">
                      {product.description}
                      <br />
                      <span class="read-or-hide">Show Less</span>
                    </div>
                    <div class="flex items-center mt-4 justify-center">
                      <div class="flex items-center  space-s-3 sm:space-s-4 w-full">
                        {/* Add to cart */}
                        {added ? (
                          <div
                            className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  rounded text-white `}
                          >
                            <div class="group flex w-44 items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 ">
                              {/* Derement btn */}
                              <button
                                onClick={() => handleRemoveFromCart()}
                                disabled=""
                                class="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e text-rose-700 hover:bg-rose-400 hover:text-black bg-rose-100 border-gray-500"
                              >
                                <span class="text-dark text-base">
                                  <MdOutlineRemove size={20} />
                                </span>
                              </button>
                              {/* Count */}
                              <p class="font-semibold text-black flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8 Smd:w-20 xl:w-24">
                                {selected?.quantity}
                              </p>
                              {/* increment btn */}
                              <button
                                onClick={() => handleAddToCart()}
                                class="flex items-center justify-center text-black h-full flex-shrink-0 transition ease-in-out duration-300 hover:bg-teal-600 hover:text-white focus:outline-none w-8 md:w-12 text-heading border-s border-black" >
                                <span class="text-dark text-base">
                                  <MdOutlineAdd size={20} />
                                </span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div
                              onClick={handleAddToCart}
                              className={`flex cursor-pointer w-44 justify-center md:w-auto select-none  items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
                            >
                              <button>Add To Cart</button>
                              <span className=" px-4 py-3.5">
                                <MdOutlineAdd size={20} />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <button class="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-teal-500 hover:bg-teal-600 w-44 h-12">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                    <div class="flex flex-col mt-4">
                      <span class=" font-semibold py-1 text-sm d-block">
                        <span class="text-gray-800">Category:</span>
                        {product.categories.map((category, i) => (
                          <button
                            key={i}
                            type="button"
                            class="text-gray-600  font-medium underline ml-2 hover:text-teal-600"
                          >
                           <Link href={`/category/${category.label}`}> {category.value}</Link>
                          </button>
                        ))}
                      </span>
                      <div class="flex flex-row">
                        {product.tags.map((tag, i) => (
                          <span
                            key={i}
                            class="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold  mt-2"
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div class="mt-8">
                      <h3 class="text-base font-semibold mb-1 ">
                        Share your social network
                      </h3>
                      <p class="font-sans text-sm text-gray-500">
                        For get lots of traffic from social network share this
                        product
                      </p>
                      <ul class="flex mt-4">
                        <li class="flex items-center text-center border border-gray-100 rounded-full hover:bg-teal-500 mr-2 transition ease-in-out duration-500">
                          <button
                            aria-label="facebook"
                            class="react-share__ShareButton  bg-transparent border-none p-0 text-base cursor-pointer"
                          >
                            <svg viewBox="0 0 64 64" width="32" height="32">
                              <circle
                                cx="32"
                                cy="32"
                                r="31"
                                fill="#3b5998"
                              ></circle>
                              <path
                                d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li class="flex items-center text-center border border-gray-100 rounded-full hover:bg-teal-500 mr-2 transition ease-in-out duration-500">
                          <button
                            quote=""
                            aria-label="twitter"
                            class="react-share__ShareButton bg-transparent border-none p-0 text-base cursor-pointer"
                          >
                            <svg viewBox="0 0 64 64" width="32" height="32">
                              <circle
                                cx="32"
                                cy="32"
                                r="31"
                                fill="#00aced"
                              ></circle>
                              <path
                                d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li class="flex items-center text-center border border-gray-100 rounded-full hover:bg-teal-500 mr-2 transition ease-in-out duration-500">
                          <button
                            quote=""
                            aria-label="reddit"
                            class="react-share__ShareButton  bg-transparent border-none p-0 text-base cursor-pointer"
                          >
                            <svg viewBox="0 0 64 64" width="32" height="32">
                              <circle
                                cx="32"
                                cy="32"
                                r="31"
                                fill="#ff4500"
                              ></circle>
                              <path
                                d="m 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li class="flex items-center text-center border border-gray-100 rounded-full hover:bg-teal-500 mr-2 transition ease-in-out duration-500">
                          <button
                            quote=""
                            aria-label="whatsapp"
                            class="react-share__ShareButton  bg-transparent border-none p-0 text-base cursor-pointer"
                          >
                            <svg viewBox="0 0 64 64" width="32" height="32">
                              <circle
                                cx="32"
                                cy="32"
                                r="31"
                                fill="#25D366"
                              ></circle>
                              <path
                                d="m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li class="flex items-center text-center border border-gray-100 rounded-full hover:bg-teal-500 mr-2 transition ease-in-out duration-500">
                          <button
                            quote=""
                            aria-label="linkedin"
                            class="react-share__ShareButton  bg-transparent border-none p-0 text-base cursor-pointer"
                          >
                            <svg viewBox="0 0 64 64" width="32" height="32">
                              <circle
                                cx="32"
                                cy="32"
                                r="31"
                                fill="#007fb1"
                              ></circle>
                              <path
                                d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
                                fill="white"
                              ></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                <div class="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                  <ul class="my-0">
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <rect x="1" y="3" width="15" height="13"></rect>
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                          <circle cx="5.5" cy="18.5" r="2.5"></circle>
                          <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Free shipping apply to all orders over shipping
                        <span class="font-semibold">$100</span>
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Home Delivery within{" "}
                        <span class="font-semibold">1 Hour</span>
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Cash on Delivery Available
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <polyline points="17 1 21 5 17 9"></polyline>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                          <polyline points="7 23 3 19 7 15"></polyline>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        <span class="font-semibold">7</span> Days returns money
                        back guarantee
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path>
                          <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Warranty not available this item
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line
                            x1="18.36"
                            y1="18.36"
                            x2="19.78"
                            y2="19.78"
                          ></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line
                            x1="4.22"
                            y1="19.78"
                            x2="5.64"
                            y2="18.36"
                          ></line>
                          <line
                            x1="18.36"
                            y1="5.64"
                            x2="19.78"
                            y2="4.22"
                          ></line>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Guaranteed 100% organic from natural products.
                      </p>
                    </li>
                    <li class="flex items-center py-3">
                      <span class="text-xl text-gray-400 items-start mr-4">
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
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <p class="font-sans leading-5 text-sm text-gray-500">
                        Delivery from our pick point Cecilia Chapman, 561-4535
                        Nulla LA, United States 96522
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
