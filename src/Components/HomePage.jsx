
import axios from "axios";
import React, {
  useEffect,
  useState,
  useMemo,
  lazy,
  Suspense
} from "react";

const VideoCard = lazy(() => import("./VideoCard"));

function HomePage({ sideBar, search }) {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/allvideo", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => setData(res.data.videos))
      .catch(err => console.log(err));
  }, []);

  const categories = useMemo(
    () => [
      "All",
      "Software",
      "News",
      "Sports",
      "Gaming",
      "Tollywood",
      "Bollywood",
      "Moves",
      "Music",
      "live",
      "podcast",
      "dsa",
      "AI&ML",
      "fitness",
      "Entertainment"
    ],
    []
  );

  const parseTags = (item) => {
    if (!item.tags || !item.tags[0]) return [];

    return item.tags[0]
      .split("#")
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.toLowerCase());
  };

  const videosToShow = useMemo(() => {
    const term = search.toLowerCase();

    return data.filter(item => {
      const title = item.title?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";

      const tagList = parseTags(item);

      const matchesSearch =
        !search ||
        title.includes(term) ||
        category.includes(term) ||
        tagList.some(t => t.includes(term));

      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory.toLowerCase() ||
        tagList.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [data, search, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-white mt-[-40px]">

      {/* CATEGORY BAR */}
      <div className="sticky top-12 bg-white z-20 py-3">
        <div
          className="flex overflow-x-auto gap-3 px-3 scrollbar-hide"
          style={{
            paddingLeft: sideBar ? "240px" : "16px",
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm md:text-base whitespace-nowrap
                ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {token ? (
        <div
          className="pt-5 pb-20"
          style={{
            paddingLeft: sideBar ? "240px" : "16px",
            paddingRight: "16px",
          }}
        >
          
          <div
              className={`
                grid gap-5
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:${sideBar ? "grid-cols-3" : "grid-cols-4"}
              `}
            >

            {videosToShow?.map((item, i) => (
              <Suspense
                key={i}
                fallback={
                  <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200 rounded-xl animate-pulse"></div>
                }
              >
                <VideoCard item={item} />
              </Suspense>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="w-full flex justify-center items-center mt-20 text-center px-4"
          style={{ paddingLeft: sideBar ? "240px" : "16px" }}
        >
          <h1 className="text-lg md:text-xl font-bold text-red-600">
            Please login to watch content
          </h1>
        </div>
      )}
    </div>
  );
}

export default React.memo(HomePage);











