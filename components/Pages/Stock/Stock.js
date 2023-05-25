import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes';
import { useAllContext } from '@/context/ContextProvider';
import {  accessToken } from '@/hooks/setToken';
import axios from 'axios';
import Image from 'next/image';
import {generate} from 'ocrgenerator';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BDLocations } from 'react-bd-location'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import ProductCard from '@/components/Products/ProductCard';
import StockCard from './StockCard';


const Stock = () => {
    const {state,dbUser,user,setUpdateMoney,updateMoney} = useAllContext()


    // // next router
    const router = useRouter()

    //
    const products = state.cart

       // all product price
  let subTotal = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  const discount  = 0
  const delivery = 0
  const service = 0

  const total = subTotal - discount + delivery + service


  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

const [location,setLocation] = useState([])

// get token from cookie
const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')

// phone number
const number = dbUser?.data?.phone

// loading while checkout
const [loading,setLoading] = useState(false)

// get date 

const date =  new Date()

    // get old stocks
    // loading
    const [oldStockLoad,setOldStockLoad] = useState(true)

    const [oldStocks,setOldStocks] = useState([])

    useEffect(() =>{
        axios.get(`/api/stock?email=${user.email}`)
               .then(res => {
            setOldStocks(res.data)
            setOldStockLoad(false)
        })
        .catch(err => {
            console.log(err)
            setOldStockLoad(false)
        })
    },[])


  const handleSubmit = data => {
    setLoading(true)
    const stockData = {
        products:state.cart,
        agent:dbUser.agent,
        date: date,
        email:user.email,
        total:total,
        id:uuidv4(),
    }
    axios.post(`/api/stock/create`, stockData)
    .then(res=>{
     
        toast.success('Stock created successfully')
        setLoading(false)
    })
    .catch(err=>{
        console.log(err)
        toast.error('Something went wrong')
        setLoading(false)
    })
}

    return (
       <PrivateRoutes>
         <div  className='flex flex-col-reverse md:flex-row overflow-hidden'>
        <div className='mt-16 flex-col w-full md:p-6 px-1  divide-y sm:p-10 divide-gray-300 bg-gray-50 text-gray-800'>
            <div><h2 className='md:text-2xl text-xl font-bold'>Your old stocks</h2></div>
          <div>
          {
                
                oldStocks?.map(stock =><StockCard stock={stock} key={stock._id}/>)
            }
          </div>
         </div>
         {/* Cart */}
             <div className="flex px-1 w-full md:my-12 flex-col mx-auto md:p-6  space-y-6 divide-y sm:p-10 divide-gray-300 bg-gray-50 text-gray-800">

             
 <h2 className="md:text-2xl text-xl font-bold">Stock items</h2>
 <ul className="grid md:grid-cols-3 grid-cols-2 gap-1 pt-4 space-y-2">
    {
        products?.map((product,i) =>  <ProductCard key={i} product={product} />)
    }
   
 </ul>
 <div className="pt-4 space-y-2">
     <div>
         {/* <div className="flex items-center space-x-2 text-xs">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 mt-1 fill-current text-violet-600">
                 <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                 <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
             </svg>
             <span className="text-gray-600">Spend ৳20.00, get 20% off</span>
         </div> */}
     </div>
     {/* <div className="flex justify-between">
         <span>Discount</span>
         <span>-৳{discount.toFixed(2)}</span>
     </div> */}
 </div>
 <div className="pt-4 space-y-2">
     {/* <div className="flex justify-between">
         <span>Service fee</span>
         <span>৳{service.toFixed(2)}</span>
     </div> */}
     {/* <div className="flex flex-col">
         <div className="flex justify-between">
             <span>Delivery fee</span>
             <span>৳{delivery.toFixed(2)}</span>
         </div>
         <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-violet-600">How do our fees work?</a>
     </div> */}
     <div className="space-y-6 my-2">
         <div className="flex justify-between">
             <span>Total</span>
             <span className="font-semibold">৳{total.toFixed(2)}</span>
         </div>
         <button onClick={()=>handleSubmit()} disabled={state.cart.length<1 || dbUser.balance < totalPrice } type="submit" className="w-full py-2 font-semibold border rounded bg-teal-600 text-gray-50 disabled:bg-slate-400 border-teal-600">{loading ? 'Sending to stock...':'Buy Now'}</button>
     </div>
 </div>
</div>
        </div>
       </PrivateRoutes>
    );
};

export default Stock;