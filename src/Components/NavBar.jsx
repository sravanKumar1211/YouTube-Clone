import React, { useState } from "react";
import logo from "../assets/youtube.png";
import { IoMenu, IoSearchSharp } from "react-icons/io5";
import { FaMicrophone, FaBell, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function NavBar({sideBarFn,sideBar}) {
  const [userPic, setUserPic] = useState(null);     // will come from backend later
  const [isLoggedIn, setIsLoggedIn] = useState(false); // backend will update later
  const [openMenu, setOpenMenu] = useState(false);  // for dropdown toggle

  const handleHamburger=()=>{
    sideBarFn(!sideBar)// function to handle click on hamburger it passes clicked val to that function nugates the orginal val
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">

        {/* ===== Left Section ===== */}
        <div className="flex items-center gap-4">
          <button className="text-2xl p-1 hover:bg-gray-200 rounded-full cursor-pointer" onClick={handleHamburger}>
            <IoMenu />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={logo} alt="Logo" className="h-6" />
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

          {/* ===== Profile + Dropdown ===== */}
          <div className="relative">
            <button className="cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
              {userPic ? (
                <img src={userPic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <CgProfile className="text-2xl" />
              )}
            </button>

            {/* Dropdown */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md py-2 text-sm">

                {!isLoggedIn && (
                  <>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsLoggedIn(true)} // later call backend
                    >
                      Login
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => alert("Signup Page")} // signup UI later
                    >
                      Sign Up
                    </button>
                  </>
                )}

                {isLoggedIn && (
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserPic(null);
                    }}
                  >
                    Logout
                  </button>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
