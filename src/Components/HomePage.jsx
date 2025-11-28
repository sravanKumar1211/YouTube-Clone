
import React from "react";

function HomePage() {
  const categories = ["All","Software","News","Sports","Gaming","Tollywood","Bollywood","Music","Web Development","DSA","AI & ML","Stocks",
    "Podcasts","Movies","History","Fitness","Technology","Trending","Live"];

  return (
    <>
      <div className="ml-60 px-4 py-2 mt-[-40px]">

        {/* Horizontal Scroll Category Bar */}
        <div className="flex overflow-x-auto space-x-3 py-2">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-100 rounded-xl whitespace-nowrap text-sm cursor-pointer hover:bg-gray-200"
            >
              {cat}
            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default HomePage;
