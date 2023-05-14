import Product from '@/components/Products/SingleProduct/Product';
import React from 'react';

const index = ({data}) => {

    return (
        <div>
            <Product data={data} />
        </div>
    );
};

export default index;   

export async function getServerSideProps(context) {
    const { product } = context.query;
    // Fetch data for the given id
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/product/${product}`);
    const data = await res.json();
  
    return {
      props: { data },
    };
  }