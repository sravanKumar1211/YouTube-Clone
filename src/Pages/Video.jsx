import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { Link } from "react-router-dom";

function Video() {
  const SuggestedVideos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const[comments,SetComments]=useState("")
  console.log(comments)

  return (
    <>
      <div className="flex justify-center gap-6 pt-6 pb-10 px-4">

        {/* ---------------- LEFT MAIN VIDEO SECTION ---------------- */}
        <div className="max-w-[900px] w-full flex flex-col">

          {/* VIDEO PLAYER */}
          <div className="w-full">
            <video controls autoPlay className="w-full h-auto rounded-xl shadow-md">
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold mt-4">
            Demo Video Title Sample
          </h2>

          {/* ---------------- CHANNEL INFO + LIKE BUTTONS ---------------- */}
          <div className="flex justify-between items-start mt-4">

            {/* LEFT SIDE — CHANNEL INFO */}
            <div className="flex gap-3 items-start">
                <Link to={'/user/12'}>
              <img
                src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
                alt="channel logo"
                className="w-12 h-12 rounded-full object-cover"
              />
                </Link>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 text-md">
                  Channel Name
                </h3>
                <p className="text-gray-500 text-sm">
                  100K subscribers
                </p>
              </div>

              <button className="ml-4 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800">
                Subscribe
              </button>
            </div>

            {/* RIGHT SIDE — LIKE / DISLIKE */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full">
                <AiOutlineLike className="text-lg" /> 100
              </button>

              <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full">
                <BiDislike className="text-lg" />
              </button>
            </div>
          </div>

          {/* ---------------- DESCRIPTION BOX ---------------- */}
          <div className="bg-gray-100 rounded-xl p-4 mt-5 text-sm">
            <p className="font-medium">100,000 views · Jan 1, 2025</p>

            <p className="mt-3 text-gray-800 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
              illum ducimus repellat reiciendis id debitis sit sint perspiciatis
              accusantium qui veritatis illo, ipsa eaque assumenda fuga earum
              soluta dolores!
            </p>
          </div>

          {/* ---------------- COMMENT INPUT ---------------- */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Comments</h3>

            <div className="flex gap-3">
              <img
                src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
                className="w-10 h-10 rounded-full"
                alt="user"
              />

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comments} onChange={(e)=>{SetComments(e.target.value)}}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
                />

                <div className="flex justify-end gap-2 mt-2">
                  <button className="px-3 py-1 rounded-full hover:bg-gray-200">
                    Cancel
                  </button>
                  <button className="px-4 py-1 rounded-full bg-black text-white hover:bg-gray-800">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- OLD COMMENTS ---------------- */}
          <div className="mt-6 space-y-5">

            <div className="flex gap-3">
              <img
                src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
                className="w-10 h-10 rounded-full"
                alt="user"
              />

              <div>
                <p className="text-sm">
                  <span className="font-semibold mr-2">User123</span>
                  Nice Video!
                </p>

                <div className="flex gap-2 text-gray-600 mt-1">
                  <AiOutlineLike /> <BiDislike />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ---------------- RIGHT SIDE — SUGGESTED VIDEOS ---------------- */}
        <div className="max-w-[400px] w-full h-[88vh] overflow-y-auto pr-2">

          {SuggestedVideos.map((item, ind) => (
            <div key={ind} className="flex gap-3 mb-4 cursor-pointer">

              {/* Thumbnail */}
              <div className="w-44 h-28 rounded-lg overflow-hidden">
                <img
                src="https://cdn.fliki.ai/image/page/660ba680adaa44a37532fd97/6663112070e1cfda27f86585.jpg"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col text-sm">
                <h3 className="font-semibold leading-tight">
                  Suggested Video {item}
                </h3>
                <p className="text-xs text-gray-600">Channel Name</p>
                <p className="text-xs text-gray-600">100 views · 10 days ago</p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Video;
