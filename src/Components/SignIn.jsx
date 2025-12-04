import React, { useState } from "react";
import axios from "axios";
import googleLogo from "../assets/google.png";
import {toast,ToastContainer} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";



function SignIn() {
  const CLOUD_NAME = "dzdurdxzw";
  const UPLOAD_PRESET = "youtube-clone";
  const navigate=useNavigate()

  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const [channel, setChannel] = useState({
    channelName: "",
    about: "",
    channelBanner: "",
  });

  const [errors, setErrors] = useState({});

  // Upload to Cloudinary
  const uploadFile = async (file, updateState, fieldName) => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        form
      );
      updateState((prev) => ({ ...prev, [fieldName]: res.data.secure_url }));
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  // Validation
  const validate = () => {
    let e = {};
    let ok = true;

    if (!user.fullName.trim()) (e.fullName = "Required", ok = false);
    if (!user.userName.trim()) (e.userName = "Required", ok = false);

    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      (e.email = "Invalid email"), (ok = false);
    }

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passCheck.test(user.password)) {
      e.password = "Weak password";
      ok = false;
    }

    if (!channel.channelName.trim()) (e.channelName = "Required", ok = false);
    if (!channel.about.trim()) (e.about = "Required", ok = false);

    setErrors(e);
    return ok;
  };
const handleSubmit = () => {
  if (!validate()) {
    toast.error("Fix form errors before submitting");
    return;
  }

  const finalData = { ...user, ...channel };

  axios.post("http://localhost:3000/auth/signup", finalData)
    .then(res => {
      toast.success("Account created successfully!");
      console.log(res.data);
       navigate('/')
    })
    .catch(err => {
      const msg = err?.response?.data?.message || "Signup failed";
      toast.error(msg);
      console.log(err);
    });
};


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">

      {/* CARD */}
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl p-8">

        {/* GOOGLE ICON + TITLE */}
        <div className="text-center">
          <img src={googleLogo} className="w-10 mx-auto" />
          <h2 className="text-xl font-semibold mt-2">Create your ProTube account</h2>
          <p className="text-gray-600 text-sm">A single account for all services</p>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

          {/* USER DETAILS */}
          <div>
            <h3 className="font-medium mb-3">User Info</h3>

            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                error={errors.fullName}
              />

              <Input
                placeholder="Username"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                error={errors.userName}
              />

              <Input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                error={errors.email}
              />

              <Input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                error={errors.password}
              />
            </div>
          </div>

          {/* CHANNEL DETAILS */}
          <div>
            <h3 className="font-medium mb-3">Channel Info</h3>

            <div className="space-y-4">
              <Input
                placeholder="Channel Name"
                value={channel.channelName}
                onChange={(e) =>
                  setChannel({ ...channel, channelName: e.target.value })
                }
                error={errors.channelName}
              />

              <textarea
                placeholder="Channel Description"
                value={channel.about}
                onChange={(e) =>
                  setChannel({ ...channel, about: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 h-24 text-sm"
              ></textarea>
              {errors.about && <p className="text-red-500 text-xs">{errors.about}</p>}
            </div>
          </div>
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="mt-10">
          <h3 className="font-medium mb-4">Profile & Banner</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Profile Preview */}
            <div>
              <p className="text-sm font-medium">Profile Picture</p>
              <img
                src={user.profilePic || "https://via.placeholder.com/100"}
                className="w-20 h-20 rounded-full object-cover mt-2 border"
              />
              <input
                type="file"
                className="mt-2 text-sm"
                onChange={(e) =>
                  uploadFile(e.target.files[0], setUser, "profilePic")
                }
              />
            </div>

            {/* Banner Preview */}
            <div>
              <p className="text-sm font-medium">Channel Banner</p>
              <img
                src={channel.channelBanner || "https://via.placeholder.com/300x100"}
                className="w-full h-20 object-cover rounded-lg mt-2 border"
              />
              <input
                type="file"
                className="mt-2 text-sm"
                onChange={(e) =>
                  uploadFile(e.target.files[0], setChannel, "channelBanner")
                }
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-10">
          <Link to={'/login'}>
          <button
            className="text-blue-600 text-sm"
          >
            Already have an account?
          </button>
                </Link>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Create account
          </button>
        </div>

      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

// Reusable Input Component
function Input({ error, ...props }) {
  return (
    <>
      <input
        {...props}
        className={`w-full border rounded-lg px-3 py-2 text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
}

export default SignIn;

