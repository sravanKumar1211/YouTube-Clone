import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Video() {

  const { id } = useParams();
  const CurrentUser = JSON.parse(localStorage.getItem("user"));
  const [videoData, setVideoData] = useState({});
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [SuggestedVideos, setSuggestedVideos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [likes, setLikes] = useState(videoData?.likesCount || 0);
  const [dislikes, setDislikes] = useState(videoData?.dislikesCount || 0);


  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [showMenu, setShowMenu] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const token = localStorage.getItem("token");


  // ===================== FETCH MAIN VIDEO =====================
  const fetchVideoById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getvideobyid/${id}`
      );

      const video = response.data.video;
      setVideoData(video);

      // extract channel id
      const uid = video?.user?._id;
      setUserId(uid);

    } catch (err) {
      console.log(err.message);
    }
  };



  // ===================== FETCH COMMENTS =====================
  const commentsByVideoId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/commentapi/comment/${id}`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Run when the video id changes
  useEffect(() => {
    fetchVideoById();
    commentsByVideoId();
  }, [id]);

  // ===================== FETCH SUGGESTED VIDEOS =====================
  const fetchSuggestedVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channelapi/channelvideos/${userId}`
      );

      setSuggestedVideos(response.data.video);
      //console.log(response?.data?.video)

    } catch (err) {
      console.log(err.message);
    }
  };

  // Run when userId is available
  useEffect(() => {
    if (userId) {
      fetchSuggestedVideos();
    }
  }, [userId, id]);





  const handleComment = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/commentapi/comment",
        { message, video: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComments(prev => [response.data.comment, ...prev]);
      setMessage("");
      window.location.reload()

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };




  const handleEditComment = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/commentapi/comment/${commentId}`,
        { message: editMessage },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setComments(prev =>
        prev.map(c => c._id === commentId ? response.data.comment : c)
      );

      setEditingCommentId(null);
      setEditMessage("");
      setShowMenu(null);
      window.location.reload()

    } catch (err) {
      console.log(err);
      toast.error("Failed to update comment");
    }
  };





  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/commentapi/comment/${deleteTargetId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setComments(prev => prev.filter(c => c._id !== deleteTargetId));
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
      window.location.reload()

    } catch (err) {
      console.log(err);
      toast.error("Failed to delete comment");
    }
  };





  return (
    <>
      <div className="flex justify-center gap-6 pt-6 pb-10 px-4">

        {/* ---------------- LEFT MAIN VIDEO SECTION ---------------- */}
        <div className="max-w-[900px] w-full flex flex-col">

          {/* VIDEO PLAYER */}
          {videoData?.videoUrl && (
            <video controls autoPlay className="w-full h-auto rounded-xl shadow-md">
              <source src={videoData.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* TITLE */}
          <h2 className="text-xl font-semibold mt-4">
            {videoData?.title}
          </h2>

          {/* ---------------- CHANNEL INFO + LIKE BUTTONS ---------------- */}
          <div className="flex justify-between items-start mt-4">

            {/* LEFT SIDE — CHANNEL INFO */}
            <div className="flex gap-3 items-start">
              <Link to={`/user/${videoData?.user?._id}`}>
                <img
                  src={videoData?.user?.profilePic}
                  alt="channel logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 text-md">
                  {videoData?.user?.channelName}
                </h3>
                <p className="text-gray-500 text-sm">
                  100K subscribers
                </p>
              </div>

              <button className="ml-4 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800">
                Subscribe
              </button>
            </div>

            {/* LIKE / DISLIKE BUTTONS */}
            <div className="flex items-center gap-3 mt-4">

              {/* LIKE BUTTON */}
              <button
                onClick={() => {
                  if (!likes) {
                    setLikes(1);
                    if (dislikes) setDislikes(0);  // remove dislike if active
                  } else {
                    setLikes(0);  // remove like on second click
                  }
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full 
                ${likes ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-500"}`}
              >
                <AiOutlineLike className="text-lg" /> {likes}
              </button>

              {/* DISLIKE BUTTON */}
              <button
                onClick={() => {
                  if (!dislikes) {
                    setDislikes(1);
                    if (likes) setLikes(0);  // remove like if active
                  } else {
                    setDislikes(0); // remove dislike on second click
                  }
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full 
                ${dislikes ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-500"}`}
              >
                <BiDislike className="text-lg" /> {dislikes}
              </button>

            </div>


          </div>   {/* ✅ FIXED: Properly closed the parent div */}



          {/* ---------------- DESCRIPTION BOX ---------------- */}
          <div className="bg-gray-100 rounded-xl p-4 mt-5 text-sm">
            <p className="font-medium">
              100,000 views · {videoData?.createdAt?.slice(0, 10)}
            </p>

            <p className="mt-3 text-gray-800 leading-relaxed">
              {videoData?.description}
              <br />
              {videoData?.tags}
            </p>
          </div>

          {/* ---------------- COMMENT INPUT ---------------- */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Comments</h3>

            <div className="flex gap-3">
              <img
                src={CurrentUser.profilePic}
                className="w-10 h-10 rounded-full"
                alt="user"
              />

              <div className="flex-1">

                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-1"
                />


                <div className="flex justify-end gap-2 mt-2">
                  <button className="px-3 py-1 rounded-full hover:bg-gray-200">
                    Cancel
                  </button>
                  <button className="px-4 py-1 rounded-full bg-black text-white hover:bg-gray-800" onClick={handleComment}>
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- ADVANCED COMMENT LIST ---------------- */}
          <div className="mt-6 space-y-6">
            {comments?.map((item) => (
              <div key={item._id} className="flex gap-3 relative group">

                {/* User Avatar */}
                <img
                  src={item?.user?.profilePic}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">

                  {/* ========== EDIT MODE ========== */}
                  {editingCommentId === item._id ? (
                    <div>
                      <input
                        type="text"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="w-full border-b border-black outline-none py-1"
                      />

                      <div className="flex gap-3 mt-2">
                        <button
                          className="px-4 py-1 bg-gray-200 rounded-full"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditMessage("");
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          className="px-4 py-1 bg-black text-white rounded-full"
                          onClick={() => handleEditComment(item._id)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Comment Header & Message */}
                      <p className="text-sm leading-tight">
                        <span className="font-semibold mr-2">
                          {item?.user?.userName}
                        </span>
                        {item?.message}
                      </p>

                      <div className="flex justify-between">

                        {/* Reaction Icons */}
                        <div className="flex gap-3 text-gray-600 text-lg mt-1">
                          <AiOutlineLike className="cursor-pointer" />
                          <BiDislike className="cursor-pointer" />
                        </div>

                        {/* ========== 3 DOTS MENU (Owner Only) ========== */}
                        {item?.user?._id === CurrentUser?._id && (
                          <div className="relative">
                            <button
                              className="text-2xl px-2"
                              onClick={() =>
                                setShowMenu(showMenu === item._id ? null : item._id)
                              }
                            >
                              ⋮
                            </button>

                            {/* Dropdown */}
                            {showMenu === item._id && (
                              <div className="absolute right-0 top-6 bg-white shadow-md rounded-md w-28 text-sm z-20">
                                <p
                                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                  onClick={() => {
                                    setEditingCommentId(item._id);
                                    setEditMessage(item.message);
                                    setShowMenu(null);
                                  }}
                                >
                                  Edit
                                </p>

                                <p
                                  className="px-4 py-2 hover:bg-gray-200 text-red-600 cursor-pointer"
                                  onClick={() => {
                                    setDeleteTargetId(item._id);
                                    setShowMenu(null);
                                    setShowDeleteConfirm(true);
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}


            {showDeleteConfirm && (
  <div className="absolute right-[50%] top-[50%] z-50">
    <div className="bg-white shadow-xl rounded-lg p-4 w-64 border border-gray-200">
      <h3 className="text-md font-semibold mb-2">Delete Comment?</h3>

      <p className="text-gray-700 text-sm mb-4">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
          onClick={() => setShowDeleteConfirm(false)}
        >
          Cancel
        </button>

        <button
          className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
          onClick={handleDeleteComment}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}



          </div>
        </div>

        {/* ---------------- RIGHT SIDE — SUGGESTED VIDEOS ---------------- */}
        <div className="max-w-[400px] w-full h-[88vh] overflow-y-auto pr-2">

          {SuggestedVideos.map((item, ind) => (
            <Link to={`/watch/${item._id}`} key={ind}>
              <div className="flex gap-3 mb-4 cursor-pointer">

                {/* Thumbnail */}
                <div className="w-44 h-28 rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col text-sm">
                  <h3 className="font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {item?.user?.channelName}
                  </p>
                  <p className="text-xs text-gray-600">
                    100 views · 10 days ago
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default Video;
