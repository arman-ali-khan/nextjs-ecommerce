import UserLayout from "@/Layout/UserLayout";
import AddProducts from "@/components/Dashboard/Admin/Products/AddProducts";
import React from "react";

const newProduct = () => {
  return (
    <UserLayout>
     <AddProducts />
    </UserLayout>
  );
};

export default newProduct;
