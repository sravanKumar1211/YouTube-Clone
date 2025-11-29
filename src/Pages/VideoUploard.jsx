
import React, { useState } from "react";

export default function VideoUpload() {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
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

  // Handle Text, Radio, Select Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Inputs (Video & Thumbnail)
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setVideoData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Upload Data:", videoData);
    alert("Check console for uploaded data!");
  };

    console.log(videoData)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upload videos</h2>
          <div className="flex gap-3">
            <button type="button" className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Video Upload */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">Video file</label>
              <div className="flex flex-col md:flex-row items-center gap-4">
                
                <div className="w-full md:w-[420px] h-[238px] bg-black rounded-md flex items-center justify-center text-gray-200">
                  {videoData.videoFile ? (
                    <video src={URL.createObjectURL(videoData.videoFile)} controls className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs">Video preview / thumbnail</span>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Select a video file to upload. Recommended: MP4.
                  </p>

                  <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm hover:bg-gray-50">
                    <input type="file" className="sr-only" onChange={(e) => handleFileUpload(e, "videoFile")} />
                    <span>Upload video</span>
                  </label>
                </div>

              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={videoData.title}
                onChange={handleChange}
                placeholder="Add a title that describes your video"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={videoData.description}
                onChange={handleChange}
                placeholder="Tell viewers about your video"
                className="w-full min-h-[120px] border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Thumbnail + Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
                <div className="flex items-center gap-3">
                  <div className="w-36 h-20 bg-gray-100 rounded-md border flex items-center justify-center text-xs">
                    {videoData.thumbnail ? (
                      <img src={URL.createObjectURL(videoData.thumbnail)} className="object-cover h-full w-full" />
                    ) : (
                      "Thumbnail Preview"
                    )}
                  </div>

                  <label className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm hover:bg-gray-50">
                    <input type="file" className="sr-only" onChange={(e) => handleFileUpload(e, "thumbnail")} />
                    <span>Upload thumbnail</span>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={videoData.tags}
                  onChange={handleChange}
                  placeholder="Add comma-separated tags"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>

            </div>

            {/* Audience */}
            <div className="bg-gray-50 border rounded-md p-4">
              <p className="text-sm font-medium mb-2">Audience</p>
              
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="audience" value="kids" onChange={handleChange} className="accent-blue-600" />
                Yes, it's made for kids
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="audience" value="nokids" onChange={handleChange} className="accent-blue-600" />
                No, it's not made for kids
              </label>
            </div>

            {/* Monetization + License */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Monetization</p>
                <select name="monetization" value={videoData.monetization} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                  <option value="">Select</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm font-medium mb-2">License</p>
                <select name="license" value={videoData.license} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                  <option value="standard">Standard YouTube license</option>
                  <option value="cc">Creative Commons</option>
                </select>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Visibility */}
            <div className="bg-white border rounded-md p-4">
              <p className="text-sm font-medium mb-2">Visibility</p>

              <label className="flex items-center gap-2">
                <input type="radio" name="visibility" value="public" onChange={handleChange} />
                Public
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="visibility" value="unlisted" onChange={handleChange} />
                Unlisted
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="visibility" value="private" onChange={handleChange} />
                Private
              </label>
            </div>

            {/* Category */}
            <div className="bg-white border rounded-md p-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={videoData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              >
                <option value="">Select</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="music">Music</option>
                <option value="blogs">People & Blogs</option>
              </select>
            </div>

            {/* Date */}
            <div className="bg-white border rounded-md p-4">
              <label className="block text-sm font-medium mb-2">Recording Date</label>
              <input
                type="date"
                name="date"
                value={videoData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>

            {/* Checks */}
            <div className="bg-white border rounded-md p-4 text-sm text-gray-700">
              <p className="font-medium mb-1">Checks</p>
              Copyright checks will run.
            </div>

            {/* More Options */}
            <div className="bg-white border rounded-md p-4">
              <p className="text-sm font-medium mb-2">More options</p>
              <textarea
                name="more"
                value={videoData.more}
                onChange={handleChange}
                placeholder="Extra settings / notes"
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
