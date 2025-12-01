import React from "react";
import SideBar from "../Components/SideBar";
import { Link } from "react-router-dom";

function ChannelPage({ sideBar }) {
  const channelVideos = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div className="flex w-full">

        {/* LEFT SIDEBAR */}
        {/* <SideBar /> */}
        <SideBar sideBar={sideBar}></SideBar>

        {/* RIGHT MAIN CONTENT */}
        <div
          className={`flex-1 px-6 pb-10 ${
            sideBar ? "ml-60" : "ml-5"
          } pt-20`}
        >

          {/* ------------------ CHANNEL BANNER ------------------ */}
          <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20240919/pngtree-a-background-of-orange-blue-and-yellow-gradients-with-gritty-appearance-image_16233934.jpg"
              className="w-full h-full object-cover"
              alt="Channel Banner"
            />
          </div>

          {/* ------------------ CHANNEL HEADER ------------------ */}
          <div className="flex mt-6 items-start gap-4">

            {/* Channel Icon */}
            <img
              src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
              className="w-28 h-28 rounded-full object-cover border"
              alt="Channel Icon"
            />

            {/* Name + Stats */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Channel Name</h1>
              <p className="text-gray-600 text-sm mt-1">
                @channelowner • 120K subscribers • {channelVideos.length} videos
              </p>
              <p className="mt-2 text-sm text-gray-700 max-w-2xl">
                Channel description goes here. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. This is a sample description.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">
                <button className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 text-sm">
                  Subscribe
                </button>
                <button className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* ------------------ CATEGORY TABS ------------------ */}
          <div className="border-b mt-8">
            <ul className="flex gap-8 text-sm font-medium text-gray-600 pb-3">
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Videos
              </li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Shorts
              </li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Live
              </li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Playlists
              </li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Community
              </li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">
                Channels
              </li>
            </ul>
          </div>

          {/* ------------------ VIDEO GRID ------------------ */}
          <div
            className="grid mt-8 gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            xl:grid-cols-4"
          >
            {channelVideos.map((item, index) => (
                <Link to={'/watch/12'}>
              <div key={index} className="cursor-pointer flex flex-col">

                {/* Thumbnail */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
                    className="w-full h-full object-cover"
                    alt="Video Thumbnail"
                  />
                  <span className="absolute right-1 bottom-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                    12:45
                  </span>
                </div>

                {/* Title + Info */}
                <div className="mt-3 text-sm">
                  <h3 className="font-semibold leading-tight">
                    Channel Video {item}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1">Channel Name</p>
                  <p className="text-gray-600 text-xs">
                    100K views • 10 days ago
                  </p>
                </div>

              </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ChannelPage;
