import UserLayout from "@/Layout/UserLayout";
import AddProducts from "@/components/Dashboard/Admin/Products/AddProducts";
import React from "react";

const newProduct = () => {
  return (
    <UserLayout title={'Add New Product'}>
     <AddProducts />
    </UserLayout>
  );
};

export default newProduct;
