import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiCheckCircle, BiSelection } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';

const SendMoney = () => {
  const { dbUser,setUpdateMoney,updateMoney, } = useAllContext();

  // router
  const router = useRouter();


  const [sendMoney, setSendMoney] = useState(0);
  console.log(sendMoney);
  const balance = parseFloat(dbUser.balance);

  // get phone
  const [phone, setPhone] = useState("");

  // get recipients
  const [recipient, setRecipient] = useState({});


  useEffect(() => {
    axios
      .get(`/api/money/getrecipient?phone=${phone}`)
      .then((res) => {
        setRecipient(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [phone]);

  // select for send money
  const [selectedUser, setSelectedUser] = useState({});


  // get if selected user
  const selected = selectedUser?.uid === recipient?.uid

  // remove selected user
  const handleRemoveUser = (id) => {
    setSelectedUser({});
  };

  // handle send money

  // transaction id
  const transaction = uuidv4().split('-')[0]

  const handleSendMoney = () =>{
    
    const sendMoneyData = {
      amount: sendMoney,
      sender: dbUser.name,
      senderEmail: dbUser.email,
      recipient: selectedUser,
      transaction,
      recipientEmail: selectedUser.email,
      date: Date.now(),
      type:'send'
    }
    if(dbUser.email){
      axios.post(`/api/money/send/create`,sendMoneyData)
    .then(response =>{
      toast.success('Send success')
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
            <div class="font-semibold">How much would you like to send?</div>
            <div>
              <input
                onChange={(e) => setSendMoney(e.target.value)}
                class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
                type="number"
                placeholder="100"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="font-semibold">Balance</div>
            <div class="mt-2">
              <div class="flex w-full items-center justify-between bg-neutral-100 p-3 rounded-[4px]">
                {balance < sendMoney  ? (
                  <div class="flex items-center gap-x-2">
                    <GiCancel className="h-8 w-8  text-error" />
                    <span class="font-semibold">{dbUser.balance}</span>
                  </div>
                ) : (
                  <div class="flex items-center gap-x-2">
                    <BiCheckCircle className="h-8 w-8 text-[#299D37]" />
                    <span class="font-semibold">{dbUser.balance} - {sendMoney} = {(dbUser.balance-sendMoney).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex justify-between">
              <span class="font-semibold text-[#191D23]">Receiving</span>
              <div class="flex cursor-pointer items-center gap-x-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <label
                  htmlFor="add-recipient"
                  class="font-semibold text-green-700 cursor-pointer"
                >
                  Add recipient
                </label>
              </div>
            </div>
            {selectedUser?.name &&
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
                    <div class="font-semibold truncate">{selectedUser?.name}</div>
                    <div class="text-[#64748B] truncate">{selectedUser?.phone}</div>
                  </div>
                </div>
                <button
                  className="flex justify-end bg-teal-600 text-white px-4 py-1 rounded"
                  onClick={() => handleRemoveUser()}
                >
                  Remove
                </button>
              </div>
            }
          </div>

          <div class="mt-6 mb-24">
            <button
            onClick={()=>handleSendMoney()}
              disabled={
                balance < sendMoney || !selectedUser.name || sendMoney < 50
              }
              class="w-full cursor-pointer rounded-[4px] bg-teal-600 hover:bg-teal-700 px-3 py-[6px] text-center font-semibold text-white disabled:bg-gray-200 disabled:text-gray-600"
            >
              Send ${ sendMoney}
            </button>
            {
              sendMoney < 50 && <p className="text-error">Send minimum 50 Taka</p>
            }
          </div>
        </div>
        
      </div>

      {/* recipient modal */}
      <input type="checkbox" id="add-recipient" className="modal-toggle" />
      <label htmlFor="add-recipient" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="md:text-lg font-bold">
            Search recipient wiht phone number
          </h3>
          <div>
            <div>
              <div className="flex flex-col md:flex-row gap-y-4 gap-x-[10px]">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  name="number"
                  type="search"
                  className="w-full rounded-[4px] border border-[#A0ABBB] p-2"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>
          {recipient?.name ? (
            <div class="flex flex-col sm:flex-row justify-between items-center gap-x-[10px] bg-neutral-100 md:p-3 mt-2 rounded-[4px]">
              <div className="flex  items-center gap-x-[10px] bg-neutral-100 p-3 mt-2 rounded-[4px]">
                <div className="w-10">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <div class="font-semibold">{recipient?.name}</div>
                  <div class="text-[#64748B]">{recipient?.phone}</div>
                </div>
              </div>
              {selected ? (
                <button
                  className="flex justify-end items-center gap-2 bg-teal-600 text-white px-4 py-1 rounded"
                  onClick={() => handleRemoveUser({})}
                >
                  <ImCheckboxChecked />
                  Selected
                </button>
              ) : (
                <button
                  className="flex justify-end items-center gap-2 bg-teal-500 text-white px-4 py-1 rounded"
                  onClick={() => setSelectedUser( recipient)}
                >
                 <ImCheckboxUnchecked /> Select
                </button>
              )}
            </div>
          ) : (
            "No user found"
          )}
          <div className="modal-action">
      <label htmlFor="add-recipient" className="px-4 py-2 rounded bg-teal-600 text-white flex items-center gap-2 cursor-pointer"> <GiCancel size={20} /> Cancel</label>
    </div>
        </label>
        
      </label>
    </div>
  );
};

export default SendMoney;
