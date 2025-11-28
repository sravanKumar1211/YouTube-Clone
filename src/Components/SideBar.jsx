import React from "react";
import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineHistory } from "react-icons/ai";
import { MdPlaylistPlay, MdOutlineWatchLater, MdOutlineOndemandVideo } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { LuGraduationCap } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { PiFilmSlateBold } from "react-icons/pi";
import { CiStreamOn } from "react-icons/ci";
import { SiPodcastindex } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegFlag } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";

import logo from "../assets/youtube.png";
import studio from "../assets/youtube-studio-icon.png";
import music from "../assets/youtube-music-icon.png";
import kids from "../assets/youtube-kids.png";

function SideBar({sideBar}) {
  return (
    <>
        {/* used turnary operator and changed tailwind classes to hidden when sideBar val is false */}
      <div className={sideBar?"w-60 fixed top-[56px] left-0 h-[calc(100vh-56px)] z-50 bg-white overflow-y-auto px-2 py-3 text-sm font-roboto select-none":"hidden"}>

        {/* SECTION 1 */}
        <ul className="space-y-1">
          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <MdHome className="text-xl" /> Home
          </li>
          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <SiYoutubeshorts className="text-xl" /> Shorts
          </li>
        </ul>

        <hr className="my-3" />

        {/* SECTION 2 */}
        <ul className="space-y-1">
          <li className="px-3 py-2 font-semibold text-gray-700">You</li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <AiOutlineHistory className="text-xl" /> History
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <MdPlaylistPlay className="text-xl" /> Playlists
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <MdOutlineWatchLater className="text-xl" /> Watch Later
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <BiLike className="text-xl" /> Liked Videos
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <MdOutlineOndemandVideo className="text-xl" /> Your Videos
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <LuGraduationCap className="text-xl" /> Your Courses
          </li>
        </ul>

        <hr className="my-3" />

        {/* SECTION 3 */}
        <ul className="space-y-1">
          <li className="px-3 py-2 font-semibold text-gray-700">Explore</li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <HiOutlineShoppingBag className="text-xl" /> Shopping
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <CiStreamOn className="text-xl" /> Live
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <SiPodcastindex className="text-xl" /> Podcasts
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <IoMusicalNoteOutline className="text-xl" /> Music
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <PiFilmSlateBold className="text-xl" /> Movies
          </li>
        </ul>

        <hr className="my-3" />

        {/* Section 4: More from YouTube */}
        <ul className="space-y-2">
          <li className="px-3 py-2 font-semibold text-gray-700">More from ProTube</li>

          <li className="flex items-center gap-4 px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <img src={logo} alt="logo" className="h-5" /> ProTube Premium
          </li>

          <li className="flex items-center gap-4 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <img src={studio} className="h-7" /> ProTube Studio
          </li>

          <li className="flex items-center gap-4 px-3 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <img src={music} className="h-5" /> ProTube Music
          </li>

          <li className="flex items-center gap-4 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <img src={kids} className="h-7" /> ProTube Kids
          </li>
        </ul>

        <hr className="my-3" />

        {/* Section 5: Settings */}
        <ul className="space-y-1">
          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <IoSettingsOutline className="text-xl" /> Settings
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <FaRegFlag className="text-xl" /> Report History
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <IoIosHelpCircleOutline className="text-xl" /> Help
          </li>

          <li className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <MdOutlineFeedback className="text-xl" /> Send Feedback
          </li>
        </ul>

        <hr className="my-3" />

        {/* Footer Text */}
        <div className="px-3 text-xs text-gray-600 space-y-2">
          <p>About Press Copyright Contact us Creators Advertise Developers</p>
          <p>Terms Privacy Policy & Safety How YouTube worksTest new features</p>
          <p>© 2025 Sravan LLC</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
