import UserLayout from '@/Layout/UserLayout';
import { useAllContext } from '@/context/ContextProvider';
import { accessToken } from '@/hooks/setToken';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
        // get context
  const { user } = useAllContext()

  // get token from cookie
const token = accessToken('accessToken')

  const [orders,setOrders] = useState([])

  console.log(orders)
  // get orders from mongodb
  useEffect(()=>{
    axios.get(`/api/order?email=${user.email}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
            setOrders(res.data)
          })
  },[])
    return (
        <div>
            <UserLayout>
            <div class="grid md:gap-4 mb-16 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex h-full">
            <div class="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div class="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-red-600 bg-red-100">
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
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <div>
                <h5 class="leading-none mb-2 text-sm md:text-base font-medium text-gray-700">
                  Total Order
                </h5>
                <p class="md:text-xl text-base font-bold leading-none text-gray-800">
                  {orders?.length}
                </p>
              </div>
            </div>
          </div>
          <div class="flex h-full">
            <div class="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div class="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-orange-500 bg-orange-100">
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
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </div>
              <div>
                <h5 class="leading-none mb-2 text-sm md:text-base font-medium text-gray-700">
                  Pending Order
                </h5>
                <p class="md:text-xl text-base font-bold leading-none text-gray-800">
                  12
                </p>
              </div>
            </div>
          </div>
          <div class="flex h-full">
            <div class="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div class="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-blue-600 bg-blue-100">
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
              </div>
              <div>
                <h5 class="leading-none mb-2 text-sm md:text-base font-medium text-gray-700">
                  Processing Order
                </h5>
                <p class="md:text-xl text-base font-bold leading-none text-gray-800">
                  6
                </p>
              </div>
            </div>
          </div>
          <div class="flex h-full">
            <div class="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div class="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-teal-500 bg-teal-100">
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h5 class="leading-none mb-2 text-sm md:text-base font-medium text-gray-700">
                  Complete Order
                </h5>
                <p class="md:text-xl text-base font-bold leading-none text-gray-800">
                  23
                </p>
              </div>
            </div>
          </div>
        </div>
            </UserLayout>
        </div>
    );
};

export default Profile;