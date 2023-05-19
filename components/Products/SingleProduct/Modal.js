import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Modal = ({ id, setId }) => {
  const { state, dispatch, dbUser, user } = useAllContext();

  // modal data product
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/product/${id}`).then((res) => {
      setModalData(res.data);
      setLoading(false);
    });
  }, []);

  const selected = state.cart.find((cart) => cart._id === modalData._id);

  const added = selected?.quantity > 0;

  const products = state.cart;

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  // add product to cart with enough money
  const handleAddToCart = () => {
   if (dbUser.balence >= totalPrice) {
      dispatch({ type: actionTypes.ADD_TO_CART, payload: modalData });
      toast.success("Added to Cart");
    } else {
      toast.error("Not enough money to add to cart");
    }
  };

  // remove product from cart
  const handleRemoveFromCart = () => {
    dispatch({ type: actionTypes.DECREMENT_CART, payload: modalData });
    toast.success("Remove one product");
  };
  return (
    <div
      className="fixed inset-0 z-30 my-20 md:my-0 rounded-2xl overflow-y-auto text-center"
      id="headlessui-dialog-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={` right-5 sticky z-[999999] md:hidden  top-0 flex justify-between items-center bg-white py-2 px-4 ${
          loading && "hidden"
        }`}
      >
        <div>
          <p>{modalData.title}</p>
        </div>
        <button
          onClick={() => setId("")}
          type="button"
          className="inline-flex  justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-teal-600 rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
          </svg>
        </button>
      </div>
      <div className="min-h-screen md:px-4 relative">
        <div
          onClick={() => setId("")}
          className="fixed inset-0 bg-black cursor-pointer ease-out duration-300 opacity-25"
          id="headlessui-dialog-overlay-12"
          aria-hidden="true"
        ></div>
        <span
          className="inline-block h-screen align-middle "
          aria-hidden="true"
        ></span>
        <div
          className={`inline-block overflow-y-auto h-full md:rounded-2xl align-middle transition-all transform bg-white shadow-xl rounded-b-2xl opacity-100  scale-100 ${
            loading && "rounded-2xl"
          }`}
        >
          <div className=" right-5 absolute z-[999999] hidden md:flex top-0 justify-between items-center bg-white py-2 px-4">
            <button
              onClick={() => setId("")}
              type="button"
              className="inline-flex  justify-center px-2 py-2 text-base font-medium text-red-500 bg-white border border-teal-600 rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
              </svg>
            </button>
          </div>
          {loading ? (
            <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl ">
              <div
                className="flex-shrink-0 md:w-96 flex items-center justify-center h-auto cursor-pointer"
                href="/product/rainbow-chard"
              >
                <span className="bg-emerald-100 w-full h-full animate-pulse text-emerald-500  inline-flex items-center justify-center px-2 py-0 text-xs font-semibold ">
                  <span className="text-red-500 dark:text-red-400 pl-1 font-bold"></span>
                </span>
              </div>
              <div className="w-full flex flex-col p-5 md:p-8 text-left">
                <div className="mb-2 md:mb-2.5 block -mt-1.5">
                  <div className="relative">
                    <span className="bg-emerald-100 w-20 h-6 animate-pulse text-emerald-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold ">
                      <span className="text-red-500 dark:text-red-400 pl-1 font-bold"></span>
                    </span>
                  </div>
                </div>
                {/* Description */}
                <p className="text-sm leading-6 h-44 rounded-xl animate-pulse bg-gray-200 text-gray-500 md:leading-6"></p>
                <div className="flex items-center my-4">
                  <div className=" product-price font-bold">
                    <span className="inline-block text-2xl"></span>
                  </div>
                </div>
                <div className="mb-1"></div>
                <div className="flex items-center mt-4">
                  <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                    <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border w-32 md:w-auto h-11 md:h-12 border-gray-300">
                      <button
                        disabled=""
                        className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                      >
                        <span className="text-dark text-base"></span>
                      </button>
                      <p className="font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8 md:w-20 xl:w-24"></p>
                      <button
                        className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                        tabindex="0"
                      >
                        <span className="text-dark text-base"></span>
                      </button>
                    </div>
                    <button className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-teal-500 hover:bg-teal-600 w-full h-12"></button>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex flex-col items-center justify-between space-s-3 sm:space-s-4 w-full">
                    <div>
                      <span className=" font-semibold py-1 text-sm d-block"></span>
                      <div className="flex flex-row"></div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row md:flex-row w-full max-w-4xl ">
              <div
                className="flex-shrink-0 md:w-96 flex items-center justify-center h-auto cursor-pointer"
                href="/product/rainbow-chard"
              >
                <span className="span-order w-44">
                  {loading && (
                    <div className="h-96 w-full bg-base-300 animate-pulse"></div>
                  )}
                  {modalData.images && (
                    <ImageGallery
                      className="h-96 w-44"
                      showNav={false}
                      showPlayButton={false}
                      items={modalData?.images}
                    />
                  )}
                </span>
              </div>
              <div className="w-full flex flex-col p-5 md:p-8 text-left">
                <div className="mb-2 md:mb-2.5 block -mt-1.5">
                  <Link
                    className="text-heading text-teal-600 text-lg md:text-xl lg:text-2xl font-semibold  hover:text-blue-600 cursor-pointer"
                    href={`/product/${modalData.id}`}
                  >
                    {modalData.title}
                  </Link>
                  <div className="relative">
                    <span className="bg-emerald-100 text-emerald-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold ">
                      Stock :
                      <span className="text-red-500 dark:text-red-400 pl-1 font-bold">
                        {modalData.stock}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-gray-500 md:leading-6">
                  {modalData.description}
                </p>
                <div className="flex items-center my-4">
                  <div className=" product-price font-bold">
                    <span className="inline-block text-2xl">
                      ${modalData.price}
                    </span>
                  </div>
                </div>
                <div className="mb-1"></div>
                <div className="flex items-center mt-4">
                  <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-0 justify-between space-s-3 sm:space-s-4 w-full">
                    {/* Add to cart btn */}
                    {added ? (
                      <div
                        className={`flex cursor-pointer w-56 select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600 py-4 md:py-3.5 lg:py-4 hover:text-white h-12 rounded-md text-white `}
                      >
                        {/* Derement btn */}
                        <button
                          onClick={() => handleRemoveFromCart()}
                          className="px-3 rounded-md py-3.5 bg-teal-600"
                        >
                          <MdOutlineRemove size={20} />
                        </button>
                        {/* Count */}
                        <span className="text-teal-600 font-bold">
                          {selected?.quantity}
                        </span>
                        {/* increment btn */}
                        <button
                          onClick={() => handleAddToCart()}
                          className="px-3 rounded-md py-3.5 bg-teal-600"
                        >
                          <MdOutlineAdd size={20} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={handleAddToCart}
                        className={`text-sm leading-4 flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-teal-500 hover:bg-teal-600 w-56 h-12`}
                      >
                        <button>Add To Cart</button>
                        <span className=" px-4 py-2">
                          <MdOutlineAdd size={20} />
                        </span>
                      </div>
                    )}

                    <button className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold  text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-teal-500 hover:bg-teal-600 w-44 h-12">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex flex-col items-center justify-between space-s-3 sm:space-s-4 w-full">
                    <div>
                      <span className=" font-semibold py-1 text-sm d-block">
                        <span className="text-gray-700"> Category:</span>
                        {modalData.categories?.map((category, i) => (
                          <button
                            key={i}
                            type="button"
                            className="text-gray-600  font-medium underline ml-2 hover:text-teal-600"
                          >
                            <Link href={`/category/${category.label}`}>
                              {" "}
                              {category.value}
                            </Link>
                          </button>
                        ))}
                      </span>
                      <div className="flex flex-row">
                        {modalData.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold  mt-2"
                          >
                            {tag.value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Link href={`/product/${modalData.id}`}>
                        <button className="font-sans bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded font-medium text-sm text-white">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
