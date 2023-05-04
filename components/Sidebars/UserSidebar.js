import React, { useState } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const UserSidebar = () => {
	const [login,setLogin] = useState(true)
  return (
   <>
   <div className="flex items-center md:hidden sticky top-0 justify-between bg_primary rounded pl-4">
      <p className="text-white">Shopping Cart</p>
    <button  className="px-4 py-2 rounded bg-teal-500 text-white">Close</button>
    </div>
	{
		login ? <Login login={login} setLogin={setLogin} />: <Register login={login} setLogin={setLogin} />
	}
   </>
  );
};

export default UserSidebar;
