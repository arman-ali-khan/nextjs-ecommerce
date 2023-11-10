import { useAllContext } from "@/context/ContextProvider";
import { GiChessKing } from "react-icons/gi";

const ResultCard = ({result}) => {
    const { user } = useAllContext();
    return (
        <div className=" sm:w-96 pb-2 mx-auto border-teal-600 border rounded-md">
            <div className="w-full py-2 px-2 bg-teal-600 text-white rounded-t-md"><p>Draw Name: {result?.draw}</p></div>
            <div className="sm:p-2 px-1 sm:font-bold text-teal-600">
                {
                    result?.winnerTickets?.map((ticket,i)=>{
                        return <div className="text-black leading-7" key={i}>
                           <p className="relative"> {i+1===1 && <div><p className="font-bold text-teal-500 absolute left-0">1st</p><GiChessKing className="fill-orange-400 absolute left-1/2 -top-10" size={44} /></div>} 
                           {i+1===2 && <p className="font-bold text-teal-500 absolute left-0">2nd</p>}
                           {i+1===3 && <p className="font-bold text-teal-500 absolute left-0">3rd</p>}
                           {i+1===4 && <p className="font-bold text-teal-500 absolute left-0">4rd</p>}
                           
                           {i+1===5 && <p className="font-bold text-teal-500 absolute left-0">5th</p>}
                           {i+1===6 && <p className="font-bold text-teal-500 absolute left-0">6th</p>}
                           {i+1===7 && <p className="font-bold text-teal-500 absolute left-0">7th</p>}
                            <span className="font-bold pl-12">Email:</span> {ticket?.email}</p>
                          <p className="font-bold">Ticket: {ticket?.ticket}</p>
                          {
                            user?.email===ticket?.email && <label htmlFor="howToMoney" className="px-2 py-1 rounded bg-teal-600 cursor-pointer">Withdraw</label>
                          }
                          
                        </div>
                    })
                }
            </div>
            <div>
<input type="checkbox" id="howToMoney" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">টাকা ইউথড্র করার নিয়ম</h3>
    <p className="py-4">আপনার জেতা টাকা ইউথড্র করার জন্য আপনার টিকিট নম্বার কপি করে আপনার প্রফাইল থেকে Cash In অপশনে যান । সেখানে ১০০ লেখার উপর আপনার মোবাই নম্বার আর তার নিচে আপনার কপি করা টিকিট নম্বার টি দিয়ে রিকুয়েস্ট করুন । কিছুক্ষনের মধ্যেই আপনার টাকা আপনার একাউন্টে পেয়ে যাবেন । </p>
  </div>
  <label className="modal-backdrop" htmlFor="howToMoney">Close</label>
</div>
</div>
        </div>
    );
};

export default ResultCard;



{/* Put this part before </body> tag */}
