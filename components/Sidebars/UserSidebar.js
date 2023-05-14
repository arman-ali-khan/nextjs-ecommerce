import React, { useState } from "react";
import LoginModal from "../Pages/Auth/LoginModal";
import RegisterModal from "../Pages/Auth/RegisterModal";

const UserSidebar = () => {
	const [login,setLogin] = useState(true)
  return (
   <>
   <div className="flex items-center md:hidden sticky top-0 justify-between bg-teal-600 rounded pl-4">
      <p className="text-white">Shopping Cart</p>
    <button  className="px-4 py-2 rounded bg-teal-500 text-white">Close</button>
    </div>
	{
		login ? <LoginModal login={login} setLogin={setLogin} />: <RegisterModal login={login} setLogin={setLogin} />
	}
   </>
  );
};

export default UserSidebar;
