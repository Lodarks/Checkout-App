import React from "react";
import ProductList from "../components/productList";

const leftSection = () => {
  return (
    <div
      style={{ height: 700 }}
      className='w-3/4 overflow-y-scroll border-r-1 border-gray-700'
    >
      <ProductList />
    </div>
  );
};

export default leftSection;
