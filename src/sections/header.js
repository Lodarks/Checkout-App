import React from "react";
import { FiMenu } from "react-icons/fi";
import TopSearchBar from "../components/topSearchBar";
import TopMenu from "../components/topMenu";
import { BiSave } from "react-icons/bi";
import { BsInfoLg } from "react-icons/bs";
import { AiOutlineWifi } from "react-icons/ai";

const header = () => {
  return (
    <div className='w-full flex h-8 items-center bg-gray-100'>
      <FiMenu className=' ml-3' size={30} />
      <TopSearchBar />
      <TopMenu />
      <div className=' ml-5 w-full flex justify-between'>
        <p className=' text-xs text-gray-500'>New Bill(F1)</p>
        <div className='flex mr-5'>
          <BiSave className=' text-green-600' />
          <BsInfoLg className=' text-gray-600' />
          <AiOutlineWifi className=' text-green-600' />
        </div>
      </div>
    </div>
  );
};

export default header;
