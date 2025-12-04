import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ChannelPage({ sideBar }) {
const userData = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  // API returns: { success: true, video: [ ... ] }
  const [channelVideos, setChannelVideos] = useState([]);

  // Fetch channel videos
  const fetchChannelData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channelapi/channelvideos/${id}`
      );

      // Store only videos array
      setChannelVideos(response.data.video);
      console.log(response.data)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, [id]);


  // Extract channel info from first video
  const channelInfo = channelVideos[0]?.user;

  return (
    <>
      <div className="flex w-full">

        {/* LEFT SIDEBAR */}
        <SideBar sideBar={sideBar} />

        {/* MAIN CONTENT */}
        <div className={`flex-1 px-6 pb-10 ${sideBar ? "ml-60" : "ml-5"} pt-20`}>

          {/* CHANNEL BANNER */}
          <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden">
            <img
              src={userData?.channelBanner}
              className="w-full h-full object-cover"
              alt="Channel Banner"
            />
          </div>

          {/* CHANNEL HEADER */}
          <div className="flex mt-6 items-start gap-4">

            {/* CHANNEL ICON */}
            <img
              src={userData?.profilePic}
              className="w-28 h-28 rounded-full object-cover border"
              alt="Channel Icon"
            />

            {/* NAME + STATS */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                {userData?.channelName}
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                @{userData?.userDataName} • {channelVideos.length} videos
              </p>

              <p className="mt-2 text-sm text-gray-700 max-w-2xl">
                {userData?.about}
              </p>

              {/* BUTTONS */}
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

          {/* CATEGORY TABS */}
          <div className="border-b mt-8">
            <ul className="flex gap-8 text-sm font-medium text-gray-600 pb-3">
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Videos</li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Shorts</li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Live</li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Playlists</li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Community</li>
              <li className="cursor-pointer hover:text-black hover:border-b-2 hover:border-black pb-2">Channels</li>
            </ul>
          </div>

          {/* VIDEO GRID */}
          <div className="grid mt-8 gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

            {channelVideos.map((item, index) => (
              <div key={index} className="cursor-pointer flex flex-col">
                <Link to={`/watch/${item._id}`}>

                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <img
                      src={item?.thumbnailUrl}
                      className="w-full h-full object-cover"
                      alt="Video Thumbnail"
                    />
                    <span className="absolute right-1 bottom-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                      12:45
                    </span>
                  </div>

                  {/* Title + Info */}
                  <div className="mt-3 text-sm">
                    <h3 className="font-semibold leading-tight">{item.title}</h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {item.userData?.channelName}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {item.likesCount} likes • {item.createdAt.slice(0, 10)}
                    </p>
                  </div>

                </Link>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default ChannelPage;
