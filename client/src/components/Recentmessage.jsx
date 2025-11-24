import React, { useEffect, useState } from "react";
import moment from "moment";
import { dummyMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";

const RecentMessage = () => {
  const [messages, setMessages] = useState([]);

  const fetchRecentMessage = async () => {
    setMessages(dummyMessagesData);
  };

  useEffect(() => {
    fetchRecentMessage();
  }, []);

  return (
    <div className="bg-white max-w-xs mt-4 p-4 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-900 mb-3">Recent Messages</h3>

      {/* Scrollable List */}
      <div className="flex flex-col max-h-60 overflow-y-scroll no-scrollbar">
        {messages.map((msg, index) => (
          <Link
            key={index}
            to={`/messages/${msg.from_user_id._id}`}
            className="flex items-start gap-2 py-2 px-2 hover:bg-slate-100 rounded-md transition"
          >
            {/* Profile Picture */}
            <img
              src={msg.from_user_id.profile_picture}
              alt=""
              className="w-9 h-9 rounded-full object-cover shadow-sm"
            />

            <div className="w-full">
              {/* Time */}
              <p className="text-[10px] text-slate-400">
                {moment(msg.createdAt).fromNow()}
              </p>

              {/* Message + Unseen Badge */}
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-700 truncate w-[85%] text-[11px]">
                  {msg.text ? msg.text : "📎 Media"}
                </p>

                {/* Unseen Count */}
                {!msg.seen && (
                  <span className="bg-indigo-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
                    1
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessage;
