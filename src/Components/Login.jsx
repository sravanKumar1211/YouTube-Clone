
import React, { useState } from "react";
import googleLogo from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [loginField, setLoginField] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleOnChangeInput = (e, field) => {
    setLoginField({ ...loginField, [field]: e.target.value });
  };

  // VALIDATION FUNCTION
  const validate = () => {
    let valid = true;
    let newErrors = { userName: "", email: "", password: "" };

    if (!loginField.userName.trim() || loginField.userName.trim().length < 3) {
      newErrors.userName = "Full name must be at least 3 characters.";
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(loginField.userName)) {
      newErrors.userName = "Name must contain only letters.";
      valid = false;
    }

    if (!loginField.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(loginField.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!loginField.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
        loginField.password
      )
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, special char & min 6 chars.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // LOGIN CLICK
  const handleLogin = async () => {
    if (validate()) {
      axios
        .post("http://localhost:3000/auth/login", loginField, {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          toast.error("Invalid Credentials");
          console.log(err.message);
        });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

        <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-xl p-6 sm:p-8">

          {/* Google Logo */}
          <div className="flex justify-center">
            <img src={googleLogo} alt="Google" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-center mt-4">
            Sign in
          </h2>

          <p className="text-center text-gray-600 mt-1 mb-6 text-xs sm:text-sm">
            to continue to <span className="font-medium">ProTube</span>
          </p>

          {/* Full Name */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="userName"
              value={loginField.userName}
              onChange={(e) => handleOnChangeInput(e, "userName")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 
                ${errors.userName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email"
              value={loginField.email}
              onChange={(e) => handleOnChangeInput(e, "email")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 
                ${errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter password"
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 
                ${errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <p className="text-xs sm:text-sm text-gray-600 mt-3 cursor-pointer hover:underline">
              Password Must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character, Minimum 6 chars
            </p>
          </div>

          {/* Forgot email */}
          <p className="text-xs sm:text-sm text-blue-600 mt-3 cursor-pointer hover:underline">
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
            <img src={googleLogo} className="w-5 h-5 sm:w-6 sm:h-6" alt="Google Icon" />
            <span className="text-sm font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 sm:gap-0">
            <Link to={"/signin"}>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Create account
              </button>
            </Link>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 w-full sm:w-auto text-center"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
