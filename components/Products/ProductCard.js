import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import Link from "next/link";
import Modal from "./SingleProduct/Modal";
import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import { toast } from "react-hot-toast";
import { BiHeart } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const ProductCard = ({ product }) => {
  
  
  const {dispatch,state,dbUser,user,setLoading,loading} = useAllContext()
  

 const selected = state.cart.find(cart => cart._id === product._id);


 const  added = selected?.quantity>0


 const products = state.cart;


// all product price
let totalPrice = products.reduce(function (prev, current) {
  return prev + +current.price * current.quantity;
}, 0);
console.log(totalPrice,dbUser.balance)
// add product to cart with enough money
const handleAddToCart = () => {
   dispatch({type:actionTypes.ADD_TO_CART,payload:product})
   toast.success("Added to Cart")
 }

  const handleRemoveFromCart = () => {
    dispatch({type:actionTypes.DECREMENT_CART,payload:product})
    toast.success("Remove one product")
  }


  
 const [id,setId]  = useState('')




  return (
    <>
    <div
      className={`shadow-xl rounded-md relative`}>
      <div >
        <label onClick={()=>setId(product.id)} className={`h-60 bg-base-100 cursor-pointer`}>
          <img src={product.images[0].original} alt="" />
        </label>

        <div className={`flex items-center justify-between px-3`}>
          <div>
            <div className="sm:flex flex-col sm:flex-row gap-0 md:!justify-between justify-start sm:gap-3 tooltip items-center ">
              <h4
                className="text-teal-600 flex gap-1 text-sm font-bold tooltip"
                data-tip={`Original Price ${ product.oldPrice}৳ Discount Price ${
                  product.price
                }৳`}
              >
                ৳{product.price}
                <span className="text-gray-500 text-sm font-thin line-through">
                  ৳{product.oldPrice}
                </span>
              </h4>
              <div>
                <span className="flex items-center">
                  {[...Array(product.rating).keys()].map((rate, i) => (
                    <span
                      data-tip={`${product.rating} Star Rating`}
                      className="text-yellow-500 tooltip text-xs md:text-base"
                      key={i}
                    >
                      <BsStarFill />
                    </span>
                  ))}
                </span>
              </div>
            </div><br/>
            {/* product title */}
            <Link
              href={`/product/${product.id}`}
              className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold"
            >
              {product.title.slice(0,20)}{parseInt(product.title.length)>=19 && '..'}
            </Link>
          </div>
        </div>
      </div>
      {/* Add to cart */}
      {
        added ? 
        <div
     
      
        className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  rounded text-white `}
      >
        {/* Derement btn */}
        <button   onClick={()=>handleRemoveFromCart()} className="px-3 py-2 bg-teal-600">
          <MdOutlineRemove size={20} />
        </button>
        {/* Count */}
        <span className="text-teal-600 font-bold">{selected?.quantity}</span>
        {/* increment btn */}
        <button  onClick={()=>handleAddToCart()} className="px-3 py-2 bg-teal-600"> 
          <MdOutlineAdd size={20} />
        </button>
       
      </div>
      :
    <div
    onClick={handleAddToCart}
    
      className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
    >
      <button>Add To Cart</button>
      <span className=" px-4 py-2">
        <MdOutlineAdd size={20} />
      </span>
    </div>
  }
      
      
      <div>
      </div>
    
    </div>
      {
        id && <Modal id={id} setId={setId} />
      }
      </>
  );
};

export default ProductCard;
