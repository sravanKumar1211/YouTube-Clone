import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function HomePage({ sideBar }) {
  const [data,setData]=useState([])

   useEffect(()=>{
      axios.get('http://localhost:3000/api/allvideo').then(res=>{
        //console.log(res.data.videos)
        setData(res.data.videos)
      }).catch((err)=>{
        console.log(err);
      })
    })

  const categories = [
    "All","Software","News","Sports","Gaming","Tollywood","Bollywood","Music",
    "Web Development","DSA","AI & ML","Stocks","Podcasts","Movies","History",
    "Fitness","Technology","Trending","Live"
  ];

 

  return (
    <div className=" w-full min-h-screen bg-white mt-[-40px]">

      {/* ------------------ CATEGORY BAR (STICKY) ------------------ */}
      <div className=" sticky top-12  bg-white z-20 py-3">
        <div
          className=" flex overflow-x-auto gap-3 px-3 scrollbar-hide"
          style={{
            paddingLeft: sideBar ? "240px" : "20px", // push content when sidebar visible
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              className="px-4 py-2 bg-gray-100 rounded-xl whitespace-nowrap hover:bg-gray-200"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------ VIDEO GRID ------------------ */}
      <div
        className="pt-5 pb-20"
        style={{
          paddingLeft: sideBar ? "240px" : "20px",  // space for sidebar
          paddingRight: "20px",
        }}
      >
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: sideBar
              ? "repeat(3, minmax(0, 1fr))"   // 3 cards (sidebar open)
              : "repeat(4, minmax(0, 1fr))",  // 4 cards (sidebar closed)
          }}
        >
          {data?.map((item, i) => (
           
            <div key={i} className="cursor-pointer">

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
               <Link to={'/user/12'}>
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
                  <p className="text-xs text-gray-600">{item.user.channelName}</p>
                  <p className="text-xs text-gray-600">100 views • 10 days ago</p>
                </div>
              </div>
              </Link>

            </div>
            
          ))}
        </div>
      </div>

    </div>
  );
}

export default HomePage;
