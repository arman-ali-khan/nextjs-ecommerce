import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";

const AllDrawCard = ({ product,update,setUpdate }) => {
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

// delete lottery
  const handleDeleteLottery = (id) => {
   axios.delete(`/api/draw/delete?id=${id}`)
   .then(res=>{
    console.log(res)
    toast.success('Draw Deleted')
    setUpdate(!update)
   })
  };

  const [id, setId] = useState("");

  return (
    <>
      <div className={`shadow-xl rounded-md relative`}>
        {/* stock */}
        <div>
          {product?.stock > 0 ? (
            <div className="absolute top-1 px-2 right-1 bg-green-500 rounded-full p-1 text-white text-xs">
              {product.stock}
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
              <img
                className="h-60 w-full object-cover"
                src={product.images}
                alt=""
              />
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
        <div
            className={`flex cursor-pointer select-none  items-center  duration-300 border border-teal-600  rounded  `}
          >
            {/* Edit btn */}
            {/* <button
              onClick={() => handleRemoveFromCart()}
              className="px-3 w-full flex items-center justify-center py-2 text-teal-600 hover:text-white hover:bg-teal-600 border-r"
            >
              <BsPencilSquare />
            </button> */}
            {/* Delete btn */}
            <button
              onClick={() => handleDeleteLottery(product.id)}
              className="px-3 w-full flex items-center justify-center py-2 text-error hover:text-white hover:bg-error"
            >
              <BiTrash />
            </button>
           
           
          </div>
        {
            
          product?.stock > 0 || <Link href={'/result/draw/123'}
          className={`flex cursor-pointer select-none justify-between items-center bg-base-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
        >
         <p  className="">See Result</p>
          <span className=" px-4 py-2">
            <MdOutlineAdd size={20} />
          </span>
        </Link>
        }

        <div></div>
      </div>
     
    </>
  );
};

export default AllDrawCard;
