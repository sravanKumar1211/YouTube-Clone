
import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function SuggestedCard({ item }) {
  return (
    <Link to={`/watch/${item._id}`}>
      <div className="flex gap-2 sm:gap-3 mb-4 cursor-pointer w-full">

        {/* THUMBNAIL */}
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

        {/* TEXT SECTION */}
        <div className="flex flex-col text-xs sm:text-sm leading-tight min-w-0">
          <h3 className="font-semibold line-clamp-2">
            {item.title}
          </h3>

          <p className="text-gray-600 mt-1 truncate">
            {item?.user?.channelName}
          </p>

          <p className="text-gray-600 truncate">
            100 views · 10 days ago
          </p>
        </div>

      </div>
    </Link>
  );
});
