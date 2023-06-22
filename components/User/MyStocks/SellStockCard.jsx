import { useAllContext } from "@/context/ContextProvider";
import actionTypes from "@/state/ProductState/actionTypes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";

const SellStockCard = ({ product, stockId, update, setUpdate,quantity }) => {
  const {
    dispatch,
    state,
    dbUser,
    user,
    setLoading,
    loading,
    setUpdateMoney,
    updateMoney,
  } = useAllContext();

  // router
  const router = useRouter();

  const selected = state.stocks.find((cart) => cart._id === product._id);
  const added = selected?.quantity > 0;

  const products = state.stocks;

  // update stocks
  const [stockUpdate, setStockUpdate] = useState(false);
  // loading when sell stock
  const [loadingStock, setLoadingStock] = useState(false);

  // all product price
  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  // stock current price
  const [currentProduct, setCurrentProduct] = useState({});
  const currentPrice = parseFloat(currentProduct.price) - 1;
  useEffect(() => {
    axios.get(`/api/stock/${product.id}`).then((res) => {
      setCurrentProduct(res.data);
    });
  }, [stockUpdate,currentPrice, loadingStock]);

  // add product to cart with enough money
  const handleAddToCart = () => {
    dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
    toast.success("Added to Cart");
  };

  const handleSellStock = (product) => {
    setLoadingStock(true);
    axios
      .delete(
        `/api/stock/sellStock?id=${product.id}&email=${user.email}&stockId=${stockId}&quantity=${quantity}`
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Stock Sell Successfull");
        setUpdate(!update);
        setLoadingStock(false);
        setUpdateMoney(!updateMoney)
      });
  };

  return (
    <div className={`shadow-xl rounded-md relative`}>
      {/* stock */}
      <div>
        {product.stock > 0 ? (
          <div>
            <div className="absolute top-1 px-2 right-1 bg-green-500 rounded-full p-1 text-white text-xs">
             In Stock 
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
          <Image  className="h-60 w-full object-cover" src={product?.images[0].original} width={200} height={240} alt=""/>
        
        </label>

        <div className={`flex items-center justify-between px-3`}>
          <div>
            <div className="sm:flex flex-col sm:flex-row gap-0 md:!justify-between justify-start sm:gap-3 tooltip items-center ">
              <h4
                className="text-teal-600 flex gap-1 text-sm font-bold tooltip"
                data-tip={`Original Price ${product.oldPrice}৳ Discount Price ${product.price}৳`}
              >
                ৳{product.price}
                <span className="text-teal-600 flex gap-1 text-sm font-bold tooltip">
                  {product.price > currentPrice ? "-" : "+"} ৳{currentPrice}
                </span>
                =
                <span
                  className={`${
                    product.price > currentPrice
                      ? "text-rose-600"
                      : "text-teal-600"
                  } flex gap-1 text-sm font-bold tooltip`}
                >
                  ৳{currentPrice - product.price}
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
            <p className="md:text-base inline-block leading-4 text-teal-600 text-sm font-bold">
              {product.title.slice(0, 20)}
              {parseInt(product.title.length) >= 19 && ".."}
            </p>
          </div>
        </div>
      </div>
      {product.stock > 0 && (
        <div
          onClick={() => handleSellStock(product)}
          className={`${currentPrice || 'hidden'} flex cursor-pointer select-none justify-between items-center bg-gray-100 duration-300 border border-teal-600  pl-4 hover:bg-teal-600 rounded hover:text-white text-teal-600`}
        >
          <button >{loadingStock ? "Selling..." : "Sell Stock"}</button>
          <span className=" px-4 py-2">
            <RiSendPlaneLine size={20} />
          </span>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default SellStockCard;
