import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import toast from "react-hot-toast";
import { Image as ImageIcon, X } from "lucide-react";

export const Createpost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        setContent("");
        setImages([]);
        resolve();
      }, 1200);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow rounded-xl p-6 space-y-5">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Create Post</h1>
        <p className="text-slate-500">Share your thoughts here</p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={user.profile_picture}
          alt=""
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="font-semibold text-slate-900">{user.full_name}</h2>
          <p className="text-slate-500 text-sm">@{user.username}</p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        placeholder="What's on your mind?"
        className="w-full min-h-28 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Image Preview Section */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt=""
                className="rounded-lg h-32 w-full object-cover shadow"
              />

              <button
                onClick={() =>
                  setImages(images.filter((_, index) => index !== i))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        {/* Image Upload */}
        <label
          htmlFor="image"
          className="flex items-center gap-2 text-indigo-600 cursor-pointer hover:text-indigo-700"
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-sm">Add Image</span>
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) =>
            setImages([...images, ...Array.from(e.target.files)])
          }
        />

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={() =>
            toast.promise(handleSubmit(), {
              loading: "Uploading...",
              success: <b>Post Added!</b>,
              error: <b>Post not added.</b>,
            })
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 active:scale-95 transition disabled:opacity-60"
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default Createpost;
