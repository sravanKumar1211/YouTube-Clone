import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VideoUpload() {
  const CLOUD_NAME = "dzdurdxzw";
  const UPLOAD_PRESET = "youtube-clone";

  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoFile: "",       // Will store Cloudinary VIDEO URL
    thumbnail: "",       // Will store Cloudinary IMAGE URL
    tags: "",
    audience: "",
    monetization: "",
    license: "",
    visibility: "",
    category: "",
    date: "",
    checks: "",
    more: ""
  });

  useEffect(()=>{

  },[])


  // General input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  // Cloudinary upload helper
  const uploadToCloudinary = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const url =
      type === "video"
        ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
        : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const res = await axios.post(url, data);
    return res.data.secure_url; // Cloudinary URL
  };

  // Handle Video or Thumbnail upload
  const handleFileUpload = async (e, fieldType) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedURL = await uploadToCloudinary(
        file,
        fieldType === "videoFile" ? "video" : "image"
      );

      setVideoData((prev) => ({
        ...prev,
        [fieldType]: uploadedURL,
      }));

      console.log(`Uploaded ${fieldType}:`, uploadedURL);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("FINAL DATA TO SEND TO BACKEND:", videoData);
    alert("Video published (check console)!");
    await axios.post('http://localhost:3000/api/video',videoData,{withCredentials:true}).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err.message)
    })

  };
    console.log(videoData)



  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
  <form
    onSubmit={handleSubmit}
    className="max-w-6xl mx-auto bg-white rounded-xl shadow border border-gray-200"
  >
    {/* HEADER */}
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <h2 className="text-xl font-semibold text-gray-800">Upload videos</h2>

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

    <div className="grid grid-cols-12 gap-8 px-6 py-6">
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Video Upload */}
        <div className="border rounded-xl p-5 bg-gray-50 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Video file
          </label>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[420px] h-[240px] bg-black rounded-xl overflow-hidden flex items-center justify-center text-gray-300">
              {videoData.videoFile ? (
                <video
                  src={videoData.videoFile}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs">Video preview</span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">
                Upload MP4 videos (max 128GB). YouTube processes your video after
                upload.
              </p>

              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full cursor-pointer text-sm shadow-sm hover:bg-gray-100">
                <input
                  type="file"
                  className="sr-only"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e, "videoFile")}
                />
                <span>Upload video</span>
              </label>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={videoData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm min-h-[140px] focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Thumbnail</label>

          <div className="flex items-start gap-4">
            <div className="w-40 h-24 bg-gray-100 border rounded-lg flex items-center justify-center overflow-hidden text-xs text-gray-500">
              {videoData.thumbnail ? (
                <img
                  src={videoData.thumbnail}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Thumbnail Preview"
              )}
            </div>

            <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full cursor-pointer text-sm shadow-sm hover:bg-gray-100">
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "thumbnail")}
              />
              Upload thumbnail
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            value={videoData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
        </div>

        {/* Audience */}
        <div className="bg-gray-50 border rounded-xl p-4 shadow-sm space-y-3">
          <p className="text-sm font-medium">Audience</p>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="audience"
                value="kids"
                onChange={handleChange}
                className="accent-blue-600"
              />
              Made for kids
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="audience"
                value="nokids"
                onChange={handleChange}
                className="accent-blue-600"
              />
              Not made for kids
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Visibility */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium mb-3">Visibility</p>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-sm">Public</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="unlisted"
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-sm">Unlisted</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-sm">Private</span>
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={videoData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
            <option value="blog">People & Blogs</option>
          </select>
        </div>

        {/* Date */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <label className="block text-sm font-medium mb-2">
            Recording Date
          </label>
          <input
            type="date"
            name="date"
            value={videoData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* More Options */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <label className="block text-sm font-medium mb-2">More Options</label>
          <textarea
            name="more"
            value={videoData.more}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  </form>
</div>

  );
}
