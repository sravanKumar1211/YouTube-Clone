
import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import logo from "../assets/youtube.png";

// Lazy-loading icons to improve bundle size & performance
const IoMenu = lazy(() => import("react-icons/io5").then(m => ({ default: m.IoMenu })));
const IoSearchSharp = lazy(() => import("react-icons/io5").then(m => ({ default: m.IoSearchSharp })));
const FaVideo = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaVideo })));
const FaMicrophone = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaMicrophone })));
const FaBell = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaBell })));
const FaPlus = lazy(() => import("react-icons/fa").then(m => ({ default: m.FaPlus })));
const CgProfile = lazy(() => import("react-icons/cg").then(m => ({ default: m.CgProfile })));

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar({ sideBarFn, sideBar, search, setSearch }) {

  // Stores profile picture from logged-in user
  const [userPic, setUserPic] = useState(null);

  // Track login state (true/false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dropdown state for profile menu
  const [openMenu, setOpenMenu] = useState(false);

  // Dropdown state for create menu (upload options)
  const [createMenu, setCreateMenu] = useState(false);

  const navigate = useNavigate();

  // Get stored user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // When component loads, check if user exists → show profile pic
  useEffect(() => {
    if (user?.profilePic) {
      setUserPic(user.profilePic);
      setIsLoggedIn(true);
    }
  }, []);

  // Toggle upload/create menu visibility
  const toggleCreateMenu = useCallback(() => {
    setCreateMenu(prev => !prev);
  }, []);

  // Toggle profile dropdown menu
  const toggleProfileMenu = useCallback(() => {
    setOpenMenu(prev => !prev);
  }, []);

  // Logout function → clear token + user, update UI, redirect
  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true } // to remove session cookies if any
      );

      // Clear local storage data
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Reset states
      setIsLoggedIn(false);
      setUserPic(null);
      setOpenMenu(false);

      // Redirect to homepage
      navigate("/");
      window.location.reload(); // refresh UI instantly
    } catch (err) {
      console.log("Logout Error:", err.message);
    }
  }, [navigate]);

  return (
    <>
      {/* MAIN NAVBAR WRAPPER */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">

        
        {/* LEFT SECTION → Menu Button + Logo */}
        
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Hamburger Sidebar Toggle */}
          <button
            className="text-xl sm:text-2xl p-1 hover:bg-gray-200 rounded-full"
            onClick={() => sideBarFn(!sideBar)}
          >
            <Suspense><IoMenu /></Suspense>
          </button>

          {/* App Logo + Name */}
          <Link to={"/"}>
            <div className="flex items-center gap-1 cursor-pointer">
              <img src={logo} alt="Logo" className="h-5 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">ProTube</span>
            </div>
          </Link>
        </div>

        
        {/* MIDDLE → SEARCH BAR */}
        
        <div className="flex items-center w-[40%] sm:w-[45%] max-md:w-[60%] max-sm:w-[55%]">

          {/* Search Input & Button */}
          <div className="flex items-center w-full border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-1 sm:py-2 text-xs sm:text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Search Icon */}
            <button className="bg-gray-100 px-3 sm:px-4 border-l border-gray-300 hover:bg-gray-200">
              <Suspense><IoSearchSharp className="text-lg sm:text-xl" /></Suspense>
            </button>
          </div>

          {/* Mic Icon */}
          <button className="ml-2 sm:ml-3 text-base sm:text-lg bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <Suspense><FaMicrophone /></Suspense>
          </button>
        </div>

        
        {/* RIGHT SECTION → Create + Notifications + Profile */}
        
        <div className="flex items-center gap-3 sm:gap-5 text-xl">

          
          {/* CREATE BUTTON MENU */}
          
          <div className="relative">

            <button
              className="hidden sm:flex items-center gap-2 text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 rounded-full hover:bg-gray-200"
              onClick={toggleCreateMenu}
            >
              <Suspense><FaPlus /></Suspense> Create
            </button>

            {/* Create Dropdown */}
            {createMenu && (
              <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white shadow-lg border rounded-md py-2 text-sm">

                {/* Upload Video */}
                <button
                  className="w-full flex justify-center gap-1 px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setCreateMenu(false);
                    navigate(`/${user?._id}/upload`);
                  }}
                >
                  Upload Video <Suspense><FaVideo /></Suspense>
                </button>

                {/* Go To Channel */}
                <button
                  className="w-full flex justify-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setCreateMenu(false);
                    navigate(`/user/${user?._id}`);
                  }}
                >
                  Go To Channel
                </button>
              </div>
            )}
          </div>

          
          {/* NOTIFICATIONS BELL */}
          
          <button className="relative p-1 sm:p-2 rounded-full hover:bg-gray-200">
            <Suspense><FaBell className="text-lg sm:text-xl" /></Suspense>

            {/* Unread Notification Count */}
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] sm:text-xs px-1 rounded-full">
              9+
            </span>
          </button>

          
          {/* PROFILE AREA (PROFILE PIC OR ICON) */}
          
          <div className="relative">
            <button onClick={toggleProfileMenu}>
              
              {/* Show profile picture if logged in */}
              {userPic ? (
                <img
                  src={userPic}
                  alt="Profile"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
                />

              ) : (
                // If no user pic, show generic profile icon
                <Suspense><CgProfile className="text-xl sm:text-2xl" /></Suspense>
              )}
            </button>

            {/* Profile Dropdown */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-28 sm:w-36 bg-white shadow-lg border rounded-md py-2 text-xs sm:text-sm">

                {/* If not logged in → show Login / Signup */}
                {!isLoggedIn ? (
                  <>
                    <Link to={"/login"}>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={toggleProfileMenu}
                      >
                        Login
                      </button>
                    </Link>

                    <Link to={"/signin"}>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={toggleProfileMenu}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>

                ) : (
                  // If logged in → show Logout option
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

export default React.memo(NavBar);
