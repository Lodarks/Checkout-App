import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useData } from "../context";

const TopSearchBar = () => {
  const { selectedItems, setSelectedItems, setBasket } = useData();
  const [data, setData] = useState([]);

  const getAllProducts = async (value) => {
    axios
      .get(`https://65147098dc3282a6a3cd2d06.mockapi.io/Products`)
      .then((res) => {
        setData(
          value === undefined || value.trim() === ""
            ? []
            : res.data.filter(
                (item) =>
                  item &&
                  item.productName.toLowerCase().includes(value.toLowerCase())
              )
        );
      });
  };

  const handleChange = (value) => {
    getAllProducts(value);
  };

  const addToSelectedItems = (item) => {
    if (
      !selectedItems.some((element) => element.productName === item.productName)
    ) {
      setSelectedItems((prevItems) => [...prevItems, item]);
      setData([]);
      setBasket((prevBasket) => [
        ...prevBasket,
        {
          productId: item.id,
          productName: item.productName,
          productQuantity: 1,
          productPrice: item.Price,
          productColor: item.Colors,
        },
      ]);
    } else {
      alert("Item already added to basket");
    }
  };

  return (
    <div>
      <label className='flex border-1 items-center w-40 sm:w-60 md:w-96 h-6 p-3 ml-4 bg-white'>
        <AiOutlinePlus size={18} />
        <input
          className='h-6 p-2 outline-none w-full text-xs'
          type='text'
          placeholder='Search Product (F6)'
          onChange={(e) => handleChange(e.target.value)}
        />
      </label>
      <div
        className={`absolute bg-gray-300 ml-4 w-40 sm:w-60 md:w-96 mt-3 h-52 z-30 rounded-md ${
          data.length === 0 ? "hidden" : "overflow-y-scroll"
        }`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              addToSelectedItems(item);
            }}
            className='flex justify-between items-center hover:bg-slate-800 hover:text-white'
          >
            <p className=' p-3'>{item.productName}</p>
            <AiOutlinePlus className='mr-2' size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearchBar;
