import React, { useEffect } from "react";
import { useData } from "../context";
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa";

const ProductList = () => {
  const {
    selectedItems,
    setSelectedItems,
    setBasket,
    basket,
    productColors,
    setProductColors,
    productQuantity,
    setProductQuantity,
    productTotalPrice,
    setProductTotalPrice,
  } = useData();

  useEffect(() => {
    const initialProductTotalPrice = {};
    selectedItems.forEach((product) => {
      initialProductTotalPrice[product.id] = product.Price;
    });
    setProductTotalPrice(initialProductTotalPrice);
  }, [selectedItems, setProductTotalPrice]);

  const handleColorChange = (productId, color) => {
    setProductColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.productId === productId ? { ...item, productColor: color } : item
      )
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      setProductQuantity((prevQuantity) => ({
        ...prevQuantity,
        [productId]: quantity,
      }));
      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.productId === productId
            ? { ...item, productQuantity: quantity }
            : item
        )
      );
    } else {
      setProductQuantity((prevQuantity) => ({
        ...prevQuantity,
        [productId]: 1,
      }));
      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.productId === productId ? { ...item, productQuantity: 1 } : item
        )
      );
    }
    updateTotalPrice(productId, quantity);
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.productId === productId
          ? {
              ...item,
              productPrice:
                quantity * selectedItems.find((p) => p.id === productId).Price,
            }
          : item
      )
    );
  };

  const updateTotalPrice = (productId, quantity) => {
    const product = selectedItems.find((product) => product.id === productId);
    if (product) {
      const price = product.Price;
      const total = isNaN(quantity) ? price * 1 : price * quantity;

      setProductTotalPrice((prevTotalPrice) => ({
        ...prevTotalPrice,
        [productId]: total,
      }));
    }
  };

  const deleteProduct = (productId) => {
    const updatedSelectedItems = selectedItems.filter(
      (product) => product.id !== productId
    );

    setSelectedItems(updatedSelectedItems);
    setBasket((prevBasket) =>
      prevBasket.filter((item) => item.productId !== productId)
    );
    setProductQuantity(1);
  };
  console.log(basket);
  return (
    <div className='pt-2 pb-2 text-sm flex flex-col-reverse'>
      {selectedItems.map((product, index) => (
        <div
          key={index}
          className='flex items-center justify-between border-b-1 border-gray-300 p-5'
        >
          <div className='flex items-center'>
            <p className='p-3'>{index + 1}.</p>
            <div>
              <p className='mb-2'>{product.productName}</p>
              <div className='relative'>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none z-20'>
                  <AiOutlineArrowDown />
                </div>
                <select
                  name='colors'
                  className='bg-white border-1 border-black rounded focus:outline-none appearance-none w-44 h-8 pl-2 pr-8 relative z-10'
                  onChange={(e) =>
                    handleColorChange(product.id, e.target.value)
                  }
                  value={productColors[product.id] || product.Colors}
                >
                  <option key={product.Colors} value={product.Colors}>
                    {product.Colors}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex w-16 items-center justify-between sm:ml-1 md:ml-3 lg:ml-10 '>
            <AiOutlineArrowLeft
              onClick={() =>
                handleQuantityChange(
                  product.id,
                  (productQuantity[product.id] && productQuantity[product.id]) -
                    1 || 1
                )
              }
            />
            <p>
              {productQuantity[product.id] !== undefined &&
              productQuantity[product.id] !== null
                ? productQuantity[product.id]
                : 1}
            </p>
            <AiOutlineArrowRight
              onClick={() =>
                handleQuantityChange(
                  product.id,
                  (productQuantity[product.id] || 1) + 1
                )
              }
            />
          </div>

          <p className='border-b-1 border-black w-14 flex justify-end sm:ml-1 md:ml-3 lg:ml-10'>
            ${product.Price}
          </p>

          <p className='w-14 font-bold sm:ml-1 md:ml-3 lg:ml-10'>
            ${productTotalPrice[product.id]}
          </p>
          <div className='flex sm:ml-1 md:ml-1 lg:ml-96'>
            <RiDeleteBin5Line
              onClick={() => deleteProduct(product.id)}
              className=' text-gray-500 mr-2'
            />
            <FaExclamation className=' text-gray-500' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
