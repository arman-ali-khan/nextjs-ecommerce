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
  },[])
  return (
    <div>
      <div className="overflow-x-auto w-full my-4 mb-12">
        <div className="flex items-center">
        {/* // Send money */}
          <Link className="bg-teal-600 text-white px-4 py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/send"}> <RiSendPlaneLine size={20} /> Send Money</Link>
          {/* Cashout */}
          <Link className="bg-teal-600 text-white px-4 py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/cashout"}> <GiTakeMyMoney size={20} /> Cash Out</Link>
          {/* Cashoin */}
          <Link className="bg-teal-600 text-white px-4 py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/cashin"}> <GiTakeMyMoney size={20} /> Cash In</Link>
        </div>
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
          <tbody>
            {/* row 1 */}
            {
              sendMoney.map((send,i)=><tr key={i}>
              <th>{send?.transaction}</th>
              <td>{moment(send.date).add( 'days').calendar() || 'A day ago'}</td>
              <td>
                <span className={`${send.type==='send' && 'bg-blue-500 text-white px-4 py-2 rounded-full' || send.type==='out' && 'bg-orange-500 text-white px-4 py-2 rounded-full' || 'bg-blue-100 px-4 py-2 rounded-full'}`}>
                {send.type==='send' && 'Send Money' || send.type==='out' && 'Cashout' || 'Send'}
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
        </table>
      </div>
    </div>
  );
};

export default MoneyOrder;
