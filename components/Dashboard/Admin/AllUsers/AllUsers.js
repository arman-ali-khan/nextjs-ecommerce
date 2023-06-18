import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiSendPlaneLine } from "react-icons/ri";

const AllUsers = () => {
  const { user, logOut } = useAllContext();
  const [loading, setLoading] = useState(true);

  const [allUsers, setAllUsers] = useState([]);

    // token
    const token = typeof window !== 'undefined' && localStorage.getItem('accessToken')

  useEffect(() => {
    axios
      .get(`/api/admin/allusers?email=${user.email}`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
      
        setAllUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if(err.response?.status===401){
          setLoading(false);
          return logOut()
         }
       
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
          <RiSendPlaneLine size={20} /> Send Money
        </Link>
        {/* Cashout */}
        <Link
          className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2 justify-center"
          href={"/@money/cashout"}
        >
          <GiTakeMyMoney size={20} /> Cash Out
        </Link>
        {/* Cashoin */}
        <Link
          className="bg-teal-600 text-white md:px-4 px-2 text-xs md:text-base py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2 justify-center"
          href={"/@money/cashin"}
        >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-1">
              {/* row 1 */}
              {allUsers.map((user, i) => (
               <div className="px-2 mt-12 relative border py-3 rounded-md" key={i}>
                    <div className="flex w-full relative -top-12 h-24 items-center justify-center">
                        <img className="w-24  h-24 " src={user.photo || 'https://nobin.vercel.app/logo.svg' } alt="" />
                        </div>
                <div className="flex justify-between ">
               
                 <div>
                  <span className="font-bold text-xs">
                  {user.type}
                  </span>
                 </div>
                </div>
               <div className="flex items-center justify-between">
             
               <div> Name:
               <span className="flex font-bold items-center ">
                   
                   </span>
                  
                 </div>
                 <div className="font-bold flex items-center ">
                 {user.name}
                
                 </div>
               </div>


                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> Phone: </div>
                 <div>
                 <div className="font-bold  text-sm" >
                 {user.phone}
                 
                   </div>
                 </div>
                 </div>


                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> Email: </div>
                 <div>
                 <div className="font-bold  text-sm" >
                 {user.email} 
               
                   </div>
                 </div>
                 </div>
                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> balance: </div>
                 <div>   
                 <div className="font-bold  text-sm" >
                 {(user.balance)}
               
                   </div>
                 </div>
                 </div>
                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> Agent: </div>
                 <div> 
                 <div className="font-bold  text-sm" >
                 {user.agent}
               
                   </div>
                 </div>
                 </div>
                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> Stocks: </div>
                 <div>
                 <div className="font-bold  text-sm" >
                 {user.stock}
               
                   </div>
                 </div>
                 </div>
                 <div className="flex justify-between items-center">
                 <div className=" text-sm"> Revenue: </div>
                 <div>
                 <div className="font-bold  text-sm" >
                 {user.revenue}
               
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

export default AllUsers;
