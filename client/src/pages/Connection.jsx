import React, { useState } from 'react'
import {
  Users,
  UserCheck,
  UserRoundPen,
  MessageSquare,
  UserPlus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyConnectionsData as connections,
  dummyPendingConnectionsData as pendingConnections
} from '../assets/assets'

const Connection = () => {

  const [currentTab, setCurrentTab] = useState('followers')
  const navigate = useNavigate()

  const dataArray = [
    { label: 'followers', values: followers, icon: Users },
    { label: 'following', values: following, icon: UserCheck },
    { label: 'pending', values: pendingConnections, icon: UserRoundPen },
    { label: 'connections', values: connections, icon: UserPlus },
  ]

  const activeUsers = dataArray.find(item => item.label === currentTab).values

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Connections</h1>
          <p className="text-slate-600">Manage your network and explore new people</p>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-20 w-40 bg-white shadow rounded-md border border-gray-200"
            >
              <span className="text-xl font-bold">{item.values.length}</span>
              <p className="text-slate-600 capitalize">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
          {dataArray.map(tab => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition 
                ${currentTab === tab.label
                  ? 'bg-slate-200 font-medium text-black'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="ml-1 capitalize">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* USERS LIST */}
        <div className="flex flex-wrap gap-6 mt-8">
          {activeUsers.map(user => (
            <div
              key={user.user_id}
              className="w-full max-w-md flex gap-5 p-6 bg-white rounded-md shadow border border-gray-100"
            >
              <img
                src={user.profile_picture}
                alt=""
                className="w-12 h-12 rounded-full shadow-md object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-slate-700">{user.full_name}</p>
                <p className="text-slate-500">@{user.username}</p>
                <p className="text-sm text-slate-600">
                  {(user.bio || "No bio available").slice(0, 40)}...
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  {/* View Profile */}
                  <button
                    onClick={() => navigate(`/profile/${user.user_id}`)}
                    className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-md"
                  >
                    View Profile
                  </button>

                  {/* Unfollow */}
                  {currentTab === 'following' && (
                    <button className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded-md">
                      Unfollow
                    </button>
                  )}

                  {/* Accept Request */}
                  {currentTab === 'pending' && (
                    <button className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 rounded-md">
                      Accept
                    </button>
                  )}

                  {/* Message */}
                  {currentTab === 'connections' && (
                    <button
                      onClick={() => navigate(`/messages/${user.user_id}`)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Connection
