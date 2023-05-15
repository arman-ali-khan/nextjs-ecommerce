import Layout from "@/Layout/Layout";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { InvoiceNumber } from "invoice-number";
import ReactToPrint from 'react-to-print';



const index = () => {
  const router = useRouter();
  const { order } = router.query;
  const ref = React.createRef();

  const { user } = useAllContext();
  const [loading, setLoading] = useState(true);

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    fetch(`/api/order/order?id=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [order, user.email, orderData]);









  const componentRef = useRef();


  return (
    <Layout title={`Order of ${moment(orderData?.time).format("MMM Do YY")}`}>
     
      <div  className="bg-gray-50 my-9 container mx-auto">
      <div>
      
     
    </div>
        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div className="bg-emerald-100 rounded-md mb-5 px-4 py-3">
            <label>
              Thank you
              <span className="font-bold text-emerald-600">
                {orderData?.data?.name},
              </span>
              Your order have been received !
            </label>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <div ref={componentRef} >
              <div className="bg-indigo-50 p-8 rounded-t-xl">
                <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
                  <div>
                    <h1 className="font-bold  text-2xl uppercase">
                      Invoice
                    </h1>
                    <h6 className="text-gray-700">
                      Status :{" "}
                      <span className="text-orange-500">
                        {orderData?.status}
                      </span>
                    </h6>
                  </div>
                  <div className="lg:text-right text-left">
                    <h2 className="text-lg  font-semibold mt-4 lg:mt-0 md:mt-0">
                      <a className="" href="/">
                        <span className="span-order">
                         
                          <img className="h-12" src='/orderlogo.png' alt="" />
                        </span>
                      </a>
                    </h2>
                    <p className="text-sm text-gray-500">
                      Rangpur, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                  <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                    <span className="font-bold  text-sm uppercase text-gray-600 block">
                      Date
                    </span>
                    <span className="text-sm text-gray-500 block">
                      <span>{moment(orderData?.time).format("MMM Do YY")}</span>
                    </span>
                  </div>
                  <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                    <span className="font-bold  text-sm uppercase text-gray-600 block">
                      Invoice No.
                    </span>
                    <span className="text-sm text-gray-500 block">
                      #{orderData?.invoice?.numbers}
                    </span>
                  </div>
                  <div className="flex flex-col lg:text-right text-left">
                    <span className="font-bold  text-sm uppercase text-gray-600 block">
                      Invoice To.
                    </span>
                    <span className="text-sm text-gray-500 block">
                      {orderData?.data?.name} <br />
                      {orderData?.email}
                      <span className="ml-2">{orderData?.data?.phone}</span>
                      <br />
                      {
                        orderData?.location?.map((location,i) => {
                          return (
                            <span key={i} className="ml-2">{location.name},</span>
                          );
                        })
                      }
                      <br />
                    </span>
                  </div>
                </div>
              </div>

              <div className="s">
                <div className="overflow-hidden lg:overflow-visible px-8 my-10">
                  <div className="-my-2 overflow-x-auto">
                    {loading ? (
                      <div className="flex justify-center w-full">
                        <div className="h-6 w-6 border-2 animate-spin border-teal-600 border-dashed rounded-full"></div>
                      </div>
                    ) : (
                      <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr className="text-xs bg-gray-100">
                            <th
                              scope="col"
                              className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                            >
                              Sr.
                            </th>
                            <th
                              scope="col"
                              className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                            >
                              Product Name
                            </th>
                            <th
                              scope="col"
                              className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                            >
                              Item Price
                            </th>
                            <th
                              scope="col"
                              className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
                          {orderData?.products?.map((product, i) => (
                            <tr key={i}>
                              <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
                                {i + 1}
                              </th>
                              <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
                                {product.title}
                              </td>
                              <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
                                {product.quantity}
                              </td>
                              <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
                                ${product.price}
                              </td>
                              <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
                                ${product.price * product.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-b border-gray-100 p-10 bg-emerald-50">
                <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                  <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
                      Payment Method
                    </span>
                    <span className="text-sm text-gray-500 font-semibold  block">
                      {orderData?.payment}
                    </span>
                  </div>
                  <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
                      Shipping Cost
                    </span>
                    <span className="text-sm text-gray-500 font-semibold  block">
                      ${orderData?.shipping}
                    </span>
                  </div>
                  <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
                      Discount
                    </span>
                    <span className="text-sm text-gray-500 font-semibold  block">
                      ${orderData?.discount}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
                      Total Amount
                    </span>
                    <span className="text-2xl  font-bold text-red-500 block">
                      ${orderData?.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
              <ReactToPrint
        trigger={() =>  <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all  text-sm font-semibold h-10 py-2 px-5 rounded-md">
        Download Invoice{" "}
        <span className="ml-2 text-base">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
            ></path>
          </svg>
        </span>
      </button>}
        content={() => componentRef.current}
      />
                <ReactToPrint
        trigger={() =>   <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all  text-sm font-semibold h-10 py-2 px-5 rounded-md">
        Print Invoice{" "}
        <span className="ml-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linejoin="round"
              stroke-width="32"
              d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
            ></path>
            <rect
              width="256"
              height="208"
              x="128"
              y="240"
              fill="none"
              stroke-linejoin="round"
              stroke-width="32"
              rx="24.32"
              ry="24.32"
            ></rect>
            <path
              fill="none"
              stroke-linejoin="round"
              stroke-width="32"
              d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
            ></path>
            <circle cx="392" cy="184" r="24"></circle>
          </svg>
        </span>
      </button>}
        content={() => componentRef.current}
      />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
