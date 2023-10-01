import React, { useState } from "react";
import { BiSolidUserPlus } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useData } from "../context";

const UserSearchBar = () => {
  const { setSelectedUser, selectedUser, setBasket } = useData();

  const [data, setData] = useState([]);

  const getAllProducts = async (value) => {
    axios
      .get(`https://65147098dc3282a6a3cd2d06.mockapi.io/Users`)
      .then((res) => {
        setData(
          value === undefined || value.trim() === ""
            ? []
            : res.data.filter(
                (item) =>
                  item &&
                  item.name.toLowerCase().includes(value.toLowerCase()) &&
                  item !== selectedUser
              )
        );
      });
  };

  const handleChange = (value) => {
    if (!selectedUser) {
      getAllProducts(value);
    }
  };

  const addToSelectedUsers = (item) => {
    if (!selectedUser || selectedUser.name !== item.name) {
      setSelectedUser(item); // Sadece seçili kullanıcıyı günceller
      setData([]);
    } else {
      alert("Item already added to basket");
    }
  };

  const removeSelectedUser = () => {
    setSelectedUser(null); // Seçili kullanıcıyı kaldırır
  };

  return (
    <div>
      <label className='flex border-1 border-gray-500 items-center mt-2 w-28 sm:w-28 md:w-36 lg:w-80 h-8 justify-center p-3 ml-4 bg-white'>
        {selectedUser ? (
          <>
            <div className='border-1 border-gray-200 flex pr-2 pl-2 items-center'>
              <p className='text-sm text-gray-500'>{selectedUser.name}</p>
              <RiDeleteBinLine
                className='cursor-pointer text-gray-500 ml-1'
                size={16}
                onClick={removeSelectedUser}
              />
            </div>
          </>
        ) : (
          <>
            <input
              className='h-6 p-2 outline-none w-full text-xs'
              type='text'
              placeholder='Search Customer (F7)'
              onChange={(e) => handleChange(e.target.value)}
            />
            <BiSolidUserPlus className=' text-gray-300' size={30} />
          </>
        )}
      </label>
      <div
        className={`absolute bg-gray-300 ml-4 w-28 sm:w-28 md:w-36 lg:w-80 mt-3 h-52 z-30 cursor-pointer rounded-md ${
          data.length === 0 ? "hidden" : "overflow-y-scroll"
        }`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              addToSelectedUsers(item);
            }}
            className='flex justify-between items-center hover:bg-slate-800 hover:text-white'
          >
            <p className=' p-3'>{item.name}</p>
            <BiSolidUserPlus className='mr-2' size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearchBar;
