import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiSendPlaneLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

const MoneyOrder = () => {

  const {user} = useAllContext()
  const [loading,setLoading] = useState(true);

  const [sendMoney,setSendMoney] = useState([])
  
  useEffect(() => {
    axios.get(`/api/money/getsendmoney?email=${user.email}`)
    .then(res=>{
      setSendMoney(res.data)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  },[user])
  return (
    <div>
      <div className="flex items-center">
        {/* // Send money */}
          <Link className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/send"}> <RiSendPlaneLine className="hidden sm:block" size={20} /> Send Money</Link>
          {/* Cashout */}
          <Link className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/cashout"}> <GiTakeMyMoney className="hidden sm:block" size={20} /> Cash Out</Link>
          {/* Cashoin */}
          <Link className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/cashin"}> <GiTakeMyMoney className="hidden sm:block" size={20} /> Cash In</Link>
        </div>
      <div className="overflow-x-auto w-full my-4 mb-12">
        
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>status</th>
              <th>Number</th>
              <th>Amount</th>
              <th>recipient</th>
            </tr>
          </thead>
          {
            loading ? <div className="w-full h-full flex items-center justify-center">
            <div className="flex justify-center flex-col items-center">
              <div
                className="spinner-border border-dashed border-teal-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              ></div>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
            :
            <tbody>
            {/* row 1 */}
            {
              sendMoney.map((send,i)=><tr key={i}>
              <th>
                <span className="sm:hidden">{send?.transaction?.slice(0,2)}...</span>
                <span className="hidden sm:block">{send?.transaction}</span>
              </th>
              <td>{moment(send.date).add( 'days').calendar() || 'A day ago'}</td>
              <td>
                <span className={`${send.type==='send' && 'bg-blue-500 text-white px-4 py-2 rounded-full' || send.type==='out' && 'bg-orange-500 text-white px-4 py-2 rounded-full'|| send.type==='in' && 'bg-teal-500 text-white px-4 py-2 rounded-full' || 'bg-blue-100 px-4 py-2 rounded-full' }`}>
                {send.type==='send' && 'Send Money' || send.type==='out' && 'Cashout' || send.type==='in' && 'Cash In' || 'Send'}
                </span>
              </td>
              <td>{send.recipient.phone}</td>
              <td className="flex items-center font-bold">
                
                <TbCurrencyTaka className="font-bold" size={20} /> {send.amount}
              </td>
              <td>
                <span className="flex items-center">
                {send.recipient.name}
                </span>
              </td>
            </tr>)
            }
            
          </tbody>
          }
          
        </table>
      </div>
    </div>
  );
};

export default MoneyOrder;
