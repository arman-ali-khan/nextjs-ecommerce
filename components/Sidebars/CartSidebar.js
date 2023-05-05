import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CartSidebar = ({showCart, setShowCart}) => {
  return (
   <div className="h-full relative overflow-auto section">
    <div className="flex items-center sticky top-0 justify-between my-2 bg-teal-600 rounded pl-4">
      <p className="text-white">Shopping Cart</p>
    <button onClick={()=>setShowCart(false)} className="px-4 py-2 rounded bg-teal-500 text-white">Close</button>
    </div>
    <div className="overflow-auto mb-12">
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    <div className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md">
      <div className="w-20">
        <img className="w-full" src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="" />
      </div>
      <div className="w-96 flex items-center gap-4">
        <div>
        <h2 className="md:text-sm font-semibold leading-4 text-sm">North wolf bagNorth wolf bagNorth wolf bag</h2>
        
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
    </div>
   <button className={`sticky bottom-12 w-full left-0 bg-teal-600 text-white rounded-full px-4 py-1 my-3 flex items-center justify-between ${showCart || "hidden"}`}>Proceed To Checkout <span className="bg-white px-4 text-teal-600 font-bold rounded-full text-lg py-2">$12345</span></button>
   </div>
  );
};

export default CartSidebar;
