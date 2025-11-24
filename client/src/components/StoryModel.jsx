import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const StoryModel = ({ setShowModel }) => {
  const bgColors = ["#4F46E5", "#528274", "#A68039", "#ED85C9", "#7D1313"];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // --- Handle media upload ---
  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // --- Handle story creation ---
  const handleCreateStory = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("story added");
      }, 1000);
    });
  };

  return (
    <div className="fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <button onClick={() => setShowModel(false)} className="text-white p-2">
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold">Create Story</h2>
        <span className="w-10" />
      </div>

      {/* Story Preview Box */}
      <div
        className="rounded-lg h-96 w-64 flex items-center justify-center relative"
        style={{ backgroundColor: background }}
      >
        {/* Text mode */}
        {mode === "text" && (
          <textarea
            className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}

        {/* Media mode */}
        {mode === "media" && previewUrl && (
          <>
            {media?.type.startsWith("image") ? (
              <img src={previewUrl} alt="preview" className="object-contain max-h-full" />
            ) : (
              <video src={previewUrl} controls className="object-contain max-h-full" />
            )}
          </>
        )}
      </div>

      {/* Background colors */}
      <div className="flex mt-4 gap-2">
        {bgColors.map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded-full ring cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setBackground(color)}
          />
        ))}
      </div>

      {/* Mode buttons */}
      <div className="flex gap-2 mt-4">
        {/* TEXT BUTTON */}
        <button
          onClick={() => {
            setMode("text");
            setMedia(null);
            setPreviewUrl(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${
            mode === "text" ? "bg-white text-black" : "bg-zinc-800"
          }`}
        >
          <TextIcon size={18} />
          Text
        </button>

        {/* MEDIA UPLOAD */}
        <label
          className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
            mode === "media" ? "bg-white text-black" : "bg-zinc-800"
          }`}
        >
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              handleMediaUpload(e);
              setMode("media");
            }}
          />
          <Upload size={18} />
          Photo/Video
        </label>
      </div>

      {/* Create Story Button */}
      <button
        onClick={() =>
          toast.promise(handleCreateStory(), {
            loading: "Saving...",
            success: <b>Story added!</b>,
            error: (e) => <b>{e.message}</b>,
          })
        }
        className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
      >
        <Sparkle size={18} />
        Create Story
      </button>
    </div>
  );
};

export default StoryModel;
