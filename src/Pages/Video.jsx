
// import React, {
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
//   lazy,
//   Suspense
// } from "react";

// import { Link, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// // Lazy load icons
// const AiOutlineLike = lazy(() =>
//   import("react-icons/ai").then((m) => ({ default: m.AiOutlineLike }))
// );
// const BiDislike = lazy(() =>
//   import("react-icons/bi").then((m) => ({ default: m.BiDislike }))
// );

// const CommentCard = lazy(() => import("./VideoCommentCard"));
// const SuggestedCard = lazy(() => import("./VideoSuggestedCard"));

// function Video() {
//   const { id } = useParams();
//   const CurrentUser = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [videoData, setVideoData] = useState({});
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");
//   const [SuggestedVideos, setSuggestedVideos] = useState([]);
//   const [userId, setUserId] = useState(null);

//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);

//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editMessage, setEditMessage] = useState("");
//   const [showMenu, setShowMenu] = useState(null);

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteTargetId, setDeleteTargetId] = useState(null);

//   // ===================== FETCH MAIN VIDEO =====================
//   const fetchVideoById = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/getvideobyid/${id}`
//       );

//       const video = response.data.video;
//       setVideoData(video);
//       setUserId(video?.user?._id);
//       setLikes(video?.likesCount || 0);
//       setDislikes(video?.dislikesCount || 0);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }, [id]);

//   // ===================== FETCH COMMENTS =====================
//   const commentsByVideoId = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/commentapi/comment/${id}`
//       );
//       setComments(response.data.comments);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchVideoById();
//     commentsByVideoId();
//   }, [id, fetchVideoById, commentsByVideoId]);

//   // ===================== FETCH SUGGESTED VIDEOS =====================
//   const fetchSuggestedVideos = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/channelapi/channelvideos/${userId}`
//       );
//       setSuggestedVideos(response.data.video);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) fetchSuggestedVideos();
//   }, [userId, fetchSuggestedVideos]);

//   // =============== COMMENT HANDLERS ===============
//   const handleComment = useCallback(async () => {
//     if (!message.trim()) return;

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/commentapi/comment",
//         { message, video: id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setComments((prev) => [response.data.comment, ...prev]);
//       setMessage("");
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   }, [message, id, token]);

//   const handleEditComment = useCallback(
//     async (commentId) => {
//       try {
//         const response = await axios.put(
//           `http://localhost:3000/commentapi/comment/${commentId}`,
//           { message: editMessage },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setComments((prev) =>
//           prev.map((c) => (c._id === commentId ? response.data.comment : c))
//         );

//         setEditingCommentId(null);
//         setEditMessage("");
//         setShowMenu(null);
//       } catch (err) {
//         toast.error("Failed to update comment");
//       }
//     },
//     [editMessage, token]
//   );

//   const handleDeleteComment = useCallback(async () => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/commentapi/comment/${deleteTargetId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setComments((prev) => prev.filter((c) => c._id !== deleteTargetId));
//       setShowDeleteConfirm(false);
//       setDeleteTargetId(null);
//     } catch (err) {
//       toast.error("Failed to delete comment");
//     }
//   }, [deleteTargetId, token]);

//   const memoComments = useMemo(() => comments, [comments]);
//   const memoSuggested = useMemo(() => SuggestedVideos, [SuggestedVideos]);

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row justify-center gap-6 pt-6 pb-10 px-4">

//         {/* LEFT SECTION */}
//         <div className="w-full lg:max-w-[900px] flex flex-col">

//           {/* VIDEO PLAYER */}
//           {videoData?.videoUrl && (
//             <video
//               controls
//               autoPlay
//               className="w-full rounded-xl shadow-md max-h-[60vh] object-cover"
//             >
//               <source src={videoData.videoUrl} type="video/mp4" />
//             </video>
//           )}

//           {/* TITLE */}
//           <h2 className="text-lg sm:text-xl font-semibold mt-4">
//             {videoData?.title}
//           </h2>

//           {/* CHANNEL + LIKE SECTION */}
//           <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-4 gap-4">

//             {/* CHANNEL */}
//             <div className="flex gap-3 items-start">
//               <Link to={`/user/${videoData?.user?._id}`}>
//                 <img
//                   src={videoData?.user?.profilePic}
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
//                 />
//               </Link>

//               <div>
//                 <h3 className="font-semibold text-gray-900 text-sm sm:text-md">
//                   {videoData?.user?.channelName}
//                 </h3>
//                 <p className="text-gray-500 text-xs sm:text-sm">
//                   100K subscribers
//                 </p>
//               </div>

