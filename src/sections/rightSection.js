import React, { useEffect, useState, useCallback } from "react";
import { useData } from "../context";
import UserSearchBar from "../components/userSearchBar";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsFillGiftFill } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import axios from "axios";

const RightSection = () => {
  const {
    basket,
    selectedUser,
    setTotalPrice,
    totalPrice,
    setBasket,
    setSelectedUser,
    setSelectedItems,
  } = useData();
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handlePaidAmountChange = (event) => {
    const input = event.target.value;
    const regex = /^\d*$/;

    if (regex.test(input)) {
      setPaidAmount(input);
    }
  };

  useEffect(() => {
    setIsUserSelected(!!selectedUser);
  }, [selectedUser]);

  const calculateTotalPrice = useCallback(() => {
    if (basket.length > 0) {
      const totalProductPrice = basket.reduce(
        (total, item) => total + item.productPrice,
        0
      );
      setTotalPrice(totalProductPrice);
    } else {
      setTotalPrice(0);
    }
  }, [setTotalPrice, basket]);

  useEffect(() => {
    calculateTotalPrice();
  }, [basket, setBasket, calculateTotalPrice]);

  const basketString = basket
    .map((item) => `${item.productName} - $${item.productPrice}`)
    .join(", ");

  const checkout = () => {
    if (isUserSelected) {
      if (paidAmount >= totalPrice) {
        const data = {
          user: selectedUser,
          basket: basket,
        };

        axios
          .post("https://example.com/api/checkout", data)
          .then((response) => {
            alert(`Checkout is successful! 🎉`, response.data);
          })
          .catch((error) => {
            console.error("Post işlemi hatası:", error);
            // alert("Checkout failed! 😔");
          });
        alert(
          `Checkout is successful! 🎉 \n\n${
            selectedUser.name
          } bought ${basketString} \n\n change: $${
            totalPrice && paidAmount && paidAmount - totalPrice
          } `
        );
        setPaidAmount(0);
        setTotalPrice(0);
        setBasket([]);
        setSelectedUser(null);
        setSelectedItems([]);
      } else {
        alert("Please pay enough money! 🙏");
      }
    } else {
      alert("Please choose a customer first! 🙏");
    }
  };

  const roundedTotal = Math.round(totalPrice / 10) * 10;

  return (
    <div
      style={{ height: 700 }}
      className='flex flex-col w-1/4 justify-between'
    >
      <div className='flex flex-col'>
        <UserSearchBar />
        <div className='flex justify-between w-full p-2'>
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <div className='flex justify-between w-full p-2'>
          <p>Tax</p>
          <p>$0</p>
        </div>
        <div className='flex justify-between w-full p-2'>
          <p>Need To Pay</p>
          <p>${totalPrice}</p>
        </div>
        <div className='flex justify-between w-full p-2'>
          <p>Paid</p>
          <div className='flex justify-between border-b-1 border-gray-300 w-28'>
            <p>$</p>
            <input
              className='outline-none text-right w-full'
              type='text'
              placeholder='0'
              value={paidAmount}
              onChange={handlePaidAmountChange}
            />
          </div>
        </div>

        <div className='flex justify-evenly w-full'>
          <p
            onClick={() => setPaidAmount(totalPrice)}
            className='cursor-pointer border-1 border-gray-300 w-16 flex justify-center items-center h-6'
          >
            ${totalPrice}
          </p>
          <p
            onClick={() => setPaidAmount(roundedTotal)}
            className=' cursor-pointer border-1 border-gray-300 w-16 flex justify-center items-center h-6'
          >
            ${roundedTotal}
          </p>
          <p
            onClick={() => setPaidAmount(roundedTotal + 10)}
            className='cursor-pointer border-1 border-gray-300 w-16 flex justify-center items-center h-6'
          >
            ${roundedTotal + 10}
          </p>
          <p
            onClick={() => setPaidAmount(roundedTotal + 20)}
            className='cursor-pointer border-1 border-gray-300 w-16 flex justify-center items-center h-6'
          >
            ${roundedTotal + 20}
          </p>
        </div>
        <div className=' w-full flex justify-center mt-2'>
          <p
            onClick={() => setPaidAmount(roundedTotal + 50)}
            className='cursor-pointer border-1 border-gray-300 w-16 flex justify-center items-center h-6'
          >
            ${roundedTotal + 50}
          </p>
        </div>
        <div className='flex justify-between w-full p-2'>
          <p>Change</p>
          <p>$ {totalPrice && paidAmount - totalPrice}</p>
        </div>
      </div>
      <div>
        <div className='flex items-center text-gray-600 text-sm ml-5 mb-3'>
          <BsFillGiftFill className='mr-1' />
          <p>Discount(F4)</p>
        </div>
        <div className='flex items-center text-gray-600 text-sm ml-5 mb-3'>
          <FaRegCreditCard className='mr-1' />
          <p>Payment Method(Cash)(F9)</p>
        </div>
        <div className='flex w-full justify-center p-3 cursor-pointer'>
          <div
            onClick={() => checkout()}
            className=' w-80 flex justify-center bg-[#61bcb8] text-white h-10 rounded-md items-center hover:bg-[#2e5957] hover:h-12 hover:w-72 transition-all ease duration-150'
          >
            <button className=' font-bold'>Checkout</button>
            <div className='flex items-center ml-4'>
              ${totalPrice}
              <MdKeyboardDoubleArrowRight className='' size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
