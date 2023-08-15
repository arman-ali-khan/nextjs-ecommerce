import MoneyOrder from '@/components/User/MoneyOrder/MoneyOrder';
import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
        // get context
  const { user,dUser , logOut} = useAllContext()


  // get token from cookie
const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')



  const [orders,setOrders] = useState([])

  // get orders from mongodb
  useEffect(()=>{
    axios.get(`/api/order?email=${user?.email}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
      setOrders(res.data)
          })
          .catch(err=>{
            if(err.response.status===401){
              return logOut() 
            }
          })
  },[])

  const total = orders.length 

  const processing = orders.filter(order => order.status === 'Processing').length 
  
  const outForDelivery = orders.filter(order => order.status === 'Out for delivery').length 

  const delivered = orders.filter(order => order.status === 'Delivered').length 

    return (
            <div>
            <div className="grid md:gap-4 mb-16 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex h-full">
            <div className="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div className="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-red-600 bg-red-100">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
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
                <h5 className="font-blod">
                  Total Order
                </h5>
                <p className="md:text-xl text-base font-bold leading-none ">
                  {total}
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full">
            <div className="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div className="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-orange-500 bg-orange-100">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
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
                <h5 className="leading-none mb-2 text-sm md:text-base font-medium ">
                  Pending Order
                </h5>
                <p className="md:text-xl text-base font-bold leading-none">
                  {processing}
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full">
            <div className="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div className="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-blue-600 bg-blue-100">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
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
                <h5 className="leading-none mb-2 text-sm md:text-base font-medium">
                  Out for Delivery
                </h5>
                <p className="md:text-xl text-base font-bold leading-none">
                  {outForDelivery}
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full">
            <div className="flex items-center border border-gray-200 w-full rounded-lg p-1 md:p-2">
              <div className="flex items-center justify-center p-1 md:p-3 rounded-full md:h-12 h-6 w-6 text-xs md:w-12 md:text-xl text-center mr-1 md:mr-3 text-teal-500 bg-teal-100">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h5 className="leading-none mb-2 text-sm md:text-base font-medium">
                  Complete Order
                </h5>
                <p className="md:text-xl text-base font-bold leading-none">
                  {delivered}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <MoneyOrder />
        </div>
            </div>
    );
};

export default Profile;