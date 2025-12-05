import React, { useState, lazy, Suspense, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";

// Lazy-loaded components for better performance (code splitting)
const Home = lazy(() => import("./Pages/Home"));
const Video = lazy(() => import("./Pages/Video"));
const ChannelPage = lazy(() => import("./Pages/ChannelPage"));
const VideoUpload = lazy(() => import("./Pages/VideoUploard"));
const SignIn = lazy(() => import("./Components/SignIn"));
const Login = lazy(() => import("./Components/Login"));

function App() {
  // Controls showing/hiding sidebar
  const [sideBar, setSideBar] = useState(true);

  // Global search input state
  const [search, setSearch] = useState("");

  // Tracks current URL — used to force remount on dynamic routes
  const location = useLocation();

  // Memoized callback to avoid unnecessary re-renders
  const sideBarFn = useCallback((val) => {
    setSideBar(val);
  }, []);

  return (
    <>
      {/* NAVIGATION BAR (Visible on every page) */}
      <NavBar
        sideBarFn={sideBarFn}
        sideBar={sideBar}
        search={search}
        setSearch={setSearch}
      />

      {/* Suspense handles loading fallback for lazy-loaded routes */}
      <Suspense fallback={<div className="pt-20 text-center">Loading...</div>}>

        {/* ROUTES SECTION */}
        <Routes>

          {/* HOME PAGE — Also receives search + sidebar state */}
          <Route
            path="/"
            element={<Home sideBar={sideBar} search={search} />}
          />

          {/* 
            VIDEO PAGE — Force remount when :id changes 
            key={location.pathname} ensures video component reloads
            when navigating between different watch/:id URLs
          */}
          <Route
            path="/watch/:id"
            element={<Video key={location.pathname} />}
          />

          {/* CHANNEL PAGE */}
          <Route
            path="/user/:id"
            element={<ChannelPage sideBar={sideBar} />}
          />

          {/* VIDEO UPLOAD PAGE (Create new video) */}
          <Route path="/:id/upload" element={<VideoUpload />} />

          {/* VIDEO EDIT PAGE */}
          <Route path="/edit/:videoId" element={<VideoUpload />} />

          {/* AUTH PAGES */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;
