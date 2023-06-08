import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import { useState } from "react";
import { CheckmarkIcon, toast } from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "rsuite";

const StocksCard = ({ product }) => {
 
  const { dispatch, state, dbUser, user, setLoading, loading } =
    useAllContext();

  const selected = state.stocks?.find((stock) => stock?.id === product?.id);

  const added = selected?.quantity > 0;

  const products = state.stocks;

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  // add product to cart with enough money
  const handleAddToCart = () => {
    dispatch({ type: actionTypes.ADD_TO_STOCK, payload: product });
    toast.success("Added to Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: actionTypes.DECREMENT_STOCK, payload: product });
    toast.success("Remove one product");
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
              Out of Stock
            </div>
          )}
        </div>
        <div>
          <label
            onClick={() => setId(product.id)}
            className={`h-60 bg-base-100 cursor-pointer`}
          >
            {product?.images && (
              <img
                className="h-60 w-full object-cover"
                src={product?.images[0].original}
                alt=""
              />
            )}
          </label>

          <div className={`flex items-center justify-between px-3`}>
            <div>
              <div className="sm:flex flex-col sm:flex-row gap-0 md:!justify-between justify-start sm:gap-3 tooltip items-center ">
                <h4
                  className="text-orange-600 items-center flex gap-1 text-sm font-bold tooltip"
                  data-tip={`Buy Price ${product?.oldPrice}৳ Sell Price ${product?.price}৳`}
                >
                  ৳{product?.oldPrice}
                  <FiArrowRight />
                  <span className="text-teal-500 ">৳{product?.price}</span>
                </h4>
                <div>
                  <span className="flex items-center">
                    {[...Array(product?.rating).keys()].map((rate, i) => (
                      <span
                        data-tip={`${product?.rating} Star Rating`}
                        className="text-yellow-500 tooltip text-xs md:text-base"
                        key={i}
                      >
                        <BsStarFill />
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              <br />
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
            {/* Derement btn */}
            <button
              onClick={() => handleRemoveFromCart()}
              className="px-3 w-full flex items-center justify-between py-2 bg-teal-100 text-teal-600"
            >
             Remove <CheckmarkIcon />
            </button>
           
           
          </div>
        ) : (
          product?.stock > 0 && (
            <div
              onClick={handleAddToCart}
              className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
            >
              <button>Buy Stock</button>
              <span className=" px-4 py-2">
                <MdOutlineAdd size={20} />
              </span>
            </div>
          )
        )}

        <div></div>
      </div>
      {id && <Modal id={id} setId={setId} />}
    </>
  );
};

export default StocksCard;
