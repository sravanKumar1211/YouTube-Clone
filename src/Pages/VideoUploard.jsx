


import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function VideoUpload() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const CLOUD_NAME = "dzdurdxzw";
  const UPLOAD_PRESET = "youtube-clone";

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

  // ==========================
  // 📌 LOAD VIDEO FOR EDIT MODE
  // ==========================
  useEffect(() => {
    if (!videoId) return;

    const loadVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getvideobyid/${videoId}`
        );

        const v = res.data.video;

        setVideoData({
          title: v.title,
          description: v.description,
          videoUrl: v.videoUrl,
          thumbnailUrl: v.thumbnailUrl,
          tags: v.tags.join(", "),
          audience: v.audience,
          monetization: v.monetization,
          license: v.license,
          visibility: v.visibility,
          category: v.category,
          date: v.date?.slice(0, 10),
          checks: v.checks,
          more: v.more,
        });
      } catch (err) {
        console.log("Error loading video:", err);
      }
    };

    loadVideo();
  }, [videoId]);

  // ==========================
  // 📌 MEMOIZED INPUT HANDLER
  // ==========================
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setVideoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // ==========================
  // 📌 MEMOIZED CLOUDINARY UPLOAD
  // ==========================
  const uploadToCloudinary = useCallback(async (file, type) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);

    const url =
      type === "video"
        ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
        : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const res = await axios.post(url, form);
    return res.data.secure_url;
  }, []);

  // ==========================
  // 📌 FILE UPLOAD (Stable)
  // ==========================
  const handleFileUpload = useCallback(
    async (e, fieldType) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const uploadedUrl = await uploadToCloudinary(
        file,
        fieldType === "videoUrl" ? "video" : "image"
      );

      setVideoData((prev) => ({
        ...prev,
        [fieldType]: uploadedUrl,
      }));
    },
    [uploadToCloudinary]
  );

  // ==========================
  // 📌 FORM SUBMIT (MEMOIZED)
  // ==========================
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("token");

      const payload = {
        ...videoData,
        title: videoData.title.trim(),
        tags:
          videoData.tags
            ?.split(",")
            .map((t) => t.trim())
            .filter(Boolean) || [],
      };

      try {
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

  // ==========================
  // 📌 MEMOIZED STATIC SELECT OPTIONS
  // ==========================
  const categoryOptions = useMemo(
    () => ["Education", "Entertainment", "Music", "Blog"],
    []
  );

  const licenseOptions = useMemo(
    () => ["standard", "creativeCommons"],
    []
  );

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow border border-gray-200"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Upload/Edit videos
          </h2>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </div>

        {/* ==============================
            🔥 Main Form Body
        =============================== */}
        <div className="grid grid-cols-12 gap-8 px-6 py-6">
          {/* LEFT AREA */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* VIDEO UPLOAD */}
            <div className="border rounded-xl p-5 bg-gray-50 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Video file
              </label>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[420px] h-[240px] bg-black rounded-xl overflow-hidden flex items-center justify-center text-gray-300">
                  {videoData.videoUrl ? (
                    <video
                      src={videoData.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs">Video preview</span>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Upload MP4 videos.
                  </p>

                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full cursor-pointer text-sm shadow-sm hover:bg-gray-100">
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

            {/* TITLE */}
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

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={videoData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 text-sm min-h-[120px]"
              />
            </div>

            {/* THUMBNAIL */}
            <div>
              <label className="block text-sm font-medium">Thumbnail</label>

              <div className="flex items-start gap-4">
                <div className="w-40 h-24 bg-gray-100 border rounded-lg overflow-hidden text-xs flex items-center justify-center">
                  {videoData.thumbnailUrl ? (
                    <img
                      src={videoData.thumbnailUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Thumbnail preview"
                  )}
                </div>

                <label className="inline-flex items-center px-4 py-2 bg-white border rounded-full cursor-pointer text-sm shadow-sm hover:bg-gray-100">
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

            {/* TAGS */}
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

            {/* AUDIENCE */}
            <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium">Audience</p>

              <div className="flex gap-6 mt-2">
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

          {/* ===========================
             RIGHT PANEL
          ============================ */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* VISIBILITY */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-sm font-medium mb-3">Visibility</p>

              <div className="space-y-3">
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

            {/* LICENSE */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
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

            {/* MONETIZATION */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
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
            <div className="bg-white border rounded-xl p-5 shadow-sm">
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

            {/* DATE */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
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
            <div className="bg-white border rounded-xl p-5 shadow-sm">
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
