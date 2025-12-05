import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function VideoUpload() {

  // Extract videoId from URL — if present → Edit Mode
  const { videoId } = useParams();

  // Navigation hook to redirect after upload/update
  const navigate = useNavigate();

  // Cloudinary credentials for file uploads
  const CLOUD_NAME = "dzdurdxzw";
  const UPLOAD_PRESET = "youtube-clone";

  
  // FORM STATE — Stores all fields for upload / edit
  
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    tags: "",
    audience: "",
    monetization: false,
    license: "",
    visibility: "",
    category: "",
    date: "",
    checks: "",
    more: "",
  });

  
  // EDIT MODE — Load existing video if videoId is present
  
  useEffect(() => {
    if (!videoId) return; // Not in edit mode, skip

    const loadVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getvideobyid/${videoId}`
        );

        const v = res.data.video;

        // Populate form with existing video data
        setVideoData({
          title: v.title,
          description: v.description,
          videoUrl: v.videoUrl,
          thumbnailUrl: v.thumbnailUrl,
          tags: v.tags.join(", "),       // convert array back to string
          audience: v.audience,
          monetization: v.monetization,
          license: v.license,
          visibility: v.visibility,
          category: v.category,
          date: v.date?.slice(0, 10),     // convert to yyyy-mm-dd
          checks: v.checks,
          more: v.more,
        });
      } catch (err) {
        console.log("Error loading video:", err);
      }
    };

    loadVideo();
  }, [videoId]);

  
  // INPUT HANDLER — Updates text/radio/checkbox inputs
  
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setVideoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // checkbox uses boolean
    }));
  }, []);

  
  // CLOUDINARY UPLOAD (video or image)
  
  const uploadToCloudinary = useCallback(async (file, type) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    // Cloudinary upload URL depending on file type
    const url =
      type === "video"
        ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
        : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const res = await axios.post(url, form);
    return res.data.secure_url; // return the uploaded file url
  }, []);

  
  // FILE UPLOAD HANDLER → Uploads to Cloudinary & updates state
  
  const handleFileUpload = useCallback(
    async (e, fieldType) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Upload based on type
      const uploadedUrl = await uploadToCloudinary(
        file,
        fieldType === "videoUrl" ? "video" : "image"
      );

      // Save uploaded URL in state
      setVideoData((prev) => ({
        ...prev,
        [fieldType]: uploadedUrl,
      }));
    },
    [uploadToCloudinary]
  );

  
  // SUBMIT HANDLER — For both Upload and Update
  
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("token");

      // Prepare payload
      const payload = {
        ...videoData,
        title: videoData.title.trim(),
        tags:
          videoData.tags
            ?.split(",")
            .map((t) => t.trim())
            .filter(Boolean) || [], // convert CSV to array
      };

      try {
        // EDIT EXISTING VIDEO
        if (videoId) {
          await axios.put(
            `http://localhost:3000/channelapi/updatevideo/${videoId}`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("Video updated successfully!");
          navigate(`/user/${JSON.parse(localStorage.getItem("user"))._id}`);
          return;
        }

        // UPLOAD NEW VIDEO
        await axios.post("http://localhost:3000/api/video", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Video uploaded successfully!");
        navigate(`/user/${JSON.parse(localStorage.getItem("user"))._id}`);

      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    },
    [videoData, videoId, navigate]
  );

  // Dropdown list options
  const categoryOptions = useMemo(
    () => ["Education", "Entertainment", "Music", "Blog"],
    []
  );

  const licenseOptions = useMemo(
    () => ["standard", "creativeCommons"],
    []
  );

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 sm:p-6">

      {/* FORM CONTAINER */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-6xl mx-auto bg-white rounded-xl shadow 
          border border-gray-200 
          w-full
        "
      >
        {/*
           HEADER SECTION → Title + Publish/Cancel Buttons */}
        <div className="
          flex flex-col sm:flex-row 
          items-start sm:items-center 
          justify-between 
          px-4 sm:px-6 
          py-4 
          gap-3 sm:gap-0 
          border-b
        ">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Upload / Edit Video
          </h2>

          {/* PUBLISH + CANCEL BUTTONS */}
          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              className="
                px-4 py-2 
                rounded-full 
                border border-gray-300 
                text-sm 
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-5 py-2 
                rounded-full 
                bg-blue-600 
                text-white text-sm 
                font-medium 
                hover:bg-blue-700
              "
            >
              Publish
            </button>
          </div>
        </div>

        {/* 
           MAIN GRID — Two Column Layout */}
        <div className="grid grid-cols-12 gap-6 px-4 sm:px-6 py-6">

          {/* 
             LEFT COLUMN — Video, Title, Description, Thumbnail, Tags */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* VIDEO UPLOAD SECTION */}
            <div className="border rounded-xl p-4 sm:p-5 bg-gray-50 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Video file
              </label>

              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">

                {/* VIDEO PREVIEW AREA */}
                <div className="
                  w-full md:w-[420px] 
                  h-[180px] sm:h-[220px] md:h-[240px]
                  bg-black 
                  rounded-xl overflow-hidden 
                  flex items-center justify-center 
                  text-gray-300 text-xs
                ">
                  {videoData.videoUrl ? (
                    <video
                      src={videoData.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Video preview"
                  )}
                </div>

                {/* VIDEO UPLOAD BUTTON */}
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Upload MP4 videos.
                  </p>

                  <label className="
                    inline-flex items-center gap-2 
                    px-4 py-2 
                    bg-white border border-gray-300 
                    rounded-full cursor-pointer 
                    text-sm shadow-sm 
                    hover:bg-gray-100
                  ">
                    <input
                      type="file"
                      className="sr-only"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, "videoUrl")}
                    />
                    <span>Upload video</span>
                  </label>
                </div>

              </div>
            </div>

            {/* TITLE INPUT */}
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={videoData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* DESCRIPTION INPUT */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={videoData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-sm min-h-[120px]"
              />
            </div>

            {/* THUMBNAIL SECTION */}
            <div>
              <label className="block text-sm font-medium">Thumbnail</label>

              <div className="flex flex-col sm:flex-row items-start gap-4">

                {/* THUMBNAIL PREVIEW */}
                <div className="
                  w-32 h-20 sm:w-40 sm:h-24 
                  bg-gray-100 border 
                  rounded-lg overflow-hidden 
                  text-xs flex items-center justify-center
                ">
                  {videoData.thumbnailUrl ? (
                    <img
                      src={videoData.thumbnailUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Thumbnail preview"
                  )}
                </div>

                {/* THUMBNAIL UPLOAD BUTTON */}
                <label className="
                  inline-flex items-center 
                  px-4 py-2 
                  bg-white border rounded-full 
                  cursor-pointer text-sm shadow-sm 
                  hover:bg-gray-100
                ">
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "thumbnailUrl")}
                  />
                  Upload thumbnail
                </label>
              </div>
            </div>

            {/* TAGS INPUT */}
            <div>
              <label className="block text-sm font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                value={videoData.tags}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* AUDIENCE SECTION */}
            <div className="bg-gray-50 border rounded-xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm font-medium">Audience</p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2">

                {/* Audience: Kids */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="audience"
                    value="kids"
                    checked={videoData.audience === "kids"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Kids
                </label>

                {/* Audience: Everyone */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="audience"
                    value="everyone"
                    checked={videoData.audience === "everyone"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Everyone
                </label>
              </div>
            </div>
          </div>

          {/* 
             RIGHT PANEL — Visibility, License, Monetization, Category, Date */}
          <div className="
            col-span-12 lg:col-span-4 
            space-y-6 
            order-first lg:order-none
          ">

            {/* VISIBILITY OPTIONS */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm font-medium mb-3">Visibility</p>

              <div className="space-y-3">

                {/* PUBLIC */}
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={videoData.visibility === "public"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Public
                </label>

                {/* UNLISTED */}
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="visibility"
                    value="unlisted"
                    checked={videoData.visibility === "unlisted"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Unlisted
                </label>

                {/* PRIVATE */}
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={videoData.visibility === "private"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Private
                </label>
              </div>
            </div>

            {/* LICENSE OPTIONS */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <label className="block text-sm font-medium mb-2">License</label>
              <select
                name="license"
                value={videoData.license}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select license</option>
                {licenseOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* MONETIZATION CHECKBOX */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="monetization"
                  checked={Boolean(videoData.monetization)}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span className="text-sm">Enable monetization</span>
              </label>
            </div>

            {/* CATEGORY */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={videoData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* RECORDING DATE */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <label className="block text-sm font-medium mb-2">
                Recording Date
              </label>
              <input
                type="date"
                name="date"
                value={videoData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* MORE OPTIONS */}
            <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
              <label className="block text-sm font-medium mb-2">
                More Options
              </label>
              <textarea
                name="more"
                value={videoData.more}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default React.memo(VideoUpload);
