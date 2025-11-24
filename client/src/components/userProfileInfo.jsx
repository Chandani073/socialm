import { Calendar, MapPin, PenBox, Verified } from "lucide-react";
import React from "react";
import moment from "moment";

const UserProfileInfo = ({ user, profileId, posts, setShowEdit }) => {
  const isMyProfile = !profileId; // if no external profileId → user's own profile

  return (
    <div className="mt-6 px-4">
      <div className="flex gap-6 items-start">

        {/* Profile Image */}
        <img
          src={user.profile_picture}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow -mt-20"
        />

        {/* Right section */}
        <div className="flex-1">

          {/* Name + Verified */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{user.full_name}</h1>
                {user.isVerified && <Verified className="text-blue-600" />}
              </div>
              <p className="text-gray-600">
                {user.username ? `@${user.username}` : "Add a username"}
              </p>
            </div>

            {/* Edit Button (only for user's own profile) */}
            {isMyProfile && (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
              >
                <PenBox size={18} /> Edit
              </button>
            )}
          </div>

          {/* Bio */}
          <p className="mt-3 text-gray-700 leading-relaxed">
            {user.bio || "No bio added yet."}
          </p>

          {/* Location + Joined */}
          <div className="flex items-center gap-6 mt-4 text-gray-600">

            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              {user.location || "Add location"}
            </span>

            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-500" />
              Joined{" "}
              <span className="font-medium">
                {moment(user.createdAt).fromNow()}
              </span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-5">
            <div>
              <span className="font-bold text-lg">{posts.length}</span>
              <span className="ml-1 text-gray-600">Posts</span>
            </div>

            <div>
              <span className="font-bold text-lg">{user.followers.length}</span>
              <span className="ml-1 text-gray-600">Followers</span>
            </div>

            <div>
              <span className="font-bold text-lg">{user.following.length}</span>
              <span className="ml-1 text-gray-600">Following</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