//               <button className="ml-0 sm:ml-4 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800">
//                 Subscribe
//               </button>
//             </div>

//             {/* LIKE / DISLIKE */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => {
//                   if (!likes) {
//                     setLikes(1);
//                     if (dislikes) setDislikes(0);
//                   } else setLikes(0);
//                 }}
//                 className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-md ${
//                   likes ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                 <Suspense>
//                   <AiOutlineLike className="text-base sm:text-lg" /> {likes}
//                 </Suspense>
//               </button>

//               <button
//                 onClick={() => {
//                   if (!dislikes) {
//                     setDislikes(1);
//                     if (likes) setLikes(0);
//                   } else setDislikes(0);
//                 }}
//                 className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-md ${
//                   dislikes
//                     ? "bg-black text-white"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                 <Suspense>
//                   <BiDislike className="text-base sm:text-lg" /> {dislikes}
//                 </Suspense>
//               </button>
//             </div>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="bg-gray-100 rounded-xl p-4 mt-5 text-sm">
//             <p className="font-medium">
//               100,000 views · {videoData?.createdAt?.slice(0, 10)}
//             </p>

//             <p className="mt-3 text-gray-800 leading-relaxed text-xs sm:text-sm">
//               {videoData?.description}
//               <br />
//               {videoData?.tags}
//             </p>
//           </div>

//           {/* COMMENT INPUT */}
//           <div className="mt-6">
//             <h3 className="font-semibold text-lg mb-3">Comments</h3>

//             <div className="flex gap-3">
//               <img
//                 src={CurrentUser.profilePic}
//                 className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
//               />

//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="w-full border-b border-gray-300 focus:border-black outline-none py-1 text-sm"
//                 />

//                 <div className="flex justify-end gap-2 mt-2">
//                   <button className="px-3 py-1 rounded-full hover:bg-gray-200">
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-1 rounded-full bg-black text-white hover:bg-gray-800"
//                     onClick={handleComment}
//                   >
//                     Comment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* COMMENT LIST */}
//           <div className="mt-6 space-y-6">
//             {memoComments.map((item) => (
//               <Suspense
//                 key={item._id}
//                 fallback={<div className="h-10 bg-gray-200 animate-pulse" />}
//               >
//                 <CommentCard
//                   item={item}
//                   CurrentUser={CurrentUser}
//                   editingCommentId={editingCommentId}
//                   setEditingCommentId={setEditingCommentId}
//                   editMessage={editMessage}
//                   setEditMessage={setEditMessage}
//                   showMenu={showMenu}
//                   setShowMenu={setShowMenu}
//                   setDeleteTargetId={setDeleteTargetId}
//                   setShowDeleteConfirm={setShowDeleteConfirm}
//                   handleEditComment={handleEditComment}
//                 />
//               </Suspense>
//             ))}

//             {/* Delete Modal */}
//             {showDeleteConfirm && (
//               <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 px-4">
//                 <div className="bg-white shadow-xl rounded-lg p-4 w-64 border border-gray-200">
//                   <h3 className="text-md font-semibold mb-2">
//                     Delete Comment?
//                   </h3>

//                   <p className="text-gray-700 text-sm mb-4">
//                     This action cannot be undone.
//                   </p>

//                   <div className="flex justify-end gap-2">
//                     <button
//                       className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
//                       onClick={() => setShowDeleteConfirm(false)}
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
//                       onClick={handleDeleteComment}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE – SUGGESTED VIDEOS */}
//         <div className="w-full lg:max-w-[400px] lg:h-[88vh] overflow-y-auto pr-0 lg:pr-2 mt-10 lg:mt-0">
//           {memoSuggested.map((item, ind) => (
//             <Suspense
//               key={ind}
//               fallback={<div className="w-full h-24 bg-gray-200 animate-pulse" />}
//             >
//               <SuggestedCard item={item} />
//             </Suspense>
//           ))}
//         </div>

//         <ToastContainer />
//       </div>
//     </>
//   );
// }

// export default Video;






import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense
} from "react";

import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

// Lazy load icons to reduce initial bundle size
const AiOutlineLike = lazy(() =>
  import("react-icons/ai").then((m) => ({ default: m.AiOutlineLike }))
);
const BiDislike = lazy(() =>
  import("react-icons/bi").then((m) => ({ default: m.BiDislike }))
);

