import React, { useState } from "react";
import logo from "../assets/youtube.png";
import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

function NavBar() {
    // this state is defined for nav bar pic before and after login
    const[userPic,setUserPic]=useState()

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">

        {/* ===== Left Section ===== */}
        <div className="flex items-center gap-4">
          <button className="text-2xl p-1 hover:bg-gray-200 rounded-full cursor-pointer">
            <IoMenu />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={logo} alt="YouTube" className="h-6" />
            <span className="text-lg">ProTube</span>
          </div>
        </div>

        {/* ===== Center Section (Search) ===== */}
        <div className="flex items-center w-[45%] max-md:w-[60%]">
          <div className="flex items-center w-full border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-1 outline-none text-sm"
            />
            <button className="bg-gray-100 px-4 border-l border-gray-300 hover:bg-gray-200">
              <IoSearchSharp className="text-xl" />
            </button>
          </div>
          <button className="ml-3 text-lg bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <FaMicrophone />
          </button>
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-5 text-xl">
          <button className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
            <FaPlus /> Create
          </button>

          <button className="relative cursor-pointer hover:bg-gray-200 p-2 rounded-full">
            <FaBell />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full">9+</span>
          </button>
            {/* user pic comes dynamilclly after login */}
         <button className="cursor-pointer">
            {userPic ? (
                <img src={userPic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
            ) : (
                <CgProfile className="text-2xl" />
            )}
        </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;



