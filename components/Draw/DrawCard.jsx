import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";

import Link from "next/link";
import { useState } from "react";
import { CheckmarkIcon, toast } from "react-hot-toast";
import { MdOutlineAdd } from "react-icons/md";
import DrawModal from "./DrawModal";
import VideoModal from "./VideoModal";


const DrawCard = ({ product,update,setUpdate }) => {
  const { dispatch, state, dbUser, user, setLoading, loading } =
    useAllContext();
    // quantity
    const quantity = 10
  const selected = state.stocks?.find((stock) => stock?.id === product?.id);

  const added = selected?.quantity > 0;

  const products = state.stocks;

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  // add product to cart with enough money
  const handleAddToCart = () => {
   setId(product.id)
    toast.success("Added to Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: actionTypes.DECREMENT_STOCK, payload: product });
    toast.success("Remove from cart");
  };

  const [id, setId] = useState("");
  console.log(product)
  const [videoUrl,setVideoUrl] = useState('')
 

  return (
    <>
      <div className={`shadow-xl rounded-md relative`}>
        {/* stock */}
        <div>
          {product?.stock > 0 ? (
            <div className="absolute top-1 px-2 right-1 bg-green-500 rounded-full p-1 text-white text-xs">
              {product?.stock}
            </div>
          ) : (
            <div className="absolute top-1 px-2 right-1 bg-red-500 rounded-full p-1 text-white text-xs">
              All Sold
            </div>
          )}
        </div>
        <div>
          <div
            className={`h-60 bg-base-100 cursor-pointer`}
          >
            {product?.images && (
             <label onClick={()=>setVideoUrl(product?.videoUrl)} htmlFor="my_modal_7" className="h-60 w-full object-cover"> <img
              className="h-60 w-full object-cover"
              src={product.images}
              alt=""
            /></label>
            
            )}
          </div>

          <div className={`flex items-center justify-between px-3`}>
            <div>
              <div className="sm:flex flex-col sm:flex-row gap-0 md:!justify-between justify-start sm:gap-3 tooltip items-center ">
                <h4
                  className="text-orange-600 items-center flex gap-1 text-sm font-bold tooltip"
                  data-tip={`Buy Price ${product?.price}৳ Sell Price ${product?.price}৳`}
                >
                 
                  <span className="text-teal-500 ">৳{product?.price}</span>
                </h4>
                <div>
                </div>
              </div>
             
              {/* product title */}
              <p
                href={`/product/${product?.id}`}
                className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold"
              >
                {product?.title?.slice(0, 20)}
                {parseInt(product?.title?.length) >= 19 && ".."}
              </p>
            </div>
          </div>
        </div>
        {/* Add to cart */}
        {added ? (
          <div
            className={`flex cursor-pointer select-none  items-center bg-gray-100 duration-300 border border-teal-600  rounded text-white `}
          >
            {/* Remove btn */}
            <button
              onClick={() => handleRemoveFromCart()}
              className="px-3 w-full flex items-center justify-between py-2 bg-teal-100 text-teal-600"
            >
             Remove <CheckmarkIcon />
            </button>
           
           
          </div>
        ) : (
          product?.stock > 0 ? (
            <label  onClick={()=>setId(product.id)} htmlFor="my_modal_7"
              className={`flex cursor-pointer select-none justify-between items-center bg-base-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
            >
             <p  className="">Buy Ticket</p>
              <span className=" px-4 py-2">
                <MdOutlineAdd size={20} />
              </span>
            </label>
          ):(
            <Link href={`/draw/result/${product.id}`}
            className={`flex cursor-pointer select-none justify-between items-center bg-base-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
          >
           <p  className="">See Result</p>
            <span className=" px-4 py-2">
              <MdOutlineAdd size={20} />
            </span>
          </Link>
          )
        )}

        <div></div>
      </div>
      {id && <DrawModal setUpdate={setUpdate} update={update} id={id} setId={setId} />}

{/* The button to open modal */}
{console.log(product?.videoUrl)}

{/* Put this part before </body> tag */}
{
  videoUrl && <VideoModal product={videoUrl} setVideoUrl={setVideoUrl} />
}

    </>
  );
};

export default DrawCard;
