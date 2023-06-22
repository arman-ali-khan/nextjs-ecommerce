
const DrawModal = ({id,setId}) => {
    return (
        <div className="w-screen  z-50 left-0 top-0 h-screen flex justify-center items-center backdrop-blur-lg fixed">
            <button onClick={()=>setId('')} className="fixed left-0 top-0 w-screen h-screen -z-30"></button>
            <div className="flex bg-white justify-center items-center w-full sm:w-96 rounded-md h-44">
                <div>
                 <div className="text-base py-4">How many ticket you want to buy?</div>
                 <div>
                    <input className="input input-bordered w-full" type="number" name="drawNumber" defaultValue={1} id="1" />
                 </div>
                 <div className="flex justify-center">
                    <button onClick={()=>setId('')} className="text-base my-3 btn btn-error">Cancel</button> <button className="text-base my-3 btn btn-warning">Buy Now</button>
                 </div>
                </div>
            </div>
        </div>
    );
};

export default DrawModal;