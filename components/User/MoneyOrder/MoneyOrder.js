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
  const { user } = useAllContext();
  const [loading, setLoading] = useState(true);

  const [sendMoney, setSendMoney] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/money/getsendmoney?email=${user.email}`)
      .then((res) => {
        setSendMoney(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);
  return (
    <div>
      <div className="grid grid-cols-3 justify-center text-center">
        {/* // Send money */}
        <Link
          className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2 justify-center"
          href={"/@money/send"}
        >
          {" "}
          <RiSendPlaneLine size={20} /> Send Money
        </Link>
        {/* Cashout */}
        <Link
          className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2 justify-center"
          href={"/@money/cashout"}
        >
          {" "}
          <GiTakeMyMoney size={20} /> Cash Out
        </Link>
        {/* Cashoin */}
        <Link
          className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2 justify-center"
          href={"/@money/cashin"}
        >
          {" "}
          <GiTakeMyMoney size={20} /> Cash In
        </Link>
      </div>
      <div className="overflow-x-auto w-full my-4 mb-12">
        <div>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex justify-center flex-col items-center">
                <div
                  className="spinner-border border-dashed border-teal-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                ></div>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* row 1 */}
              {sendMoney.map((send, i) => (
                <div className="px-2 border py-3 rounded-md" key={i}>
                 <div className="flex justify-between ">
                 <div>
                  <span
                      className={`${
                        (send.type === "send" &&
                          "bg-blue-100 text-blue-600 rounded px-2") ||
                        (send.type === "out" &&
                          "bg-orange-100 text-orange-600 rounded px-2") ||
                        (send.type === "in" &&
                          "bg-teal-100 text-teal-600 rounded px-2") ||
                        "bg-blue-100 rounded px-2"
                      }`}
                    >
                      {(send.type === "send" && "Send Money") ||
                        (send.type === "out" && "Cashout") ||
                        (send.type === "in" && "Cash In") ||
                        "Send"}
                    </span>
                    <span  className={`font-thin px-2 rounded-full ${send.status ==='accept' && 'bg-green-400' || send.status ==='pending' && 'bg-orange-400' || send.status ==='cancel' && 'bg-rose-400'  || 'bg-none' } text-white`}>
                    {send.status ==='accept' && 'Accepted' || send.status ==='pending' && 'Pending' || send.status ==='cancel' && 'Cancelled' }
                     </span>
                  </div>
                
                  <div>
                   <span className="text-xs">
                   {moment(send.date).add("days").calendar() || "A day ago"}
                   </span>
                  </div>
                 </div>
                <div className="flex items-center justify-between">
              
                <div>
                <span className="flex items-center">
                      {send.recipient.name}
                    </span>
                   
                  </div>
                  <div className="flex items-center font-bold">
                   
                  ID:  {send.transaction}
                  </div>
                </div>
                  <div className="flex justify-between items-center">
                  <div> {send.recipient.phone}</div>
                  <div>
                  <div >
                    <div  className={`flex font-bold ${
                        (send.type === "send" &&
                          "bg-orange-100 text-orange-600 rounded px-2") ||
                        (send.type === "out" &&
                          "bg-rose-100 text-rose-600 rounded px-2") ||
                        (send.type === "in" &&
                          "bg-teal-100 text-teal-600 rounded px-2") ||
                        "bg-blue-100 rounded px-2"
                      }`}>
                       {(send.type === "send" && "-") ||
                        (send.type === "out" && "-") ||
                        (send.type === "in" && "+") ||
                        "Send"}  
                        <span className="flex items-center">
                        <TbCurrencyTaka className="font-bold" size={20} /> {parseFloat(send?.amount).toFixed(2)}
                        </span>
                    </div>
                   
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoneyOrder;
