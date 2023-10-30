import EditStockProduct from '@/components/Dashboard/Admin/Products/EditStockProduct';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const editId = () => {
  const router = useRouter();
  const {editId} = router.query

  const [product,setProduct] = useState({})

  useEffect(()=>{
    axios.get(`/api/stock/${editId}`)
    .then(res=>{
      setProduct(res?.data)
      console.log(product)
    })
  },[editId,!product?.id])

  
    
    return (
        <div>
            <EditStockProduct product={product} />
        </div>
    );
};

export default editId;


