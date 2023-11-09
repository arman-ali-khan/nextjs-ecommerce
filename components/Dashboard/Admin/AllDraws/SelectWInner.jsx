import Layout from "@/Layout/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function SelectWInner() {
    const router = useRouter()
    const {drawId} = router.query

    // loading
    const [loading,setLoading] = useState(true)

    // get all tickets by id
    const [ticketData,setTicketData] = useState([])
    useEffect(()=>{
        if(drawId){
            axios.get(`/api/draw/getAllTicket?drawId=${drawId}`)
        .then(res=>{
            setTicketData(res.data)
            setLoading(false)
        })
        }
    },[drawId])
    // state
    const [resultData,setResultData] = useState([])
    console.log(resultData)
    // publish result
    const handlePublishResult = () =>{
        const results = {
            id:getRandomNumber(10),
            winnerTickets:resultData,
            draw:drawId
        }
        axios.post('/api/draw/createResult',results)
        .then(res=>{
            console.log(res.data)
            toast.success('Result Published')
        }).catch(err=>{
            console.error(err.message);
            toast.error('Something want wrong')
        })
    }
    return (
        <Layout title={'Select Winner'}>
            <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {!loading?
            ticketData?.map((ticket,i)=>{
                return <div className="w-56 p-4 border-teal-500 border" key={i}>
                    <h1 className="font-bold">{ticket?.email}</h1>
                    <ul className="flex flex-col justify-start">
                      {
                        ticket?.ticketList?.map((list,i)=>{
                             
                            return   <li key={i+list}>
                            <label className="flex items-center justify-start text-left" htmlFor={i+list}>
                            <input onClick={(e)=>setResultData([...resultData,{ticket:e.target.value,email:ticket?.email}])} className="checkbox checkbox-secondary" type="checkbox" value={list} id={i+list} /> {list}
                            </label>
                          </li>
                        })
                        
                      }
                    </ul>
                    <div>
                       
                    </div>
                </div>
            }):<div className="flex justify-center">
                            <p>Loading...</p>
                        </div>
            }
             
            </div>
            <dir>
                {/* result */}
                <p>Selected ticket</p>
                <div className="flex flex-wrap">
                    {
                        resultData?.map((item,i)=>(
                            <p className="px-4 py-2"><span className="bg-base-300 mx-2 px-1">{i+1}</span>{item?.ticket} <span onClick={()=>setResultData(resultData?.filter(data=>data.ticket!==item?.ticket))} className="px-2 cursor-pointer rounded-full bg-rose-100 text-rose-500">X</span></p> 
                        ))
                    }
                </div>
            </dir>
            <div className="flex justify-center my-12">
            <button onClick={()=>handlePublishResult()} className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-400">Publish Result</button>
            </div>
        </Layout>
    );
}
export default SelectWInner;

function getRandomNumber(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let sequence = '';
    let increment = 0;
  
    for (let i = 0; i < length; i++) {
      // Generate a random character (number or letter)
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
  
      // Add the random character to the sequence
      sequence += randomChar;
  
      // Increment the value for the next iteration
      increment++;
  
      // If the increment reaches a certain value, add a separator (e.g., '-')
      if (increment === 2) {
        sequence += '';
        increment = 0;
      }
    }
  
    // Remove any trailing separator if necessary
    if (sequence.endsWith('')) {
      sequence = sequence.slice(0, -1);
    }
  
    return sequence.toLocaleLowerCase();
  }
