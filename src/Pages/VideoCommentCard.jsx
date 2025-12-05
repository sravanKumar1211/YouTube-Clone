import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

export default React.memo(function CommentCard({
  item,
  CurrentUser,
  editingCommentId,
  setEditingCommentId,
  editMessage,
  setEditMessage,
  showMenu,
  setShowMenu,
  setDeleteTargetId,
  setShowDeleteConfirm,
  handleEditComment
}) {
  return (
    <div className="flex gap-3 relative group">
      <img
        src={item?.user?.profilePic}
        className="w-10 h-10 rounded-full"
      />

      <div className="flex-1">
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
            {/* Comment header */}
            <p className="text-sm leading-tight">
              <span className="font-semibold mr-2">
                {item?.user?.userName}
              </span>
              {item?.message}
            </p>

            <div className="flex justify-between">
              <div className="flex gap-3 text-gray-600 text-lg mt-1">
                <AiOutlineLike className="cursor-pointer" />
                <BiDislike className="cursor-pointer" />
              </div>

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
  );
});
