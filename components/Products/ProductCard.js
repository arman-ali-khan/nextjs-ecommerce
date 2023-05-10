import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import ProductModal from "./SingleProduct/ProductModal";
import Link from "next/link";
import Modal from "./SingleProduct/Modal";
import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
 

  const {dispatch,state} = useAllContext()
  console.log(state)


  const handleAddToCart = () => {
    dispatch({type:actionTypes.ADD_TO_CART,payload:product})
    toast.success("Added to Cart")
  }
 
  
 const [id,setId]  = useState('')
  return (
    <>
    <div
      className={`shadow-xl rounded-md
      }`}
    >
      <label
      onClick={()=>setId(product.id)}
        className="cursor-pointer "
        htmlFor="productModal"
      >
        <div className={`h-60 bg-base-100 `}>
          <img src={product.images[0].original} alt="" />
        </div>

        <div className={`flex items-center justify-between px-3`}>
          <div>
            <div className="flex !justify-between gap-3 tooltip items-center ">
              <h4
                className="text-teal-600 flex gap-1 text-sm font-bold tooltip"
                data-tip={`Original Price ${product.price}৳ Discount Price ${
                  product.price - 100
                }৳`}
              >
                ৳{product.price}
                <span className="text-gray-500 text-sm font-thin line-through">
                  ৳{product.price - 100}
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
            </div>
            {/* product title */}
            <Link
              href={`/product/${product.id}`}
              className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold"
            >
              {product.title}
            </Link>
          </div>
        </div>
      </label>
      {/* Add to cart */}
      <div
      onClick={handleAddToCart}
      
        className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
      >
        <button>Add To Cart</button>
        <span className=" px-4 py-2">
          <MdOutlineAdd size={20} />
        </span>
      </div>
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
