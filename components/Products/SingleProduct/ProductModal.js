import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductModal = ({data,id}) => {
    
    const [modalData,setModalData] = useState([])
    useEffect(()=>{
        axios.get(`/api/product/${id}`)
        .then(res=>setModalData(res.data))
    },[])
    console.log(modalData)
    return (
        <div>
       
        <input type="checkbox" id="productModal" className="modal-toggle " />

        <label htmlFor="productModal" className="modal cursor-pointer">
        
          <label className="modal-box relative w-11/12 max-w-5xl" htmlFor="">
          <div className='py-12'>
            {modalData.title}
          </div>
            <h3 className="text-lg font-bold">{modalData.title}</h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="flex justify-end">
              <label
                className="px-4 py-2 text-white rounded bg-teal-600"
                htmlFor="productModal"
              >
                Close
              </label>
            </div>
          </label>
        </label>
        </div>
    );
};

export default ProductModal;