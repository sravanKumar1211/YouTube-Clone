
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import SideBar from "../Components/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ChannelPage({ sideBar }) {
  const userData = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const { id } = useParams();

  const [channelVideos, setChannelVideos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  // ============================
  // 📌 FETCH CHANNEL VIDEOS (Memoized)
  // ============================
  const fetchChannelData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channelapi/channelvideos/${id}`
      );
      setChannelVideos(response.data.video);
    } catch (err) {
      console.log(err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchChannelData();
  }, [fetchChannelData]);

  // ============================
  // 📌 DELETE HANDLER (Memoized)
  // ============================
  const handleDelete = useCallback(
    async (videoId) => {
      console.log("❗ DELETE CLICKED for video ID:", videoId);

      const token = localStorage.getItem("token");
      console.log("TOKEN FOUND:", token);

      // Removed confirm since it was blocking UI
      console.log("⚠️ Confirm disabled — executing delete");

      try {
        const res = await axios.delete(
          `http://localhost:3000/channelapi/deletevideo/${videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { videoId },
          }
        );

        console.log("✅ DELETE RESPONSE RECEIVED:", res.data);

        setChannelVideos((prev) => prev.filter((v) => v._id !== videoId));
        alert("Video deleted successfully!");
      } catch (error) {
        console.log("❌ DELETE ERROR:", error);
        alert("Failed to delete video");
      }
    },
    []
  );

  // ============================
  // 📌 Memoized Channel Info (prevents re-renders)
  // ============================
  const channelInfo = useMemo(
    () => channelVideos[0]?.user,
    [channelVideos]
  );

  return (
    <>
      <div className="flex w-full">
        <SideBar sideBar={sideBar} />

        <div
          className={`flex-1 px-6 pb-10 ${
            sideBar ? "ml-60" : "ml-5"
          } pt-20`}
        >
          {/* CHANNEL BANNER */}
          <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden">
            <img
              src={channelInfo?.channelBanner || userData?.channelBanner}
              className="w-full h-full object-cover"
              alt="Channel Banner"
            />
          </div>

          {/* CHANNEL HEADER */}
          <div className="flex mt-6 items-start gap-4">
            <img
              src={channelInfo?.profilePic || userData?.profilePic}
              className="w-28 h-28 rounded-full object-cover border"
              alt="Channel Icon"
            />

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                {channelInfo?.channelName || userData?.channelName}
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                @{channelInfo?.userName || userData?.userName} •{" "}
                {channelVideos.length} videos
              </p>

              <p className="mt-2 text-sm text-gray-700 max-w-2xl">
                {channelInfo?.about || userData?.about}
              </p>

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

          {/* VIDEO GRID */}
          <div className="grid mt-8 gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {channelVideos.map((item, index) => (
              <VideoCard
                key={item._id}
                item={item}
                index={index}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                userData={userData}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================
// 📌 Memoized Video Card Component
// ============================
const VideoCard = React.memo(
  ({ item, index, menuOpen, setMenuOpen, userData, handleDelete }) => {
    return (
      <div className="cursor-pointer flex flex-col relative">
        {/* SHOW MENU ONLY FOR OWNER */}
        {userData?._id === item?.user?._id && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(menuOpen === index ? null : index);
              }}
              className="absolute right-2 top-2 z-20 bg-white shadow p-1 rounded-full"
            >
              ⋮
            </button>

            {menuOpen === index && (
              <div
                className="absolute right-2 top-10 bg-white border shadow-lg rounded-md z-30 w-28"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() =>
                    (window.location.href = `/edit/${item._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}

        <Link to={`/watch/${item._id}`}>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <img
              src={item.thumbnailUrl}
              className="w-full h-full object-cover"
              alt="Video Thumbnail"
            />
            <span className="absolute right-1 bottom-1 bg-black text-white text-xs px-1 rounded">
              12:45
            </span>
          </div>
        </Link>

        <div className="mt-3 text-sm">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-gray-600 text-xs mt-1">
            {item.user?.channelName}
          </p>
          <p className="text-gray-600 text-xs">
            {item.likesCount} likes • {item.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>
    );
  }
);

export default React.memo(ChannelPage);
