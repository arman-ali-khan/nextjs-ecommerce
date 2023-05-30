import { useAllContext } from '@/context/ContextProvider';
import actionTypes from '@/state/ProductState/actionTypes';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const SingleCart = ({product}) => {
    const {dispatch,state} = useAllContext()
  

    const selected = state.cart.find(cart => cart._id === product._id);

    const selectedStock = state.stocks.find(cart => cart._id === product._id);

  

  const products = state.cart;
  const stocks = state.cart;


 const router = useRouter()
 
      
    return (
      <>
       { router.asPath === '/@stock' || router.asPath === '/stock' ?
       // stats
        <div
        key={product._id}
        className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md"
      >
        <div className="w-20">
          <img
            className="w-full"
            src={product.images[0].original}
            alt=""
          />
        </div>
        <div className="w-96 flex items-center gap-4">
          <div className="w-full">
            <h2 className="md:text-sm font-semibold leading-4 text-sm">
              {product.title}
            </h2>

            <p className="md:text-md text-teal-600 font-bold">{(product.price * selectedStock.quantity).toFixed(2)}$</p>
          </div>

          <div className="text-lg w-9 flex flex-col justify-center text-center bg-teal-50 text-white mt-2">
            {/* Increment btn */}
            <button onClick={()=>dispatch({type:actionTypes.ADD_TO_STOCK,payload:product})} className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-t-full">
              +
            </button>
            {/* Count */}
            <p className="text-teal-600">
              {
              selectedStock.quantity
            }
            </p>
            {/* Decrement btn */}
            <button onClick={()=>dispatch({type:actionTypes.DECREMENT_STOCK,payload:product})} className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-b-full">
              -
            </button>
          </div>
        </div>
        {/* Remove from cart */}
        <div className="flex justify-end w-12">
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.REMOVE_FROM_CART,
                payload: product,
              })
            }
            className="text-rose-400"
          >
            <AiOutlineDelete size={30} />
          </button>
        </div>
      </div>  
      :
      // products
      <div
        key={product._id}
        className="flex gap-3 items-center border border-teal-100 px-3 py-1 rounded-md"
      >
        <div className="w-20">
          <img
            className="w-full"
            src={product.images[0].original}
            alt=""
          />
        </div>
        <div className="w-96 flex items-center gap-4">
          <div className="w-full">
            <h2 className="md:text-sm font-semibold leading-4 text-sm">
              {product.title}
            </h2>

            <p className="md:text-md text-teal-600 font-bold">{(product.price * selected.quantity).toFixed(2)}$</p>
          </div>

          <div className="text-lg w-9 flex flex-col justify-center text-center bg-teal-50 text-white mt-2">
            {/* Increment btn */}
            <button onClick={()=>dispatch({type:actionTypes.ADD_TO_CART,payload:product})} className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-t-full">
              +
            </button>
            {/* Count */}
            <p className="text-teal-600">
              {
              selected.quantity
            }
            </p>
            {/* Decrement btn */}
            <button onClick={()=>dispatch({type:actionTypes.DECREMENT_CART,payload:product})} className="px-3 py-1 md:py-0 md:px-2 text-2xl bg-teal-600 rounded-b-full">
              -
            </button>
          </div>
        </div>
        {/* Remove from cart */}
        <div className="flex justify-end w-12">
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.REMOVE_FROM_CART,
                payload: product,
              })
            }
            className="text-rose-400"
          >
            <AiOutlineDelete size={30} />
          </button>
        </div>
      </div>
       }
      </>
    );
};

export default SingleCart;