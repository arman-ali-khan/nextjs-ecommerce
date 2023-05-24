import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import SingleCart from "./SingleCart";
import Link from "next/link";

const CartSidebar = ({ showCart, setShowCart }) => {
  const { state, dispatch, user, dbUser } = useAllContext();
  const products = state.cart;

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  return (
    <div
      className={`h-full relative ${
        products.length
          ? "md:overflow-y-scroll pb-56 md:pb-0"
          : "overflow-hidden"
      }  section`}
    >
      <div className="flex items-center sticky top-0 justify-between my-2 bg-teal-600 rounded pl-4">
        <p className="text-white">Shopping Cart</p>
        <button
          onClick={() => setShowCart(false)}
          className="px-4 py-2 rounded bg-teal-500 text-white"
        >
          Close
        </button>
      </div>
      {products.length < 1 ? (
        <div className=" h-full flex-grow  scrollbar-hide w-full max-h-full">
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center w-20 h-20 rounded-full bg-emerald-100">
                <span className="text-emerald-600 text-4xl block">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                  </svg>
                </span>
              </div>
              <h3 className=" font-semibold text-gray-700 text-lg pt-5">
                Your cart is empty
              </h3>
              <p className="px-12 text-center text-sm text-gray-500 pt-2">
                No items added in your cart. Please add product to your cart
                list.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-auto h-full">
          {products
            .sort((a, b) => a.id - b.id)
            .map((product, i) => (
              <SingleCart product={product} key={i} />
            ))}
        </div>
      )}

      {user?.uid ? (
        dbUser.balance < totalPrice ? (
          <button
            className={`sticky bottom-16 md:bottom-12 w-full left-0 bg-gray-300 text-black rounded-full px-4 py-1 my-3 flex items-center justify-between ${
              (showCart && products.length) || "hidden"
            }`}
          >
            Not enough balance({dbUser.balance})
            <span className="bg-white px-4 text-teal-600 font-bold rounded-full text-lg py-2">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        ) : (
          <button
            className={`sticky bottom-16 md:bottom-12 w-full left-0  flex items-center flex-col justify-between ${
              (showCart && products.length) || "hidden"
            }`}
          >
            <Link className="w-full" href={"/stock"}>
              <button
                className={`sticky bottom-16 hover:bg-blue-700 md:bottom-12 w-full left-0 bg-blue-600 text-white rounded-full px-4 py-1 mb-1 flex items-center justify-between gap-1 `}
              >
                Buy Stock
                <span className="bg-white px-2 md:px-4 text-blue-600 font-bold rounded-full md:text-lg py-1 md:py-2">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </Link>
            <Link className="w-full" href={"/order"}>
              <button
                className={`sticky bottom-16 hover:bg-teal-700 md:bottom-12 w-full left-0 bg-teal-600 text-white rounded-full gap-1 px-4 py-1 mb-1 flex items-center justify-between `}
              >
                Checkout
                <span className="bg-white px-2 md:px-4 text-teal-600 font-bold rounded-full md:text-lg py-1 md:py-2">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </Link>
          </button>
        )
      ) : (
        <>
          <Link href={"/account/login?next=stock"}>
            <button
              className={`sticky bottom-44 md:bottom-12 w-full left-0 bg-teal-600 text-white rounded-full px-4 py-1 my-3 flex items-center justify-between ${
                (showCart && products.length) || "hidden"
              }`}
            >
              Login before Checkout
              <span className="bg-white px-4 text-teal-600 font-bold rounded-full text-lg py-2">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </Link>
          <Link href={"/account/login?next=order"}>
            <button
              className={`sticky bottom-16 md:bottom-12 w-full left-0 bg-teal-600 text-white rounded-full px-4 py-1 my-3 flex items-center justify-between ${
                (showCart && products.length) || "hidden"
              }`}
            >
              Login before Checkout
              <span className="bg-white px-4 text-teal-600 font-bold rounded-full text-lg py-2">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
