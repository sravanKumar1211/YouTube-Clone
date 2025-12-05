// import React from "react";
// import { AiOutlineLike } from "react-icons/ai";
// import { BiDislike } from "react-icons/bi";

// export default React.memo(function CommentCard({
//   item,
//   CurrentUser,
//   editingCommentId,
//   setEditingCommentId,
//   editMessage,
//   setEditMessage,
//   showMenu,
//   setShowMenu,
//   setDeleteTargetId,
//   setShowDeleteConfirm,
//   handleEditComment
// }) {
//   return (
//     <div className="flex gap-2 sm:gap-3 relative group w-full">

//       {/* USER IMAGE */}
//       <img
//         src={item?.user?.profilePic}
//         className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//       />

//       <div className="flex-1 min-w-0">

//         {editingCommentId === item._id ? (
//           <div>

//             <input
//               type="text"
//               value={editMessage}
//               onChange={(e) => setEditMessage(e.target.value)}
//               className="w-full border-b border-black outline-none py-1 text-sm sm:text-base"
//             />

//             <div className="flex gap-2 sm:gap-3 mt-2">
//               <button
//                 className="px-3 sm:px-4 py-1 bg-gray-200 rounded-full text-xs sm:text-sm"
//                 onClick={() => {
//                   setEditingCommentId(null);
//                   setEditMessage("");
//                 }}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="px-3 sm:px-4 py-1 bg-black text-white rounded-full text-xs sm:text-sm"
//                 onClick={() => handleEditComment(item._id)}
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         ) : (
//           <>

//             {/* COMMENT TEXT */}
//             <p className="text-sm sm:text-base leading-tight break-words">
//               <span className="font-semibold mr-2 text-xs sm:text-sm">
//                 {item?.user?.userName}
//               </span>
//               {item?.message}
//             </p>

//             {/* LIKE + MENU */}
//             <div className="flex justify-between items-center mt-1">

//               {/* LIKE/DISLIKE */}
//               <div className="flex gap-2 sm:gap-3 text-gray-600 text-base sm:text-lg mt-1">
//                 <AiOutlineLike className="cursor-pointer" />
//                 <BiDislike className="cursor-pointer" />
//               </div>

//               {/* MENU FOR OWNER */}
//               {item?.user?._id === CurrentUser?._id && (
//                 <div className="relative">

//                   <button
//                     className="text-xl sm:text-2xl px-2"
//                     onClick={() =>
//                       setShowMenu(showMenu === item._id ? null : item._id)
//                     }
//                   >
//                     ⋮
//                   </button>

//                   {showMenu === item._id && (
//                     <div className="
//                       absolute right-0 top-6 
//                       bg-white shadow-md rounded-md 
//                       w-24 sm:w-28 
//                       text-xs sm:text-sm 
//                       z-20
//                     ">
//                       <p
//                         className="px-3 sm:px-4 py-2 hover:bg-gray-200 cursor-pointer"
//                         onClick={() => {
//                           setEditingCommentId(item._id);
//                           setEditMessage(item.message);
//                           setShowMenu(null);
//                         }}
//                       >
//                         Edit
//                       </p>

//                       <p
//                         className="px-3 sm:px-4 py-2 hover:bg-gray-200 text-red-600 cursor-pointer"
//                         onClick={() => {
//                           setDeleteTargetId(item._id);
//                           setShowMenu(null);
//                           setShowDeleteConfirm(true);
//                         }}
//                       >
//                         Delete
//                       </p>
//                     </div>
//                   )}

//                 </div>
//               )}

//             </div>

//           </>
//         )}

//       </div>
//     </div>
//   );
// });










import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

export default React.memo(function CommentCard({
  item,                   // The individual comment object
  CurrentUser,            // Logged-in user info
  editingCommentId,       // ID of the comment currently being edited
  setEditingCommentId,    // Setter for editing state
  editMessage,            // Value of the input when editing a comment
  setEditMessage,         // Setter for editing input field
  showMenu,               // ID of the comment whose menu is open
  setShowMenu,            // Setter to toggle menu
  setDeleteTargetId,      // Sets the ID of comment to delete
  setShowDeleteConfirm,   // Opens delete confirmation modal
  handleEditComment       // Function to save edited comment
}) {
  return (
    <div className="flex gap-2 sm:gap-3 relative group w-full">

      {/* --------------------------------------------------------
         USER PROFILE IMAGE (Comment Owner)
      --------------------------------------------------------- */}
      <img
        src={item?.user?.profilePic}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0">

        {/* --------------------------------------------------------
           EDIT MODE: If the comment is currently editable
        --------------------------------------------------------- */}
        {editingCommentId === item._id ? (
          <div>

            {/* INPUT FIELD FOR EDITING COMMENT */}
            <input
              type="text"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full border-b border-black outline-none py-1 text-sm sm:text-base"
            />

            {/* ACTION BUTTONS: Cancel / Save */}
            <div className="flex gap-2 sm:gap-3 mt-2">
              <button
                className="px-3 sm:px-4 py-1 bg-gray-200 rounded-full text-xs sm:text-sm"
                onClick={() => {
                  setEditingCommentId(null);   // Exit edit mode
                  setEditMessage("");          // Clear input field
                }}
              >
                Cancel
              </button>

              <button
                className="px-3 sm:px-4 py-1 bg-black text-white rounded-full text-xs sm:text-sm"
                onClick={() => handleEditComment(item._id)}
              >
                Save
              </button>
            </div>

          </div>

        ) : (
          <>
            {/* --------------------------------------------------------
               NORMAL MODE: Shows comment text + username
            --------------------------------------------------------- */}
            <p className="text-sm sm:text-base leading-tight break-words">
              <span className="font-semibold mr-2 text-xs sm:text-sm">
                {item?.user?.userName}
              </span>
              {item?.message}
            </p>

            {/* --------------------------------------------------------
               LIKE / DISLIKE + OPTIONS (Menu)
            --------------------------------------------------------- */}
            <div className="flex justify-between items-center mt-1">

              {/* LIKE & DISLIKE ICONS (Visual only, no logic yet) */}
              <div className="flex gap-2 sm:gap-3 text-gray-600 text-base sm:text-lg mt-1">
                <AiOutlineLike className="cursor-pointer" />
                <BiDislike className="cursor-pointer" />
              </div>

              {/* --------------------------------------------------------
                 COMMENT MENU (Only for comment owner)
                 Shows: Edit | Delete
              --------------------------------------------------------- */}
              {item?.user?._id === CurrentUser?._id && (
                <div className="relative">

                  {/* BUTTON TO TOGGLE MENU */}
                  <button
                    className="text-xl sm:text-2xl px-2"
                    onClick={() =>
                      setShowMenu(showMenu === item._id ? null : item._id)
                    }
                  >
                    ⋮
                  </button>

                  {/* DROPDOWN MENU */}
                  {showMenu === item._id && (
                    <div className="
                      absolute right-0 top-6 
                      bg-white shadow-md rounded-md 
                      w-24 sm:w-28 
                      text-xs sm:text-sm 
                      z-20
                    ">

                      {/* EDIT COMMENT OPTION */}
                      <p
                        className="px-3 sm:px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setEditingCommentId(item._id); // Switch to edit mode
                          setEditMessage(item.message);   // Pre-fill with old text
                          setShowMenu(null);              // Close menu
                        }}
                      >
                        Edit
                      </p>

                      {/* DELETE COMMENT OPTION */}
                      <p
                        className="px-3 sm:px-4 py-2 hover:bg-gray-200 text-red-600 cursor-pointer"
                        onClick={() => {
                          setDeleteTargetId(item._id);     // Set target for deletion
                          setShowMenu(null);               // Close menu
                          setShowDeleteConfirm(true);      // Open delete modal
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
