import moment from "moment";
import Link from "next/link";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiSendPlaneLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

const MoneyOrder = () => {
  return (
    <div>
      <div className="overflow-x-auto w-full my-4 mb-12">
        <div className="flex items-center">
        {/* // Send money */}
          <Link className="bg-teal-600 text-white px-4 py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/send"}> <RiSendPlaneLine size={20} /> Send Money</Link>
          {/* Cashout */}
          <Link className="bg-teal-600 text-white px-4 py-2 rounded mr-2 hover:bg-teal-700 duration-300 flex items-center gap-2" href={"/@money/cashout"}> <GiTakeMyMoney size={20} /> Cash Out</Link>
        </div>
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
            <tr>
              <th>2</th>
              <td>a day ago</td>
              <td>status</td>
              <td className="flex items-center font-bold">
                {" "}
                <TbCurrencyTaka className="font-bold" size={20} /> Order
              </td>
              <td>
                <span className="flex items-center">
                  <Link href={`/order`}>
                    <button className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">
                      Details
                    </button>
                  </Link>
                  {/* delete btn */}
                  <label className="bg-rose-100 inline-block text-rose-600 px-2 py-1 rounded-full hover:bg-rose-200">
                    <BiTrash />
                  </label>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoneyOrder;
