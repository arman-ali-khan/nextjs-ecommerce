import EditProduct from '@/components/Dashboard/Admin/Products/EditProduct';
import { useRouter } from 'next/router';
import React from 'react';

const editId = ({product}) => {
    const router = useRouter();

    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    
    return (
        <div>
            <EditProduct product={product} />
        </div>
    );
};

export default editId;


export async function getServerSideProps({ params }) {
    const { editId } = params;
    const response = await fetch(`/api/product/${editId}`);
    const product = await response.json();
  
    return {
      props: {
        product,
      },
    };
  }