import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, UserPlus, UserCheck } from 'lucide-react'

const UserCard = ({ user }) => {

  const currentUser = dummyUserData

  const handleFollow = async () => {
    console.log("Follow clicked")
  }

  const handleConnectionRequest = async () => {
    console.log("Connection request clicked")
  }

  const isFollowing = currentUser?.following?.includes(user._id)
  const isConnected = currentUser?.connections?.includes(user._id)

  return (
    <div
      key={user._id}
      className="w-full max-w-sm bg-white shadow-md p-5 rounded-xl border border-slate-200 hover:shadow-lg transition"
    >
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user.profile_picture}
          alt=""
          className="w-14 h-14 rounded-full object-cover shadow"
        />

        <div>
          <p className="font-semibold text-slate-800">{user.full_name}</p>
          {user.username && (
            <p className="text-slate-500 text-sm">@{user.username}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="mt-3 text-sm text-slate-600">{user.bio.slice(0, 60)}...</p>
      )}

      {/* Location + Followers */}
      <div className="flex justify-between mt-4 text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {user.location || "Unknown"}
        </div>

        <div>
          <span className="font-semibold">{user.followers?.length || 0}</span>{" "}
          followers
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">

        {/* Follow / Following Button */}
        <button
          onClick={handleFollow}
          disabled={isFollowing}
          className={`flex items-center justify-center flex-1 gap-2 py-2 rounded-md text-sm font-medium 
            ${isFollowing
              ? "bg-gray-200 text-gray-600 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white active:scale-95"
            } transition`}
        >
          <UserPlus className="w-4 h-4" />
          {isFollowing ? "Following" : "Follow"}
        </button>

        {/* Connect / Message Button */}
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center w-12 h-10 bg-slate-100 rounded-md hover:bg-slate-200 active:scale-95 transition"
        >
          {isConnected ? (
            <MessageCircle className="w-5 h-5 text-indigo-600" />
          ) : (
            <UserCheck className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>
    </div>
  )
}

export default UserCard
