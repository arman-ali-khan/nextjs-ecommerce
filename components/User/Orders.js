import UserLayout from "@/Layout/UserLayout";
import { useAllContext } from "@/context/ContextProvider";
import useToken from "@/hooks/useToken";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { HiArrowPath } from "react-icons/hi2";
import { TbCurrencyTaka, TbMoneybag, TbTruckDelivery } from "react-icons/tb";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const UserOrders = () => {
  // get context
  const { user, dbUser } = useAllContext();

  // get token from cookie
  const [token] = useToken(user?.email);

  const [orders, setOrders] = useState([]);



  // loading
  const [loading, setLoading] = useState(true);

  // get orders from mongodb
  useEffect(() => {
    axios
      .get(`/api/order?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
           .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dbUser, token]);

  return (
    <PrivateRoutes>
      <UserLayout title={"Orders"}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex justify-center flex-col items-center">
              <div
                className="spinner-border border-dashed border-teal-600 animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              ></div>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                {orders?.map((order, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{moment(order.date).fromNow()}</td>
                    <td>
                      <span className="flex items-center gap-2 ">
                        <span
                          className={` ${
                            (order?.status === "Out for delivery" &&
                              "text-blue-600 bg-blue-100") ||
                            (order?.status === "Delivered" &&
                              "text-success bg-success bg-opacity-20")||
                            (order?.status === "Processing" &&
                              "text-error bg-error bg-opacity-20 ")||
                            (order?.status === "Packaging" &&
                              "text-info bg-info bg-opacity-20 ")
                          } p-2 rounded-full`}
                        >
                          {(order?.status === "Out for delivery" && (
                            <TbTruckDelivery size={20} />
                          )) ||
                            (order?.status === "Delivered" && (
                              <BsCartCheck size={20} />
                            ))||
                            (order?.status === "Processing" && (
                              <HiArrowPath size={20} />
                            ))||
                            (order?.status === "Packaging" && (
                              <TbMoneybag size={20} />
                            ))
                            
                            }
                        </span>
                        {order?.status}
                      </span>
                    </td>
                    <td className="flex items-center font-bold">
                      {" "}
                      <TbCurrencyTaka className="font-bold" size={20} />{" "}
                      {(order?.total).toFixed(2)}
                    </td>
                    <td>
                      <span className="flex items-center">
                        <Link href={`/order/${order.id}`}>
                          <button className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">
                            Details
                          </button>
                        </Link>
                        {/* delete btn */}
                        <label
                          htmlFor="my-modal-4"
                          className="bg-rose-100 inline-block text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200"
                        >
                          <BiTrash />
                        </label>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal dbUser={dbUser} />
          </div>
        )}
      </UserLayout>
    </PrivateRoutes>
  );
};

export default UserOrders;

const Modal = ({ dbUser }) => {
    // get agent 
    // get agent
    const [agent, setAgent] = useState({});

    useEffect(() => {
      axios
        .get(`/api/money/getagent?email=${dbUser.agent}`)
        .then((res) => {
          setAgent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [dbUser]);
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Do you want to cancel your order?</h3>
          <p className="py-4">
            If you really want to cancel your order please connect your agent,{" "}
            <span className="text-teal-600">{agent?.name}</span>, by Phone <span className="text-teal-600"><a href={`call:${agent?.phone}`}>{agent?.phone}</a></span>, Email <span className="text-teal-600"><a href={`mailto:${agent?.email}`}>{agent?.email}</a></span> 
          </p>
        </label>
      </label>
    </>
  );
};
