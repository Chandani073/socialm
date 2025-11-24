import React, { useState } from "react";
import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {

  // highlight hashtags
  const postWithHashtag = post.content?.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600 font-medium">$1</span>'
  );

  const navigate = useNavigate();
  const currentUser = dummyUserData;

  const [likes, setLikes] = useState(post.likes || []);

  // handle like / unlike
  const handleLike = () => {
    if (likes.includes(currentUser._id)) {
      setLikes(likes.filter((id) => id !== currentUser._id));
    } else {
      setLikes([...likes, currentUser._id]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full max-w-2xl hover:shadow-lg transition">
      
      {/* USER INFO */}
      <div
        onClick={() => navigate(`/profile/${post.user._id}`)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img
          src={post.user.profile_picture}
          className="w-11 h-11 rounded-full shadow-sm object-cover border border-gray-200"
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold group-hover:text-indigo-600 transition">
              {post.user.full_name}
            </span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>

          <div className="text-gray-500 text-xs">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      {post.content && (
        <div
          className="text-gray-800 text-sm leading-relaxed mt-3"
          dangerouslySetInnerHTML={{ __html: postWithHashtag }}
        ></div>
      )}

      {/* POST IMAGES */}
      {post.image_urls?.length > 0 && (
        <div
          className={`grid gap-2 mt-3 ${
            post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.image_urls.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-full rounded-xl object-cover shadow-sm hover:opacity-90 transition ${
                post.image_urls.length === 1 ? "h-auto" : "h-48"
              }`}
              alt=""
            />
          ))}
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-6 text-gray-600 text-sm pt-3 border-t border-gray-200 mt-4">

        {/* LIKE BUTTON */}
        <div className="flex items-center gap-1 cursor-pointer select-none">
          <Heart
  onClick={handleLike}
  className={`w-5 h-5 transition-transform active:scale-125 cursor-pointer ${
    Array.isArray(likes) && likes.includes(currentUser._id)
      ? "text-red-500 fill-red-500"
      : "hover:text-red-500"
  }`}
/>
<span>{Array.isArray(likes) ? likes.length : 0}</span>

        </div>

        {/* COMMENTS */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments_count || 0}</span>
        </div>

        {/* SHARE */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition">
          <Share2 className="w-5 h-5" />
          <span>{post.shares_count || 0}</span>
        </div>

      </div>

    </div>
  );
};

export default PostCard;
