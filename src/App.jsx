import React, { useState, lazy, Suspense, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";

const Home = lazy(() => import("./Pages/Home"));
const Video = lazy(() => import("./Pages/Video"));
const ChannelPage = lazy(() => import("./Pages/ChannelPage"));
const VideoUpload = lazy(() => import("./Pages/VideoUploard"));
const SignIn = lazy(() => import("./Components/SignIn"));
const Login = lazy(() => import("./Components/Login"));

function App() {
  const [sideBar, setSideBar] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const sideBarFn = useCallback((val) => {
    setSideBar(val);
  }, []);

  return (
    <>
      <NavBar
        sideBarFn={sideBarFn}
        sideBar={sideBar}
        search={search}
        setSearch={setSearch}
      />

      <Suspense fallback={<div className="pt-20 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home sideBar={sideBar} search={search} />} />

          {/* ⬇⬇ FIXED — FORCE REMOUNT WHEN :id CHANGES */}
          <Route
            path="/watch/:id"
            element={<Video key={location.pathname} />}
          />

          <Route path="/user/:id" element={<ChannelPage sideBar={sideBar} />} />
          <Route path="/:id/upload" element={<VideoUpload />} />
          <Route path="/edit/:videoId" element={<VideoUpload />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
