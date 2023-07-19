import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GiCancel } from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid';

const SendMoney = () => {
  const { dbUser,setUpdateMoney,updateMoney, } = useAllContext();

  // router
  const router = useRouter();


  const [sendMoney, setSendMoney] = useState(0);

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


  // token
  const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')

  // handle send money

  // transaction id
  const transaction = uuidv4().split('-')[0]

  const handleSendMoney = () =>{
    
    const sendMoneyData = {
      amount: sendMoney,
      sender: dbUser.name,
      senderEmail: dbUser.email,
      recipient: recipient,
      transaction,
      recipientEmail: recipient.email,
      date: Date.now(),
      type:'send'
    }
    if(dbUser.email){
      axios.post(`/api/money/send/create?email=${dbUser.email}`,sendMoneyData,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
    .then(response =>{
      toast.success('Send success')
      setUpdateMoney(!updateMoney)
      if(response.data){
        router.push('/user/moneyorder')
      }
     
    })
       .catch(err =>{
      console.log(err);
    })
     
    }
    
  }
  return (
    <div>
      <div class="font-manrope justify-center flex w-full">
        <div class=" bg-base-100 max-w-xl w-96 md:px-4 p-1">
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
          <div class="font-semibold">Number</div>
            <div class=" ">
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
                  <div class="font-semibold">{recipient?.name}</div>
                  <div class="text-[#64748B]">{recipient?.phone}</div>
                </div>
              </div>
            </div>
          ) : (
            "No user found"
          )}
            </div>
            
          </div>

          <div class="mt-6 mb-24">
            <button
            onClick={()=>handleSendMoney()}
              disabled={
                balance < sendMoney || !recipient?.name || sendMoney < 50
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
         
          <div className="modal-action">
      <label htmlFor="add-recipient" className="px-4 py-2 rounded bg-teal-600 text-white flex items-center gap-2 cursor-pointer"> <GiCancel size={20} /> Cancel</label>
    </div>
        </label>
        
      </label>
    </div>
  );
};

export default SendMoney;
