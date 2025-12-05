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

// Lazy load icons (performance boost)
const AiOutlineLike = lazy(() =>
  import("react-icons/ai").then((m) => ({ default: m.AiOutlineLike }))
);
const BiDislike = lazy(() =>
  import("react-icons/bi").then((m) => ({ default: m.BiDislike }))
);

// Lazy-loaded child components
const CommentCard = lazy(() => import("./VideoCommentCard"));
const SuggestedCard = lazy(() => import("./VideoSuggestedCard"));

function Video() {
  const { id } = useParams();
  const CurrentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [videoData, setVideoData] = useState({});
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [SuggestedVideos, setSuggestedVideos] = useState([]);
  const [userId, setUserId] = useState(null);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [showMenu, setShowMenu] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // ===================== FETCH MAIN VIDEO =====================
  const fetchVideoById = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getvideobyid/${id}`
      );

      const video = response.data.video;
      setVideoData(video);
      setUserId(video?.user?._id);
      setLikes(video?.likesCount || 0);
      setDislikes(video?.dislikesCount || 0);
    } catch (err) {
      console.log(err.message);
    }
  }, [id]);

  // ===================== FETCH COMMENTS =====================
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

  useEffect(() => {
    fetchVideoById();
    commentsByVideoId();
  }, [id, fetchVideoById, commentsByVideoId]);

  // ===================== FETCH SUGGESTED VIDEOS =====================
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

  useEffect(() => {
    if (userId) fetchSuggestedVideos();
  }, [userId, fetchSuggestedVideos]);

  // ===================== COMMENT HANDLERS =====================
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

      setComments((prev) => [response.data.comment, ...prev]);
      setMessage("");
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [message, id, token]);

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

        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? response.data.comment : c))
        );

        setEditingCommentId(null);
        setEditMessage("");
        setShowMenu(null);
        window.location.reload();
      } catch (err) {
        toast.error("Failed to update comment");
      }
    },
    [editMessage, token]
  );

  const handleDeleteComment = useCallback(async () => {
    try {
      await axios.delete(
        `http://localhost:3000/commentapi/comment/${deleteTargetId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments((prev) => prev.filter((c) => c._id !== deleteTargetId));
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
     // window.location.reload();
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  }, [deleteTargetId, token]);

  // ===================== Memoize Lists =====================
  const memoComments = useMemo(() => comments, [comments]);
  const memoSuggested = useMemo(() => SuggestedVideos, [SuggestedVideos]);

  return (
    <>
      <div className="flex justify-center gap-6 pt-6 pb-10 px-4">
        {/* LEFT SECTION */}
        <div className="max-w-[900px] w-full flex flex-col">
          {videoData?.videoUrl && (
            <video
              controls
              autoPlay
              className="w-full h-auto rounded-xl shadow-md"
            >
              <source src={videoData.videoUrl} type="video/mp4" />
            </video>
          )}

          <h2 className="text-xl font-semibold mt-4">{videoData?.title}</h2>

          {/* CHANNEL + LIKE SECTION */}
          <div className="flex justify-between items-start mt-4">
            {/* LEFT: CHANNEL INFO */}
            <div className="flex gap-3 items-start">
              <Link to={`/user/${videoData?.user?._id}`}>
                <img
                  src={videoData?.user?.profilePic}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 text-md">
                  {videoData?.user?.channelName}
                </h3>
                <p className="text-gray-500 text-sm">100K subscribers</p>
              </div>

              <button className="ml-4 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800">
                Subscribe
              </button>
            </div>

            {/* LIKE/DISLIKE */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => {
                  if (!likes) {
                    setLikes(1);
                    if (dislikes) setDislikes(0);
                  } else setLikes(0);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${
                  likes
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-500"
                }`}
              >
                <Suspense>
                  <AiOutlineLike className="text-lg" /> {likes}
                </Suspense>
              </button>

              <button
                onClick={() => {
                  if (!dislikes) {
                    setDislikes(1);
                    if (likes) setLikes(0);
                  } else setDislikes(0);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full ${
                  dislikes
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-500"
                }`}
              >
                <Suspense>
                  <BiDislike className="text-lg" /> {dislikes}
                </Suspense>
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
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

          {/* COMMENT INPUT */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Comments</h3>

            <div className="flex gap-3">
              <img
                src={CurrentUser.profilePic}
                className="w-10 h-10 rounded-full"
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

          {/* COMMENT LIST (Lazy Loaded) */}
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

            {showDeleteConfirm && (
              <div className="absolute right-[50%] top-[60%] z-50">
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

        {/* SUGGESTED VIDEOS RIGHT SIDE */}
        <div className="max-w-[400px] w-full h-[88vh] overflow-y-auto pr-2">
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

export default React.memo(Video);
