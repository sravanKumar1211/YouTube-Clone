import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function SuggestedCard({ item }) {
  return (
    // Each suggested video links to its watch page using the video ID
    <Link to={`/watch/${item._id}`}>
      <div className="flex gap-2 sm:gap-3 mb-4 cursor-pointer w-full">

        {/* 
           VIDEO THUMBNAIL
           - Fixed width/height for consistency
           - Flex-shrink-0 prevents thumbnail from shrinking*/}
        <div className="
          w-32 h-20 
          sm:w-44 sm:h-28 
          rounded-lg overflow-hidden flex-shrink-0
        ">
          <img
            src={item.thumbnailUrl}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 
           TEXT SECTION (Title, Channel Name, Metadata)
           - line-clamp prevents long titles from overflowing
           - truncate ensures text stays clean on small screens
         */}
        <div className="flex flex-col text-xs sm:text-sm leading-tight min-w-0">

          {/* Video Title */}
          <h3 className="font-semibold line-clamp-2">
            {item.title}
          </h3>

          {/* Channel Name */}
          <p className="text-gray-600 mt-1 truncate">
            {item?.user?.channelName}
          </p>

          {/* Static placeholder for views and upload time
             (Replace with dynamic data when available) */}
          <p className="text-gray-600 truncate">
            100 views · 10 days ago
          </p>
        </div>

      </div>
    </Link>
  );
});
