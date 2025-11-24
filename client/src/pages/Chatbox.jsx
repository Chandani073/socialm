import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { ImageIcon, SendHorizonal } from "lucide-react";

const Chatbox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user] = useState(dummyUserData);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!text && !image) return;

    setText("");
    setImage(null);

    // auto scroll
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) return null;

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white shadow">
        <img
          src={user.profile_picture}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-slate-800">{user.full_name}</p>
          <p className="text-sm text-slate-500">@{user.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-scroll p-4 space-y-3">
        {messages
          .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((msg, index) => {
            const isSender = msg.to_user_id !== user._id;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isSender ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`p-2 text-sm max-w-xs shadow rounded-lg 
                    ${
                      isSender
                        ? "bg-white text-slate-700 rounded-bl-none"
                        : "bg-indigo-500 text-white rounded-br-none"
                    }`}
                >
                  {/* Image Message */}
                  {msg.message_type === "image" && (
                    <img
                      src={msg.media_url}
                      alt=""
                      className="w-52 rounded mb-1"
                    />
                  )}

                  {/* Text Message */}
                  {msg.text && <p>{msg.text}</p>}
                </div>
              </div>
            );
          })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white shadow">
        <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-full">

          {/* Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-slate-700 px-2"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image Upload */}
          <label htmlFor="chat-image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="h-8 w-8 rounded object-cover"
              />
            ) : (
              <ImageIcon className="text-slate-600" />
            )}
          </label>

          <input
            type="file"
            id="chat-image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 active:scale-95 transition"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
