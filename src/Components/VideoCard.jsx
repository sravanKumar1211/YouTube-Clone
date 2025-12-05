
import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ item }) {
  return (
    <div className="cursor-pointer">
      <Link to={`/watch/${item._id}`}>
        {/* Thumbnail */}
        <div className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
          <img
            src={item.thumbnailUrl}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
            35:00
          </span>
        </div>
      </Link>

      {/* Video Info */}
      <Link to={`/user/${item?.user?._id}`}>
        <div className="flex gap-3 mt-3">
          <img
            src={item.user.profilePic}
            alt="Channel Icon"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600">
              {item.user.channelName}
            </p>
            <p className="text-xs text-gray-600">
              100 views • 10 days ago
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default React.memo(VideoCard);
