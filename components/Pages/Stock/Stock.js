import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";

import StocksCard from "@/components/Stock/StocksCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Stock = () => {
  const { state, dbUser, user, setUpdateMoney, updateMoney } = useAllContext();

  // // next router
  const router = useRouter();

  //
  const products = state.stocks;

  // all product price
  let subTotal = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  const discount = 0;
  const delivery = 0;
  const service = 0;

  const total = subTotal - discount + delivery + service;

  let totalPrice = products.reduce(function (prev, current) {
    return prev + +current.price * current.quantity;
  }, 0);

  const [location, setLocation] = useState([]);

  // get token from cookie
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  // phone number
  const number = dbUser?.data?.phone;

  // loading while checkout
  const [loading, setLoading] = useState(false);

  // get date

  const date = new Date();

  // update stocks
  const [update, setUpdate] = useState(false);

  // get old stocks
  // loading
  const [oldStockLoad, setOldStockLoad] = useState(true);

  const [oldStocks, setOldStocks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/stock?email=${user.email}`)
      .then((res) => {
        setOldStocks(res.data);
        setOldStockLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setOldStockLoad(false);
      });
  }, [update, total]);

  console.log(oldStocks);

  const handleSubmit = (data) => {
    setLoading(true);
    const stockData = {
      products: state.stocks,
      agent: dbUser.agent,
      date: date,
      email: user.email,
      total: total,
      id: uuidv4(),
    };
    axios
      .post(`/api/stock/create`, stockData)
      .then((res) => {
        toast.success("Stock created successfully");
        setLoading(false);
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <PrivateRoutes>
      <div className="flex flex-col-reverse md:flex-row overflow-hidden">
        {/* <div className="mt-16 flex-col w-full md:p-6 px-1  divide-y sm:p-10 divide-gray-300 bg-gray-50 text-gray-800">
          <div>
            <h2 className="md:text-2xl text-xl font-bold">Your old stocks</h2>
          </div>
          <div>
            {oldStocks?.map((stock) => (
              <StockCard stock={stock} key={stock._id} />
            ))}
          </div>
        </div> */}
        {/* Cart */}
        <div className="flex px-1 w-full md:w-2/3 md:my-12 flex-col mx-auto md:p-6  space-y-6 divide-y sm:p-10 divide-gray-300 bg-gray-50 text-gray-800">
          <h2 className="md:text-2xl text-xl font-bold">Stock items</h2>
          <ul className="grid md:grid-cols-4 grid-cols-2 gap-1 pt-4 space-y-2">
            {products?.map((product, i) => (
              <StocksCard key={i} product={product} />
            ))}
          </ul>
          <div className="pt-4 space-y-2">
            <div></div>
          </div>
          <div className="pt-4 space-y-2">
            <div className="space-y-6 my-2">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">৳{total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleSubmit()}
                disabled={
                  state.stocks.length < 1 || dbUser.balance < totalPrice
                }
                type="submit"
                className="w-full py-2 font-semibold border rounded bg-teal-600 text-gray-50 disabled:bg-slate-400 border-teal-600"
              >
                {loading ? "Sending to stock..." : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoutes>
  );
};

export default Stock;
