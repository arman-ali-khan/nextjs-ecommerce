import { useAllContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";

const StockProduct = ({ product }) => {
  const { dispatch, state, dbUser, user, setLoading, loading } =
    useAllContext();
console.log(product);
  // router
  const router = useRouter();

  const selected = state.stocks.find((cart) => cart._id === product._id);
  const added = selected?.quantity > 0;

  const products = state.stocks;

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  // add product to cart with enough money
  const handleAddToCart = () => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
    toast.success("Added to Cart");
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: actionTypes.DECREMENT_CART, payload: product });
    toast.success("Remove from cart");
  };

  const [id, setId] = useState("");
  return (
    <div className={`shadow-xl rounded-md relative`}>
      {/* stock */}
      <div>
        {product.stock > 0 ? (
          <div>
            <div className="absolute top-1 px-2 right-1 bg-green-500 rounded-full p-1 text-white text-xs">
              Stock {product.stock}
            </div>
            <div className="absolute top-1 px-2 left-1 bg-teal-500 font-bold rounded-full p-1 text-white text-xs">
              My Stock {product.quantity}
            </div>
          </div>
        ) : (
          <div className="absolute top-1 px-2 right-1 bg-red-500 rounded-full p-1 text-white text-xs">
            Out of Stock from Store
          </div>
        )}
      </div>
      <div>
        <label className={`h-60 bg-base-100 cursor-pointer`}>
          <img className="h-60 w-full object-cover" src={product?.images[0].original} alt="" />
        </label>

        <div className={`flex items-center justify-between px-3`}>
          <div>
            <div className="sm:flex flex-col sm:flex-row gap-0 md:!justify-between justify-start sm:gap-3 tooltip items-center ">
              <h4
                className="text-teal-600 flex gap-1 text-sm font-bold tooltip"
                data-tip={`Original Price ${product.oldPrice}৳ Discount Price ${product.price}৳`}
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
            </div>
          
            {/* product title */}
            <p
              className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold"
            >
              {product.title.slice(0, 20)}
              {parseInt(product.title.length) >= 19 && ".."}
            </p>
          </div>
        </div>
      </div>
      {added ? (
        <div
          className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  rounded text-white `}
        >
          {/* Derement btn */}
          <button
            onClick={() => handleRemoveFromCart()}
            className="px-3 py-2 bg-teal-600"
          >
            <MdOutlineRemove size={20} />
          </button>
          {/* Count */}
          <span className="text-teal-600 font-bold">{selected?.quantity}</span>
          {/* increment btn */}
          <button
            onClick={() => handleAddToCart()}
            className="px-3 py-2 bg-teal-600"
          >
            <MdOutlineAdd size={20} />
          </button>
        </div>
      ) : (
        product.stock > 0 && (
          <div
            onClick={handleAddToCart}
            className={`flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
          >
            <button>Sell Stock</button>
            <span className=" px-4 py-2">
              <RiSendPlaneLine size={20} />
            </span>
          </div>
        )
      )}
      <div></div>
    </div>
  );
};

export default StockProduct;
