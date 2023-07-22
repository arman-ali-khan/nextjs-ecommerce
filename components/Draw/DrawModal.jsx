import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import crypto from "crypto";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const DrawModal = ({id,setId,update,setUpdate}) => {

  // context 
  const {user} = useAllContext()
  
// loading
const [loading,setLoading] = useState(false)
  // get one draw
  const [getDraw,setGetDraw]= useState({})
  
  useEffect(()=>{
    setLoading(true)
    axios.get(`/api/draw/getOne?id=${id}`)
    .then(res=>{
      setGetDraw(res.data)
      console.log(getDraw)
      setLoading(false)
     
    })
  },[])


  // ticket quantity
  const quantity = getDraw.stock
  // make ticket number
  let [ticket,setTicket] = useState([])
  // count
  const [count,setCount] = useState('1')

  const {register,handleSubmit,watch, formState:{errors}} = useForm()

  // handle ticket
  const handleTicket = (data)=>{
  if(count>0){
     const ticketData = {
      ticketList: ticket.slice(0,parseInt(count)),
      quantity:data.ticket,
      email:user.email,
      id: getDraw.id,
      price: getDraw.price,
      drawname:'one',
      date:  Date(),
    }
    axios.post(`/api/draw/createticket?email=${user.email}`,ticketData)
    .then(res=>{
      console.log(res.data)
      toast.success('Tickets buy successfully')
      setUpdate(!update)
    })
  }
   
  }


console.log(ticket.slice(0,parseInt(count)),count)
  // increase ticket 
  useEffect(()=>{
  
   if(count.length){
    const randomString = (crypto.randomBytes(8).toString("hex"));
    setTicket([...ticket,randomString])
   }
  },[count])

    return (
<>
  <input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
<label onClick={()=>setId('')} className="px-3 py-1 rounded-full bg-teal-600 right-0 absolute top-0" htmlFor="my_modal_7">X</label>
    <h3 className="text-lg font-bold my-2">How many ticket you want to buy from {loading?'...': getDraw?.title}?</h3>
    <form onSubmit={handleSubmit(handleTicket)}>
      <input defaultValue={'1'} placeholder="0" onChangeCapture={(e)=>setCount(e.target.value)} {...register("ticket",{required:true})} className="input input-bordered w-full" type="number"  />
    <button disabled={quantity<count || count<1} className="px-4 disabled:bg-teal-100 disabled:text-black py-2 rounded bg-teal-600 text-white my-2 mx-auto w-full">Buy Now</button>
    </form>
  </div>
  <label onClick={()=>setId('')} className="modal-backdrop" htmlFor="my_modal_7"></label>
</div>
</>

    );
};

export default DrawModal;