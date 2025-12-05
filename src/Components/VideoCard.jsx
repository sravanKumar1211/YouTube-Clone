
import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ item }) {
  return (
    <div className="cursor-pointer w-full">

      <Link to={`/watch/${item._id}`}>
        {/* Thumbnail */}
        <div
          className="
            relative w-full 
            h-40 sm:h-48 md:h-56 lg:h-64 
            bg-gray-200 rounded-xl overflow-hidden
          "
        >
          <img
            src={item.thumbnailUrl}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />

          <span
            className="
              absolute bottom-2 right-2 
              bg-black text-white 
              text-[10px] sm:text-xs 
              px-1.5 py-0.5 sm:px-2 sm:py-1 
              rounded
            "
          >
            35:00
          </span>
        </div>
      </Link>

      {/* Video Info */}
      <Link to={`/user/${item?.user?._id}`}>
        <div className="flex gap-2 sm:gap-3 mt-3">
          <img
            src={item.user.profilePic}
            alt="Channel Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />

          <div className="flex flex-col w-[80%] sm:w-[85%]">
            <h3 className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
              {item.title}
            </h3>

            <p className="text-[10px] sm:text-xs text-gray-600">
              {item.user.channelName}
            </p>

            <p className="text-[10px] sm:text-xs text-gray-600">
              100 views • 10 days ago
            </p>
          </div>
        </div>
      </Link>

    </div>
  );
}

export default React.memo(VideoCard);
