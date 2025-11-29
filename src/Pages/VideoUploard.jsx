import React from "react";

export default function VideoUpload() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upload videos</h2>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT - Main Details */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Video preview / upload area */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video file
              </label>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-[420px] h-[238px] bg-black rounded-md overflow-hidden flex items-center justify-center text-gray-200">
                  {/* placeholder thumbnail/preview */}
                  <span className="text-xs">Video preview / thumbnail</span>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Select a video file to upload. Recommended: MP4, up to 128GB.
                  </p>

                  <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm hover:bg-gray-50">
                    <input type="file" className="sr-only" />
                    <span>Upload video</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Add a title that describes your video"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: Include keywords in the title to help viewers find your video.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell viewers about your video"
                className="w-full min-h-[120px] border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
              />
              <p className="text-xs text-gray-500 mt-2">
                Add timestamps, links, and credits. Markdown and links are supported.
              </p>
            </div>

            {/* Thumbnail & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-36 h-20 bg-gray-100 rounded-md border flex items-center justify-center text-xs text-gray-500">
                    Thumbnail preview
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm hover:bg-gray-50">
                      <input type="file" className="sr-only" />
                      <span>Upload thumbnail</span>
                    </label>
                    <p className="text-xs text-gray-500">
                      Recommended: 1280 x 720, under 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags / Hashtags
                </label>
                <input
                  type="text"
                  placeholder="Add comma-separated tags"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Help viewers discover your content—use relevant tags.
                </p>
              </div>
            </div>

            {/* Audience (Made for kids) */}
            <div className="bg-gray-50 border rounded-md p-4">
              <p className="text-sm font-medium mb-2">Audience</p>
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="audience" className="accent-blue-600" />
                  <span>Yes, it's made for kids</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="audience" className="accent-blue-600" />
                  <span>No, it's not made for kids</span>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Monetization</p>
                <p className="text-xs text-gray-600">Enable monetization (if eligible).</p>
              </div>

              <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm font-medium mb-2">License & Distribution</p>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Standard YouTube license</option>
                  <option>Creative Commons</option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT - Side panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white border rounded-md p-4 shadow-sm  top-20">
              <p className="text-sm font-medium mb-3">Visibility</p>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="visibility" className="accent-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Public</div>
                    <div className="text-xs text-gray-500">Anyone can watch</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="visibility" className="accent-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Unlisted</div>
                    <div className="text-xs text-gray-500">Only people with link</div>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="visibility" className="accent-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Private</div>
                    <div className="text-xs text-gray-500">Only you can watch</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white border rounded-md p-4 shadow-sm">
              <p className="text-sm font-medium mb-2">Category</p>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Education</option>
                <option>Entertainment</option>
                <option>Music</option>
                <option>People & Blogs</option>
              </select>
            </div>

            <div className="bg-white border rounded-md p-4 shadow-sm">
              <p className="text-sm font-medium mb-2">Recording/Production date</p>
              <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="bg-white border rounded-md p-4 text-sm text-gray-600">
              <p className="font-medium mb-2">Checks</p>
              <p className="text-xs">Copyright and other automated checks will run after upload.</p>
            </div>

            <div className="bg-white border rounded-md p-4 text-sm">
              <p className="font-medium mb-2">More options</p>
              <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Tags for advanced settings (optional)"/>
            </div>

            <div className="flex gap-3">
              <button type="button" className="w-full px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm">
                Save draft
              </button>
              <button type="submit" className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
