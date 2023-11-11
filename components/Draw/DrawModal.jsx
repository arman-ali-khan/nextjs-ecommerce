import { useAllContext } from "@/context/ContextProvider";
import axios from "axios";
import crypto from "crypto";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const DrawModal = ({ id, setId, update, setUpdate }) => {
  // router
  const router = useRouter();
  // context
  const { user, dbUser,updateMoney,setUpdateMoney } = useAllContext();
  // loading
  const [loading, setLoading] = useState(false);
  // get one draw
  const [getDraw, setGetDraw] = useState({});
  console.log(dbUser, getDraw);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get(`/api/draw/getOne?id=${id}`).then((res) => {
        setGetDraw(res.data);
        setLoading(false);
       
      });
    }
  }, [id]);

  // ticket quantity
  const quantity = getDraw.stock;
  // make ticket number
  let [ticket, setTicket] = useState([]);
  // count
  const [count, setCount] = useState("1");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // creating loading
  const [ticketLoading, setTicketLoading] = useState(false);
  // handle ticket
  const handleTicket = (data) => {
    setTicketLoading(true);
    if (count > 0) {
      const ticketData = {
        ticketList: ticket?.slice(0, parseInt(count)),
        quantity: data?.ticket,
        email: user?.email,
        id: getDraw?.id,
        price: getDraw?.price,
        draw: getDraw?.id,
        date: Date(),
      };
      if (user?.email) {
        axios
          .post(`/api/draw/createticket?email=${user?.email}`, ticketData)
          .then((res) => {
            toast.success(res.data.message);
            setUpdate(!update);
            setTicketLoading(false);
            setUpdateMoney(!updateMoney)
            router.push("/user/ticket");
          })
          .catch((err) => {
            toast.error("Try Again");
            setTicketLoading(false);
          });
      }
    }
  };

  // increase ticket
  useEffect(() => {
    if (count?.length) {
      const randomString = crypto.randomBytes(8).toString("hex");
      setTicket([...ticket, randomString]);
    }
  }, [count]);

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setId("")}
            className="px-3 py-1 rounded-full bg-teal-600 cursor-pointer text-white right-0 absolute top-0"
            htmlFor="my_modal_7"
          >
            X
          </label>
          <h3 className="text-lg font-bold my-2">
            How many ticket you want to buy from{" "}
            {loading ? "..." : getDraw?.title}?
          </h3>
          <form onSubmit={handleSubmit(handleTicket)}>
            <input
              defaultValue={"1"}
              placeholder="0"
              onChangeCapture={(e) => setCount(e.target.value)}
              {...register("ticket", { required: true })}
              className="input input-bordered w-full"
              type="number"
            />
            { user?.email ?
            dbUser.balance < parseInt(getDraw.price) ? (
              <div className="flex justify-center gap-1 text-center items-center w-full">
                No Enough Balance Please
                <Link
                  href={"@money/cashin"}
                  className="px-4 disabled:bg-teal-100 disabled:text-black py-2 rounded bg-teal-600 text-white my-2"
                >
                  Cash in
                </Link>
              </div>
            ) : (
              <button
                disabled={
                  parseInt(quantity) < count ||
                  count < 1 ||
                  dbUser.balance < parseInt(getDraw.price)
                  ||
                  !getDraw._id
                }
                className="px-4 disabled:bg-teal-100 disabled:text-black py-2 rounded bg-teal-600 text-white my-2 mx-auto w-full"
              >
                {!getDraw._id
                  ? "Please Wait"
                  : ticketLoading
                  ? "Buying..."
                  : "Buy Now"}
              </button>
            )
          :
          <Link
          href={"/account/login"}
          className="px-4 disabled:bg-teal-100 inline-block w-full text-center disabled:text-black py-2 rounded bg-teal-600 text-white my-2"
        >
          Login in
        </Link>
          }
          </form>
        </div>
        <label
          onClick={() => setId("")}
          className="modal-backdrop"
          htmlFor="my_modal_7"
        ></label>
      </div>
    </>
  );
};

export default DrawModal;