// Lazy-loaded components for comments & suggestions
const CommentCard = lazy(() => import("./VideoCommentCard"));
const SuggestedCard = lazy(() => import("./VideoSuggestedCard"));

function Video() {
  // Extract video ID from URL
  const { id } = useParams();

  // Current logged-in user & token from localStorage
  const CurrentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ===================== STATE MANAGEMENT =====================
  const [videoData, setVideoData] = useState({});      // Selected video details
  const [comments, setComments] = useState([]);        // All comments for this video
  const [message, setMessage] = useState("");          // New comment input
  const [SuggestedVideos, setSuggestedVideos] = useState([]); // Suggested videos list
  const [userId, setUserId] = useState(null);          // Channel ID of video owner

  // Likes / Dislikes UI counters
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // States for editing comments
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  // Shows comment menu (... menu per comment)
  const [showMenu, setShowMenu] = useState(null);

  // Delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // ============================================================
  // FETCH THE MAIN VIDEO BY ID
  // ============================================================
  const fetchVideoById = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getvideobyid/${id}`
      );

      const video = response.data.video;
      setVideoData(video);

      // Save channel ID for suggested videos
      setUserId(video?.user?._id);

      // Set like/dislike counts
      setLikes(video?.likesCount || 0);
      setDislikes(video?.dislikesCount || 0);

    } catch (err) {
      console.log(err.message);
    }
  }, [id]);

  // ============================================================
  // FETCH ALL COMMENTS FOR THE VIDEO
  // ============================================================
  const commentsByVideoId = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/commentapi/comment/${id}`
      );
      setComments(response.data.comments);
    } catch (err) {
      console.log(err.message);
    }
  }, [id]);

  // Fetch video + comments on mount or when ID changes
  useEffect(() => {
    fetchVideoById();
    commentsByVideoId();
  }, [id, fetchVideoById, commentsByVideoId]);

  // ============================================================
  // FETCH SUGGESTED VIDEOS BY SAME CHANNEL
  // ============================================================
  const fetchSuggestedVideos = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/channelapi/channelvideos/${userId}`
      );
      setSuggestedVideos(response.data.video);
    } catch (err) {
      console.log(err.message);
    }
  }, [userId]);

  // Fetch suggested videos when the channel owner ID is available
  useEffect(() => {
    if (userId) fetchSuggestedVideos();
  }, [userId, fetchSuggestedVideos]);

  // ============================================================
  // ADD A NEW COMMENT
  // ============================================================
  const handleComment = useCallback(async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/commentapi/comment",
        { message, video: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add new comment at the top (optimistic update)
      setComments((prev) => [response.data.comment, ...prev]);
      setMessage("");

    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [message, id, token]);

  // ============================================================
  // EDIT EXISTING COMMENT
  // ============================================================
  const handleEditComment = useCallback(
    async (commentId) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/commentapi/comment/${commentId}`,
          { message: editMessage },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update comment locally
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? response.data.comment : c))
        );

        // Reset states
        setEditingCommentId(null);
        setEditMessage("");
        setShowMenu(null);
      } catch (err) {
        toast.error("Failed to update comment");
      }
    },
    [editMessage, token]
  );

  // ============================================================
  // DELETE A COMMENT
  // ============================================================
  const handleDeleteComment = useCallback(
    async () => {
      try {
        await axios.delete(
          `http://localhost:3000/commentapi/comment/${deleteTargetId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Remove deleted comment from UI
        setComments((prev) => prev.filter((c) => c._id !== deleteTargetId));

        // Close modal
        setShowDeleteConfirm(false);
        setDeleteTargetId(null);
      } catch (err) {
        toast.error("Failed to delete comment");
      }
    },
    [deleteTargetId, token]
  );

  // Memoize comments & suggestions for performance
  const memoComments = useMemo(() => comments, [comments]);
  const memoSuggested = useMemo(() => SuggestedVideos, [SuggestedVideos]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-6 pt-6 pb-10 px-4">

        {/* ===================================================== */}
        {/* LEFT SECTION → MAIN VIDEO + COMMENTS */}
        {/* ===================================================== */}
        <div className="w-full lg:max-w-[900px] flex flex-col">

          {/* VIDEO PLAYER */}
          {videoData?.videoUrl && (
            <video
              controls
              autoPlay
              className="w-full rounded-xl shadow-md max-h-[60vh] object-cover"
            >
              <source src={videoData.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* VIDEO TITLE */}
          <h2 className="text-lg sm:text-xl font-semibold mt-4">
            {videoData?.title}
          </h2>

          {/* ===================================================== */}
          {/* CHANNEL SECTION + LIKE/DISLIKE BUTTONS */}
          {/* ===================================================== */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-4 gap-4">

            {/* CHANNEL INFO */}
            <div className="flex gap-3 items-start">
              <Link to={`/user/${videoData?.user?._id}`}>
                <img
                  src={videoData?.user?.profilePic}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
              </Link>

              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-md">
                  {videoData?.user?.channelName}
                </h3>

                {/* Static placeholder — You can replace with DB data later */}
                <p className="text-gray-500 text-xs sm:text-sm">
                  100K subscribers
                </p>
              </div>

              {/* SUBSCRIBE BUTTON */}
              <button className="ml-0 sm:ml-4 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800">
                Subscribe
              </button>
            </div>

            {/* LIKE / DISLIKE BUTTONS (UI Only) */}
            <div className="flex items-center gap-3">
              
              {/* LIKE BUTTON */}
              <button
                onClick={() => {
                  if (!likes) {
                    setLikes(1);
                    if (dislikes) setDislikes(0);
                  } else setLikes(0);
                }}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-md ${
                  likes ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <Suspense>
                  <AiOutlineLike className="text-base sm:text-lg" /> {likes}
                </Suspense>
              </button>

              {/* DISLIKE BUTTON */}
              <button
                onClick={() => {
                  if (!dislikes) {
                    setDislikes(1);
                    if (likes) setLikes(0);
                  } else setDislikes(0);
                }}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-md ${
                  dislikes
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <Suspense>
                  <BiDislike className="text-base sm:text-lg" /> {dislikes}
                </Suspense>
              </button>
            </div>
          </div>

          {/* ===================================================== */}
          {/* VIDEO DESCRIPTION */}
          {/* ===================================================== */}
          <div className="bg-gray-100 rounded-xl p-4 mt-5 text-sm">
            <p className="font-medium">
              100,000 views · {videoData?.createdAt?.slice(0, 10)}
            </p>

            <p className="mt-3 text-gray-800 leading-relaxed text-xs sm:text-sm">
              {videoData?.description}
              <br />
              {videoData?.tags}
            </p>
          </div>

          {/* ===================================================== */}
          {/* ADD COMMENT INPUT */}
          {/* ===================================================== */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Comments</h3>

            <div className="flex gap-3">

              {/* USER AVATAR */}
              <img
                src={CurrentUser.profilePic}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />

              {/* COMMENT INPUT FIELD */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-1 text-sm"
                />

                {/* ACTION BUTTONS */}
                <div className="flex justify-end gap-2 mt-2">
                  <button className="px-3 py-1 rounded-full hover:bg-gray-200">
                    Cancel
                  </button>

                  <button
                    className="px-4 py-1 rounded-full bg-black text-white hover:bg-gray-800"
                    onClick={handleComment}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================== */}
          {/* COMMENT LIST */}
          {/* ===================================================== */}
          <div className="mt-6 space-y-6">
            {memoComments.map((item) => (
              <Suspense
                key={item._id}
                fallback={<div className="h-10 bg-gray-200 animate-pulse" />}
              >
                <CommentCard
                  item={item}
                  CurrentUser={CurrentUser}
                  editingCommentId={editingCommentId}
                  setEditingCommentId={setEditingCommentId}
                  editMessage={editMessage}
                  setEditMessage={setEditMessage}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  setDeleteTargetId={setDeleteTargetId}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                  handleEditComment={handleEditComment}
                />
              </Suspense>
            ))}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 px-4">
                <div className="bg-white shadow-xl rounded-lg p-4 w-64 border border-gray-200">

                  <h3 className="text-md font-semibold mb-2">
                    Delete Comment?
                  </h3>

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

        {/* ===================================================== */}
        {/* RIGHT SECTION → SUGGESTED VIDEOS LIST */}
        {/* ===================================================== */}
        <div className="w-full lg:max-w-[400px] lg:h-[88vh] overflow-y-auto pr-0 lg:pr-2 mt-10 lg:mt-0">
          {memoSuggested.map((item, ind) => (
            <Suspense
              key={ind}
              fallback={<div className="w-full h-24 bg-gray-200 animate-pulse" />}
            >
              <SuggestedCard item={item} />
            </Suspense>
          ))}
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Video;
