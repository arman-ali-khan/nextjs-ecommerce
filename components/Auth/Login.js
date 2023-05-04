import React from 'react';

const Login = ({login,setLogin}) => {
    return (
        <div className="h-full relative bg-white border-l md:rounded-md md:border-teal-400 md:hover:border_primary duration-200 md:border-2 md:hover:border-4">
		
      <div className="flex justify-center items-center h-full gap-2">
        
        <div className="flex flex-col gap-3">
        <div className='flex justify-between'>
            <span className={`px-4 py-2 rounded-l text-black border border_primary w-full`}>Login</span>
            <span onClick={()=>setLogin(!login)}  className={`px-4 py-2 cursor-pointer select-none rounded-r bg_primary border border_primary  text-white w-full`}>Register</span>
        </div>
          <div className="flex flex-col">
            <label className="text-teal-700">Phone Number</label>
            <input className="px-4 py-2 focus-within:outline-teal-600 rounded border border_primary focus-within:border-transparent" type="text" />
          </div>
          <div className="flex flex-col">
            <label className="text-teal-700">Password</label>
			<input className="px-4 py-2 focus-within:outline-teal-600 rounded border border_primary focus-within:border-transparent" type="password" />
          </div>
		  <div>
          <button className="px-4 py-2 duration-300 bg_primary hover:bg-teal-700 rounded text-white w-full">Login</button>
        </div>
        </div>
        
      </div>
    </div>
    );
};

export default Login;