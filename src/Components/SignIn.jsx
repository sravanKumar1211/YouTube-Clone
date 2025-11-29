import React, { useState } from 'react';
import googleLogo from "../assets/google.png";

function SignIn({ setSigninPopUp }) {

  const [signinField, setSigninField] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleOnChangeInput = (e, field) => {
    setSigninField({ ...signinField, [field]: e.target.value });
  };
console.log(signinField)
  // VALIDATION FUNCTION
  const validateSignup = () => {
    let valid = true;
    let newErrors = { fullName: "", email: "", password: "", confirmPassword: "" };

    // Full Name Validation
    if (!signinField.fullName.trim() || signinField.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(signinField.fullName)) {
      newErrors.fullName = "Full name must contain only letters.";
      valid = false;
    }

    // Email Validation
    if (!signinField.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(signinField.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!signinField.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (!passwordRegex.test(signinField.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, special char & min 6 chars.";
      valid = false;
    }

    // Confirm Password Validation
    if (!signinField.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
      valid = false;
    } else if (signinField.confirmPassword !== signinField.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Signup Button Handler
  const handleSignin = () => {
    if (validateSignup()) {
      alert("Signup successful!");
      setSigninPopUp(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8">

          {/* Google Logo */}
          <div className="flex justify-center">
            <img src={googleLogo} alt="Google" className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-semibold text-center mt-4">Sign In</h2>

          <p className="text-center text-gray-600 mt-1 mb-6 text-sm">
            Create your account on <span className="font-medium">ProTube</span>
          </p>

          {/* FULL NAME */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Full Name"
              value={signinField.fullName}
              onChange={(e) => handleOnChangeInput(e, "fullName")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email"
              value={signinField.email}
              onChange={(e) => handleOnChangeInput(e, "email")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter password"
              value={signinField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mt-4">
            <input
              type="password"
              placeholder="Confirm password"
              value={signinField.confirmPassword}
              onChange={(e) => handleOnChangeInput(e, "confirmPassword")}
              className={`w-full border px-4 py-3 rounded-md text-sm focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* GOOGLE SIGNIN */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50">
            <img src={googleLogo} className="w-6 h-6" alt="Google Icon" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Already have an account?
            </button>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignIn;
