import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiCheckCircle, BiSelection } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const CashIn = () => {
  const { dbUser,setUpdateMoney,updateMoney, } = useAllContext();

  // router
  const router = useRouter();


  const [cashOut, setCashOut] = useState(0);
  const [txId, setTxId] = useState('');
  console.log(cashOut);
  const balance = parseFloat(dbUser.balance);

  // get phone
  const [phone, setPhone] = useState("");

  // get agent
  const [agent, setAgent] = useState({});


  useEffect(() => {
    axios
      .get(`/api/money/getagent?email=${dbUser.agent}`)
      .then((res) => {
        setAgent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [phone]);




  // handle send money

  // transaction id
  const transaction = uuidv4().split('-')[0]

  const handleCashOut = () =>{
    
    const cashOutData = {
      amount: cashOut,
      sender: dbUser.name,
      senderEmail: dbUser.email,
      recipient: agent,
      transaction,
      recipientEmail: agent.email,
      date: Date.now(),
      type:'out'
    }
    if(dbUser.email){
      axios.post(`/api/money/send/create`,cashOutData)
    .then(response =>{
      toast.success('Cashout success')
      setUpdateMoney(!updateMoney)
     
    })
       .catch(err =>{
      console.log(err);
    })
      router.push('/user/moneyorder')
    }
    
  }
  return (
    <div>
      <div class="font-manrope justify-center flex w-full">
        <div class=" bg-white max-w-xl w-96 md:px-4 p-1">
          <div>
           
            <div className="flex items-center flex-wrap">
              <img className="w-16 h-16 object-cover rounded" src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon.png" alt="" />
              <img className="w-16 h-16 object-cover rounded" src="https://logos-download.com/wp-content/uploads/2022/01/Nagad_Logo_full-498x700.png" alt="" />
              <img className="w-16 h-16 object-cover rounded" src="https://play-lh.googleusercontent.com/sDY6YSDobbm_rX-aozinIX5tVYBSea1nAyXYI4TJlije2_AF5_5aG3iAS7nlrgo0lk8" alt="" />
              <img className="w-16 h-16 object-cover rounded" src="https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2022/07/06/upay.png" alt="" />
            </div>
            <p className="my-4">Personal Number</p>
            <h3 className="text-3xl bg-teal-100 text-teal-600 flex justify-center py-3 rounded my-4">01701034883</h3>
          </div>
          <div>
            <div class="font-semibold">How much would you like to in?</div>
            <div>
              <input
                onChange={(e) => setCashOut(e.target.value)}
                class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
                type="number"
                placeholder="100"
              />
            </div>
            <div class="font-semibold">Transaction Id</div>
            <div>
              <input
                onChange={(e) => setTxId(e.target.value)}
                class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
                type="text"
                placeholder="Ex3A44GH"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="flex justify-between">
              <span class="font-semibold text-[#191D23]">Your agent</span>
            </div>
            {agent?.name &&
              <div class="flex  justify-between items-center gap-x-[10px] bg-neutral-100 md:p-3 mt-2 rounded-[4px]">
                <div className="flex  items-center gap-x-[10px] bg-neutral-100 p-3 mt-2 rounded-[4px]">
                  <div className="w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                  </div>
                  <div>
                    <div class="font-semibold truncate">{agent?.name}</div>
                    <div class="text-[#64748B] truncate">{agent?.phone}</div>
                  </div>
                </div>
                <button
                  className="flex justify-end bg-teal-600 text-white  rounded"
                  
                >
                 <a className="px-4 py-1 flex items-center gap-2" href={`tel:${agent.phone}`}> <MdCall />
                  Call</a>
                </button>
              </div>
            }
          </div>

          <div class="mt-6 mb-24">
            <button
            onClick={()=>handleCashOut()}
              disabled={
                balance < cashOut || cashOut < 50 || !txId || !agent.email
              }
              class="w-full cursor-pointer rounded-[4px] bg-teal-600 hover:bg-teal-700 px-3 py-[6px] text-center font-semibold text-white disabled:bg-gray-200 disabled:text-gray-600"
            >
              Send Request ${ cashOut}
            </button>
            {
              cashOut < 50 && <p className="text-error">Send minimum 50 Taka</p>
            }
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default CashIn;
