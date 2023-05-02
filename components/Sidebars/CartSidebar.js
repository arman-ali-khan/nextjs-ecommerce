import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CartSidebar = ({showCart, setShowCart}) => {
  return (
   <div className="h-full relative">
    
     <div className="flex gap-3 items-center border border-teal-600 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
        <p className="md:text-md text-teal-600 font-bold">234$</p>
        </div>
       
        <div className="text-lg w-9 flex flex-col justify-center text-center bg-teal-50 text-white mt-2">
            <button className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-t-full">-</button>
            <p className="text-teal-600">10</p>
            <button className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-b-full">+</button>
        </div>
      </div>
      <div className="flex justify-end w-12">
        <button className="text-rose-400"><AiOutlineDelete size={30} /></button>
      </div>
     
    </div>
    <button onClick={()=>setShowCart(false)} className="absolute bottom-12 right-0  px-4 py-2 rounded bg-teal-600 text-white">Close</button>
   </div>
  );
};

export default CartSidebar;
