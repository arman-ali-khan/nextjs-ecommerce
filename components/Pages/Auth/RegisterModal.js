
const RegisterModal = ({login,setLogin}) => {
    return (
        <div className="h-full relative bg-base-100 border-l md:rounded-md md:border-teal-400 md:hover:border-teal-600 duration-200 md:border-2 md:hover:border-4">
		
        <div className="flex justify-center items-center h-full gap-2">
          <div className="flex flex-col gap-3">
          <div className='flex justify-between'>
            <span onClick={()=>setLogin(!login)} className={`px-4 py-2 cursor-pointer select-none rounded-l bg-teal-600 border border-teal-600  text-white w-full`}>Login</span>
            <span className={`px-4 py-2  rounded-r text-black border border-teal-600 w-full`}>Register</span>
        </div>
            <div className="flex flex-col">
              <label className="text-teal-700">Phone Number</label>
              <input className="px-4 py-2 focus-within:outline-teal-600 rounded border border-teal-600 focus-within:border-transparent" type="text" />
            </div>
            <div className="flex flex-col">
              <label className="text-teal-700">Password</label>
              <input className="px-4 py-2 focus-within:outline-teal-600 rounded border border-teal-600 focus-within:border-transparent" type="password" />
            </div>
            <div>
            <button className="px-4 py-2 duration-300 bg-teal-600 hover:bg-teal-700 rounded text-white w-full">Create Account</button>
          </div>
          </div>
          
        </div>
      </div>
    );
};

export default RegisterModal;