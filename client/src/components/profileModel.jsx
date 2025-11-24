import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

const ProfileModel = ({ setShowEdit }) => {
  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    full_name: user.full_name,
    cover_photo: null,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    // Save API call here
    setShowEdit(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
        
        {/* Header */}
        <h1 className="text-xl font-semibold text-slate-800 mb-4">Edit Profile</h1>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          
          {/* Profile Picture */}
          <div>
            <label className="font-medium text-slate-700 mb-2 block">
              Profile Picture
            </label>

            <div className="relative w-24 h-24 group">
              <img
                src={
                  editForm.profile_picture
                    ? URL.createObjectURL(editForm.profile_picture)
                    : user.profile_picture
                }
                className="w-24 h-24 rounded-full object-cover border"
                alt=""
              />

              <label
                htmlFor="profile_picture"
                className="absolute inset-0 bg-black/40 invisible group-hover:visible rounded-full flex justify-center items-center cursor-pointer"
              >
                <Pencil className="text-white" />
              </label>

              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          {/* Cover Photo */}
          <div>
            <label className="font-medium text-slate-700 mb-2 block">
              Cover Photo
            </label>

            <div className="relative h-32 w-full rounded-lg group overflow-hidden">
              <img
                src={
                  editForm.cover_photo
                    ? URL.createObjectURL(editForm.cover_photo)
                    : user.cover_photo
                }
                alt=""
                className="w-full h-full object-cover"
              />

              <label
                htmlFor="cover_photo"
                className="absolute inset-0 bg-black/40 invisible group-hover:visible flex justify-center items-center cursor-pointer"
              >
                <Pencil className="text-white" />
              </label>

              <input
                type="file"
                id="cover_photo"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-slate-700 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={editForm.full_name}
              onChange={(e) =>
                setEditForm({ ...editForm, full_name: e.target.value })
              }
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-slate-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({ ...editForm, username: e.target.value })
              }
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-slate-700 font-medium">Bio</label>
            <textarea
              rows={3}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-slate-700 font-medium">Location</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="px-4 py-2 border rounded-md text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileModel;
