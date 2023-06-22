import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBell, BsCashCoin } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";

const Notifications = () => {
  const { user, dbUser } = useAllContext();

  const [notifications, setNotifications] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/notifications?email=${user?.email}`).then((res) => {
      setNotifications(res.data);
      setLoading(false)
    });
  }, [dbUser]);


  // update notification
  const handleSeenNotifications = (id) => {
    axios.patch(`/api/notifications/update?id=${id}`).then((res) => {
      console.log(res.data);
    });
  };

  // get unseen notifications
  const [unseen, setUnseen] = useState([]);
  useEffect(() => {
    axios.get(`/api/notifications/newNotification`).then((res) => {
      console.log(res.data);
      setUnseen(res.data);
    });
  }, [notifications]);
  console.log(notifications);
  return (
    <div
      className={`dropdown dropdown-left md:dropdown-bottom relative ${
        dbUser.type === "admin" || dbUser.type === "agent" || "hidden"
      }`}
    >
      <label tabIndex={0}>
        {" "}
        <BsBell className="text-2xl " />
        {unseen.length > 0 && ( <>
          {loading ? <span className="border rounded-full h-2 absolute w-2 right-0 top-0 border-dashed animate-spin border-rose-600"></span> : <span className="absolute right-0 top-0 bg-rose-600 h-2 w-2 rounded-full"></span>}
          </>
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content p-2 shadow bg-base-100 rounded-box w-96"
      >
        {notifications.map((noti) => (
          <li key={noti._id}>
            {noti.type === "order" &&
              (dbUser.type === "agent" ? (
                noti.agent === dbUser.email && (
                  <Link
                    className={`rounded-sm hover:bg-base-200 ${
                      noti.seen || "bg-base-300"
                    } w-full  px-2 inline-block`}
                    onClick={() => handleSeenNotifications(noti._id)}
                    href={`/agent/client/orders?email=${noti.email}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-teal-100 text-teal-600 p-2 rounded-full flex items-center justify-center">
                        <MdAddShoppingCart size={24} />
                      </span>
                      <div className={`py-1  `}>
                        New Order from{" "}
                        <span className="text-teal-600">
                          {noti.order.data.name}
                        </span>
                        . Address:{" "}
                        <span className="text-green-600">
                          {noti.order.location[0].name}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              ) : (
                <Link
                  className={`rounded-sm hover:bg-base-200 ${
                    noti.seen || "bg-base-300"
                  } w-full  px-2 inline-block`}
                  onClick={() => handleSeenNotifications(noti._id)}
                  href={`/agent/client/orders?email=${noti.email}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-600 p-2 rounded-full flex items-center justify-center">
                      <MdAddShoppingCart size={24} />
                    </span>
                    <div className={`py-1  `}>
                      New Order from{" "}
                      <span className="text-teal-600">
                        {noti.order.data.name}
                      </span>
                      . Address:{" "}
                      <span className="text-green-600">
                        {noti.order.location[0].name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            {noti.type === "send" &&
              (dbUser.type === "agent" ? (
                noti.agent === dbUser.email && (
                  <Link
                    className={`rounded-sm hover:bg-base-200 ${
                      noti.seen || "bg-base-300"
                    } w-full  px-2 inline-block`}
                    onClick={() => handleSeenNotifications(noti._id)}
                    href={`/admin/moneyrequest`}
                  >
                    {" "}
                    <div className="flex items-center gap-2">
                      <span className="bg-teal-100 text-teal-600 p-2 rounded-full flex items-center justify-center">
                        <BsCashCoin size={24} />
                      </span>{" "}
                      <div className={`py-1`}>
                        Cash In Request From{" "}
                        <span className="text-teal-600">{noti.name}</span>.
                        Amount :{" "}
                        <span className="text-green-600">{noti.amount}</span>{" "}
                      </div>
                    </div>
                  </Link>
                )
              ) : (
                <Link
                  className={`rounded-sm hover:bg-base-200 ${
                    noti.seen || "bg-base-300"
                  } w-full  px-2 inline-block`}
                  onClick={() => handleSeenNotifications(noti._id)}
                  href={`/admin/moneyrequest`}
                >
                  {" "}
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-600 p-2 rounded-full flex items-center justify-center">
                      <BsCashCoin size={24} />
                    </span>{" "}
                    <div className={`py-1`}>
                      Cash In Request From{" "}
                      <span className="text-teal-600">{noti.name}</span>. Amount
                      : <span className="text-green-600">{noti.amount}</span>{" "}
                    </div>
                  </div>
                </Link>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
