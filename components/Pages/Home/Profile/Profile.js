import Layout from "@/Layout/Layout";
import React, { useEffect, useState } from "react";
function Profile() {
  const [showMony, setShowMoney] = useState(false);
  const [moneClass, setMoneyClass] = useState("");
  const [moneyLoading, setMoneyLoading] = useState(false);

  const handleMoneyShow = () =>{
      setMoneyLoading(true);
    const timer = setTimeout(() => {
        setMoneyClass("-translate-x-64");
      }, 5000);
      return () => {
          clearTimeout(timer)
          setMoneyLoading(false);
      };
  }

  return (
    <Layout title={"User"}>
      <div className="my-16 container mx-auto">
        <div className="w-full relative h-44 bg-blue-200 flex justify-center">
          <div className="absolute md:-bottom-16 -bottom-8">
            <img
              className="md:w-44 mx-auto w-20 md:h-44 h-20 rounded-full overflow-hidden bg-teal-100 border-2 border-teal-600"
              src="http://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
              alt=""
            />
            <div className="w-full overflow-hidden bg-teal-100 px-12 py-4">
              <h2 className="text-xl md:text-2xl font-bold">Arman Ali Khan</h2>
              <div className={`mx-auto flex justify-center relative`}>
                <p
                  onClickCapture={() => setMoneyLoading(false)}
                  onClick={() => setMoneyClass("")}
                >
                  Your balence is $2345
                </p>
                <button
                  onClickCapture={() => setMoneyLoading(true)}
                  onClick={handleMoneyShow}
                  className={`absolute left-0 text-white bg-teal-600 h-6 rounded-full top-0 duration-300 w-full ${moneClass}`}
                >
                  {moneyLoading ? (
                    <span className="h-3 px-3  rounded-full border border_primary animate-pulse bg-teal-500 border-dashed">Money Loading...</span>
                  ) : (
                    "See your money"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 my-12 md:my-20 gap-2">
          <div>
            <div className="flex items-center md:pt-0 py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6529 11H13.1552V6H17.1489C17.748 6 18.1474 5.6 18.1474 5C18.1474 4.4 17.748 4 17.1489 4H13.1552V1C13.1552 0.4 12.7558 0 12.1568 0C11.5577 0 11.1583 0.4 11.1583 1V4H9.66068C7.16459 4 5.16772 6 5.16772 8.5C5.16772 11 7.16459 13 9.66068 13H11.1583V18H6.16616C5.5671 18 5.16772 18.4 5.16772 19C5.16772 19.6 5.5671 20 6.16616 20H11.1583V23C11.1583 23.6 11.5577 24 12.1568 24C12.7558 24 13.1552 23.6 13.1552 23V20H14.6529C17.1489 20 19.1458 18 19.1458 15.5C19.1458 13 17.1489 11 14.6529 11ZM9.66068 11C8.26287 11 7.16459 9.9 7.16459 8.5C7.16459 7.1 8.26287 6 9.66068 6H11.1583V11H9.66068ZM13.1552 18H14.6529C16.0507 18 17.1489 16.9 17.1489 15.5C17.1489 14.1 16.0507 13 14.6529 13H13.1552V18Z"
                    fill="#047857"
                  />
                </svg>
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  $9745
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center md:pt-0 py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6529 11H13.1552V6H17.1489C17.748 6 18.1474 5.6 18.1474 5C18.1474 4.4 17.748 4 17.1489 4H13.1552V1C13.1552 0.4 12.7558 0 12.1568 0C11.5577 0 11.1583 0.4 11.1583 1V4H9.66068C7.16459 4 5.16772 6 5.16772 8.5C5.16772 11 7.16459 13 9.66068 13H11.1583V18H6.16616C5.5671 18 5.16772 18.4 5.16772 19C5.16772 19.6 5.5671 20 6.16616 20H11.1583V23C11.1583 23.6 11.5577 24 12.1568 24C12.7558 24 13.1552 23.6 13.1552 23V20H14.6529C17.1489 20 19.1458 18 19.1458 15.5C19.1458 13 17.1489 11 14.6529 11ZM9.66068 11C8.26287 11 7.16459 9.9 7.16459 8.5C7.16459 7.1 8.26287 6 9.66068 6H11.1583V11H9.66068ZM13.1552 18H14.6529C16.0507 18 17.1489 16.9 17.1489 15.5C17.1489 14.1 16.0507 13 14.6529 13H13.1552V18Z"
                    fill="#047857"
                  />
                </svg>
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  $9745
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center md:pt-0 py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6529 11H13.1552V6H17.1489C17.748 6 18.1474 5.6 18.1474 5C18.1474 4.4 17.748 4 17.1489 4H13.1552V1C13.1552 0.4 12.7558 0 12.1568 0C11.5577 0 11.1583 0.4 11.1583 1V4H9.66068C7.16459 4 5.16772 6 5.16772 8.5C5.16772 11 7.16459 13 9.66068 13H11.1583V18H6.16616C5.5671 18 5.16772 18.4 5.16772 19C5.16772 19.6 5.5671 20 6.16616 20H11.1583V23C11.1583 23.6 11.5577 24 12.1568 24C12.7558 24 13.1552 23.6 13.1552 23V20H14.6529C17.1489 20 19.1458 18 19.1458 15.5C19.1458 13 17.1489 11 14.6529 11ZM9.66068 11C8.26287 11 7.16459 9.9 7.16459 8.5C7.16459 7.1 8.26287 6 9.66068 6H11.1583V11H9.66068ZM13.1552 18H14.6529C16.0507 18 17.1489 16.9 17.1489 15.5C17.1489 14.1 16.0507 13 14.6529 13H13.1552V18Z"
                    fill="#047857"
                  />
                </svg>
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  $9745
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center md:pt-0 py-4 pl-10 bg-teal-100 rounded-md ">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6529 11H13.1552V6H17.1489C17.748 6 18.1474 5.6 18.1474 5C18.1474 4.4 17.748 4 17.1489 4H13.1552V1C13.1552 0.4 12.7558 0 12.1568 0C11.5577 0 11.1583 0.4 11.1583 1V4H9.66068C7.16459 4 5.16772 6 5.16772 8.5C5.16772 11 7.16459 13 9.66068 13H11.1583V18H6.16616C5.5671 18 5.16772 18.4 5.16772 19C5.16772 19.6 5.5671 20 6.16616 20H11.1583V23C11.1583 23.6 11.5577 24 12.1568 24C12.7558 24 13.1552 23.6 13.1552 23V20H14.6529C17.1489 20 19.1458 18 19.1458 15.5C19.1458 13 17.1489 11 14.6529 11ZM9.66068 11C8.26287 11 7.16459 9.9 7.16459 8.5C7.16459 7.1 8.26287 6 9.66068 6H11.1583V11H9.66068ZM13.1552 18H14.6529C16.0507 18 17.1489 16.9 17.1489 15.5C17.1489 14.1 16.0507 13 14.6529 13H13.1552V18Z"
                    fill="#047857"
                  />
                </svg>
              </div>
              <div className="pl-4 w-full">
                <p className="w-11 text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
                  $9745
                </p>
                <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                  Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Profile;
