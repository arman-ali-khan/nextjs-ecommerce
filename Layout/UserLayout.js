import AdminNavbar from "@/components/Pages/Shared/AdminNav/AdminNavbar";
import AdminSideNav from "@/components/Pages/Shared/AdminNav/Navtype/AdminSideNav";
import AgentSideNav from "@/components/Pages/Shared/AdminNav/Navtype/AgentSideNav";
import UserSideNav from "@/components/Pages/Shared/AdminNav/Navtype/UserSideNav";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import { useAllContext } from "@/context/ContextProvider";
import Head from "next/head";
import { useState } from "react";
function UserLayout({ children, title, description, thumb }) {
  const { user, dbUser, loading } = useAllContext();

  const [showMony, setShowMoney] = useState(false);
  const [moneyClass, setMoneyClass] = useState("");
  const [moneyLoading, setMoneyLoading] = useState(false);

  const handleMoneyShow = () => {
    // money show loading
    setMoneyLoading(true);
    const timer = setTimeout(() => {
      setMoneyClass("!-left-64");
    }, 2000);
    return () => {
      clearTimeout(timer);
      setMoneyLoading(false);
    };
  };

  return (
    <PrivateRoutes>
      <AdminNavbar />
      <Head>
        <title>{title || `Profile`}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumb} />
      </Head>
      <div className="container mx-auto  py-3 relative overflow-hidden">
        <div className=" md:-bottom-20  -bottom-8 relative">
          <div className="w-full mb-20  absolute -z-10  md:h-44 h-image flex-shrink-0 my-5  bg-teal-500 rounded-lg  shadow-lg flex justify-center"></div>
          <div className="md:h-52 my-6 h-image bg-teal-600 rounded-md flex justify-center w-full">
          {user?.photo ? (
             <img
              className="md:w-44 md:h-44 h-20 flex justify-center mx-auto w-20  object-cover  rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src={dbUser?.photo}
              alt=""
            />
          
          ) : (
             <img
              className="md:w-44  flex justify-center mx-auto w-20  object-cover  rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src="http://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
              alt=""
            />
          )}
          </div>
          <div className="w-72 mx-auto text-center bg-teal-100   overflow-hidden relative  px-6 rounded-md my-3 py-4">
            <h2 className="text-xl md:text-2xl font-bold">{dbUser?.name}({dbUser.type})</h2>
            <p>{dbUser?.phone}</p>
            <p>{dbUser?.email}</p>
            <div className={`mx-auto flex  justify-center relative`}>
              <p
                className={`${dbUser?.balance < 20 ? 'bg-rose-300':'bg-blue-400 text-white px-2 py-1 rounded-full'}`}
                onClickCapture={() => setMoneyLoading(false)}
                onClick={() => setMoneyClass("")}
              >
                Your balance is <span className="font-bold">${(dbUser?.balance)}</span>
              </p>
             
              <button
                onClickCapture={() => setMoneyLoading(true)}
                onClick={handleMoneyShow}
                className={`absolute text-white py-2 inline-block bg-teal-600 rounded-full top-0 duration-300 w-full  ${
                  moneyClass === "" ? "left-0" : "-left-96"
                }`}
              >
                {moneyLoading ? (
                  <span className="h-3 px-3 py-2 rounded-full border border-teal-600 animate-pulse bg-teal-600 border-dashed">
                    Money Loading...
                  </span>
                ) : (
                  "See your money"
                )}
              </button>
              
            </div>
            
          </div>
        </div>
      
        <div>
          <h2 className="text-2xl my-3 md:my-6"> User Dashboard</h2>
        </div>
        <div className="md:flex gap-3 ">
          <div className="md:w-64 w-full hidden md:block ">
          {
            dbUser.type === 'admin' && <AdminSideNav />
          }
          {
            dbUser.type === 'agent' && <AgentSideNav />
          }
          {
            dbUser.type === 'user' && <UserSideNav />
          }
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </PrivateRoutes>
  );
}
export default UserLayout;
