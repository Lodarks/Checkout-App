import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const topMenu = () => {
  return (
    <>
      <div className='flex w-80 justify-between text-base  md:text-base lg:text-base xl:text-base items-center ml-6 bg-white h-full'>
        <p className=' ml-3 '>Bill 1</p>
        <AiOutlineClose className='mr-3 text-gray-500' />
      </div>
    </>
  );
};

export default topMenu;
