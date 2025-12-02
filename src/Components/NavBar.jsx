import React, { useEffect, useState } from "react";
import logo from "../assets/youtube.png";
import { IoMenu, IoSearchSharp } from "react-icons/io5";
import { FaVideo, FaMicrophone, FaBell, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar({ sideBarFn, sideBar }) {
  const [userPic, setUserPic] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [createMenu, setCreateMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
  // Load user on navbar mount
  useEffect(() => {
    const pic = user?.profilePic;
    if (pic) {
      setUserPic(pic);
      setIsLoggedIn(true); 
    }
  }, []);

 

  //Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setIsLoggedIn(false);
      setUserPic(null);
      setOpenMenu(false);

      navigate("/");
    } catch (err) {
      console.log("Logout Error:", err.message);
    }
  };

fetch("http://localhost:3000/auth/logout", {
  method: "POST",
  credentials: "include"
})
.then(r => { console.log("fetch response", r.status); return r.text(); })
.then(t => console.log("body:", t))
.catch(e => console.error("fetch error:", e));



  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <button
            className="text-2xl p-1 hover:bg-gray-200 rounded-full"
            onClick={() => sideBarFn(!sideBar)}
          >
            <IoMenu />
          </button>

          <Link to={"/"}>
            <div className="flex items-center gap-1 cursor-pointer">
              <img src={logo} alt="Logo" className="h-6" />
              <span className="text-lg">ProTube</span>
            </div>
          </Link>
        </div>

        {/* SEARCH BAR */}
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

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5 text-xl">

          {/* CREATE BUTTON */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
              onClick={() => setCreateMenu(!createMenu)}
            >
              <FaPlus /> Create
            </button>

            {createMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 text-sm">
                <button
                  className="w-full flex justify-center gap-1 px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setCreateMenu(false);
                    navigate(`/${localStorage.getItem("user")._id}/upload`);
                  }}
                >
                  Upload Video <FaVideo />
                </button>

                <button
                  className="w-full flex justify-center gap-1 px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setCreateMenu(false);
                    navigate(`/user/${localStorage.getItem("user")._id}`);
                  }}
                >
                  Go To Channel
                </button>
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <button className="relative p-2 rounded-full hover:bg-gray-200">
            <FaBell />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full">
              9+
            </span>
          </button>

          {/* PROFILE + DROPDOWN */}
          <div className="relative">
            <button
              className="cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {userPic ? (
                <img
                  src={userPic}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <CgProfile className="text-2xl" />
              )}
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border rounded-md py-2 text-sm">

                {!isLoggedIn ? (
                  <>
                    <Link to={"/login"}>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMenu(false)}
                      >
                        Login
                      </button>
                    </Link>

                    <Link to={"/signin"}>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpenMenu(false)}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
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





