import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function SuggestedCard({ item }) {
  return (
    <Link to={`/watch/${item._id}`}>
      <div className="flex gap-3 mb-4 cursor-pointer">
        <div className="w-44 h-28 rounded-lg overflow-hidden">
          <img src={item.thumbnailUrl} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col text-sm">
          <h3 className="font-semibold leading-tight">{item.title}</h3>
          <p className="text-xs text-gray-600">{item?.user?.channelName}</p>
          <p className="text-xs text-gray-600">100 views · 10 days ago</p>
        </div>
      </div>
    </Link>
  );
});
