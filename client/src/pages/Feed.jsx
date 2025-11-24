import React, { useEffect, useState } from "react";
import { dummyPostsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import { StoriesBar } from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import Recentmessage from "../components/Recentmessage";

export const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll py-10 xl:pr-5 flex items-start justify-center xl:gap-8 bg-gray-100">
      
      {/* LEFT – STORIES + POSTS */}
      <div className="w-full max-w-2xl">
        <StoriesBar />
        <div className="p-4 space-y-5">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="max-xl:hidden sticky top-10">
        <div className="max-w-xs bg-white text-sm p-4 rounded-lg shadow space-y-2 mb-4">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>

          <img
            src={assets.sponsored_img}
            className="w-full h-40 object-cover rounded-md"
            alt="sponsored"
          />

          <p className="text-slate-600 font-medium">Email Marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with powerful tools.
          </p>
        </div>

        <Recentmessage />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
