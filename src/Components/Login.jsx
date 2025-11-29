
import React from "react";
import googleLogo from "../assets/google.png"; // FIXED IMPORT



function Login({setLoginPopUp}) {
    const handleLogin=()=>{setLoginPopUp(false)}
    
  return (
    <>
      {/* Transparent Dark Background Overlay */}
      <div className="fixed inset-0 bg-white bg-opacity-40 mt-15 backdrop-blur-sm flex items-center justify-center z-0">

        {/* Popup Login Card */}
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8">

          {/* Google Logo */}
          <div className="flex justify-center">
            <img
              src={googleLogo}
              alt="Google"
              className="w-12 h-12"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mt-4">
            Sign in
          </h2>

          <p className="text-center text-gray-600 mt-1 mb-6 text-sm">
            to continue to <span className="font-medium">ProTube</span>
          </p>

          {/* Email Input */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot email link */}
          <p className="text-sm text-blue-600 mt-3 cursor-pointer hover:underline">
            Forgot email?
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50">
            <img
              src={googleLogo}
              className="w-6 h-6"
              alt="Google Icon"
            />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Create account
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
             onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
