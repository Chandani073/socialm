import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Search, Loader2 } from 'lucide-react'

const Discover = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState(dummyConnectionsData)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setUsers([])

      setTimeout(() => {
        const filtered = dummyConnectionsData.filter((u) =>
          u.full_name.toLowerCase().includes(input.toLowerCase()) ||
          u.username.toLowerCase().includes(input.toLowerCase())
        )
        setUsers(filtered)
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover People</h1>
          <p className="text-slate-600">Connect with people and grow your network</p>
        </div>

        {/* SEARCH BOX */}
        <div className="mb-6">
          <div className="w-full max-w-xl relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for people..."
              className="w-full bg-white shadow-sm border border-slate-200 rounded-full py-3 pl-10 pr-4
              focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleSearch}
            />
          </div>
        </div>

        {/* USER CARDS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* LOADING */}
          {loading && (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          )}

          {/* NO RESULTS */}
          {!loading && users.length === 0 && (
            <p className="col-span-full text-center text-slate-500 text-lg">
              No users found.
            </p>
          )}

          {/* RENDER USERS */}
          {!loading &&
            users.map((user) => (
              <div
                key={user.user_id}
                className="bg-white p-5 rounded-xl shadow border border-slate-100 hover:shadow-xl 
                transition cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profile_picture}
                    className="w-14 h-14 rounded-full object-cover shadow"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{user.full_name}</p>
                    <p className="text-slate-500 text-sm">@{user.username}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {user.bio.length > 60 ? user.bio.slice(0, 60) + "..." : user.bio}
                </p>

                <button
                  className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm 
                  rounded-md transition active:scale-95 shadow-sm"
                >
                  Connect
                </button>
              </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Discover
