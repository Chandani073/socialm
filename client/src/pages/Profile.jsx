import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import PostCard from "../components/PostCard";
import ProfileModel from "../components/ProfileModel"; // FIXED: correct component import

export const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  }, []);

  if (!user) return <p className="text-center mt-20 text-xl">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">

      {/* Cover Photo */}
      <div className="w-full h-48 overflow-hidden rounded-xl shadow-md">
        {user.cover_photo && (
          <img
            src={user.cover_photo}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* User Info */}
      <div className="flex items-center mt-4 gap-4">
        <img
          src={user.profile_picture}
          className="w-28 h-28 rounded-full border-4 border-white shadow -mt-14"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.full_name}</h2>
          <p className="text-gray-600">@{user.username}</p>
          {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        </div>

        <button
          onClick={() => setShowEdit(true)}
          className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b flex gap-6">
        {["posts", "media", "likes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg capitalize transition border-b-2 ${
              activeTab === tab
                ? "border-indigo-600 text-indigo-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Media Tab */}
      {activeTab === "media" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {posts
            .filter((p) => p.image_urls?.length > 0)
            .map((post, index) =>
              post.image_urls.map((image, i) => (
                <Link
                  target="_blank"
                  to={image}
                  key={`${index}-${i}`}
                  className="relative group"
                >
                  <img
                    src={image}
                    className="w-full h-40 object-cover rounded-lg shadow group-hover:opacity-80"
                  />
                  <p className="text-xs mt-1 text-gray-600">
                    Posted {moment(post.createdAt).fromNow()}
                  </p>
                </Link>
              ))
            )}
        </div>
      )}

      {/* Likes Tab */}
      {activeTab === "likes" && (
        <p className="text-gray-600 mt-6">No liked posts yet.</p>
      )}

      {/* Edit Profile Modal */}
      {showEdit && (
        <ProfileModel setShowEdit={setShowEdit} />
      )}
    </div>
  );
};

export default Profile;
