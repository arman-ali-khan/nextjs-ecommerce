import { useAllContext } from '@/context/ContextProvider';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

const GetAllTicket = () => {
    // context
    const {user} = useAllContext()
    //get all tickte
    const [allTicket,setAllTicket] = useState([])

    useEffect(()=>{
        axios.get(`/api/draw/getAllTicket?email=${user?.email}`)
        .then(res=>{
            setAllTicket(res.data)
        })
    },[user?.email])
    return (
       
           <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {
                    allTicket.map(ticket=>{
                        return <div className='border'>
                            <div className='flex gap-2 bg-teal-500 text-white px-2'>
                                
                                <h2>Draw Name:</h2>
                                <p>({ticket.id})</p>
                                <p>{ticket.drawname}</p>
                            </div>
                            <div className='flex px-3 gap-2'>
                            <h2>Date:</h2>
                            <p>{moment(ticket.date).fromNow()}</p>
                           </div>
                             <div className='text-white p-2  gap-1 rounded'>
                           <div>
                            <div>Tickets Numbers:</div>
                            <div className='px-2'>{ticket.ticketList.map(list=><li className='border list-decimal border-teal-600'>{list}</li>)}</div>
                           </div>
                          
                        </div>
                        </div>
                    })
                }
            </div>
    );
};

export default GetAllTicket;