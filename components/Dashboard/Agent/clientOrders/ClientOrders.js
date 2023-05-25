import UserLayout from "@/Layout/UserLayout";
import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiCheckCircle, BiTrash } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";

const ClientOrders = () => {
  const { user } = useAllContext();
  // get all users orders
  const [clientsOrders, setClientsOrders] = useState([]);

  // get email from query string
  const router = useRouter();
  const { email } = router.query;

  // loading
  const [loading, setLoading] = useState(true);

  // delete update orders
  const [updateOrders, setUpdateOrders] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/agent/client/orders?client=${email}`)
      .then((res) => {
        setClientsOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [email, updateOrders]);

  // delete order
  const handleDeleteOrder = (id) => {
    axios
      .delete(`/api/order/delete?id=${id}&email=${user.email}`)
      .then((res) => {
        toast.success("Order deleted successfully");
        setUpdateOrders(!updateOrders);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // status
  const [status, setStatus] = useState("");

  // update order status

  // update loading
  const [updateLoading,setUpdateLoading] = useState(false);


  const handleUpdateOrderStatus = (id) => {
    setUpdateLoading(true)
    axios
      .patch(`/api/order/update?id=${id}`, { status })
      .then((response) => {
        toast.success("Order status updated successfully");
        setUpdateOrders(!updateOrders);
        setUpdateLoading(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setUpdateLoading(false)
      });
  };

  return (
    <div>
      <div>
        <UserLayout title={"Clients"}>
          <div className="overflow-x-auto w-full my-4 mb-12">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Order Time</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {loading ? (
                  <div className="flex justify-center w-full">
                    <div className="border-2 h-12 w-12 rounded-full border-teal-800 border-dashed animate-spin"></div>
                  </div>
                ) : (
                  clientsOrders?.map((order, i) => (
                    <tr key={order._id}>
                      <th>{i + 1}</th>
                      <td>{moment(order.date).fromNow()}</td>
                      <td
                        className={`${
                          order.status === "Packaging" && "bg-yellow-400 rounded-full" || order.status === "Out for delivery" && "bg-blue-400 rounded-full" || order.status === "Processing" && "bg-teal-100 rounded-full" || order.status === "Delivered" && "bg-teal-600 rounded-full"
                        }`}
                      >
                        {/* Update order status */}
                        <span className="flex items-center gap-3">
                          <select
                            defaultValue={order.status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered select-sm"
                          >
                            <option value="Processing" key="1">
                              Processing
                            </option>
                            <option value="Packaging" key="1">
                              Packaging
                            </option>
                            <option value="Out for delivery" key="1">
                              Out for delivery
                            </option>
                            <option value="Delivered" key="1">
                              Delivered
                            </option>
                          </select>{
                            updateLoading ?
                            <div className="border-2 h-9 w-9 rounded-full border-teal-800 border-dashed animate-spin"></div>
                            :
                              <button
                            className="text-success text-4xl hover:bg-black rounded-full p-0 m-0"
                            onClick={() => handleUpdateOrderStatus(order.id)}
                          >
                            <BiCheckCircle />
                          </button>
                          }
                        
                        </span>
                      </td>
                      <td className=" items-center font-bold">
                        <span className="flex items-center">
                          <TbCurrencyTaka className="font-bold" size={20} />{" "}
                          {order?.total.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <Link href={`/order/${order.id}`}>
                          <button className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">
                            Details
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200"
                        >
                          <BiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </UserLayout>
      </div>
    </div>
  );
};

export default ClientOrders;
