import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import SellStock from "./SellStock";
const MyStocks = () => {
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
  }, [update,total]);



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
        setUpdate(!update)
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
        <div className="flex-col w-full md:p-6 px-1 divide-y sm:p-10 divide-gray-300 bg-base-100  text-gray-800">
         {
          oldStockLoad ? <div>
            Loading...
          </div>
          :
             <div className="mb-12">
            { oldStocks.length ?
            oldStocks?.map((stock) => (
              <SellStock update={update} setUpdate={setUpdate} stock={stock} key={stock._id} />
            ))
          :
          <p className="text-teal-600"> You have no stock</p>}
          </div>
         }
       
        </div>
      </div>
    </PrivateRoutes>
  );
};

export default MyStocks;
