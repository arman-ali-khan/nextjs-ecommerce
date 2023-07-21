
const DrawModal = ({id,setId}) => {
    return (
<>
  <input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
<label onClick={()=>setId('')} className="px-3 py-1 rounded-full bg-teal-600 right-0 absolute top-0" htmlFor="my_modal_7">X</label>
    <h3 className="text-lg font-bold my-2">How many ticket you want to buy?</h3>
    <div>
      <input className="input input-bordered w-full" type="number" name="" id="" />
    </div>
    <button className="px-4 py-2 rounded bg-teal-600 text-white my-2 mx-auto w-full">Buy Now</button>
  </div>
  <label onClick={()=>setId('')} className="modal-backdrop" htmlFor="my_modal_7"></label>
</div>
</>

    );
};

export default DrawModal;