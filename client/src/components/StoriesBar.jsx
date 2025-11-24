import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import  StoryViewer  from './StoryViewer'

export const StoriesBar = () => {
  const [stories, setStories] = useState([])
  const [showModel, setShoModel] = useState(false)
  const [viewStory, setViewStory] = useState(null)
  

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-4 pb-5">

        {/* Create Story Card */}
        <div onClick={()=>setShoModel(true)} className="rounded-lg shadow-sm w-28 h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">Create story</p>
          </div>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div onClick={()=> setViewStory(story)}
            key={index}
            className="relative rounded-lg shadow w-28 h-40 aspect-[3/4] cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-700"
          >
            {/* Background Image */}
            <img
              src={story.story_image}
              className="w-full h-full object-cover opacity-80"
              alt=""
            />

            {/* Profile Picture */}
            <img
              src={story.user.profile_picture}
              alt=""
              className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
            />

            {/* Story Text */}
            <p className="absolute bottom-7 left-3 right-3 text-white text-sm line-clamp-2">
              {story.content}
            </p>

            {/* Created time */}
            <p className="text-white absolute bottom-1 right-2 z-10 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
            {
  story.media_type !== 'text' && (
    <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
      {story.media_type === "image" ? (
        <img
          src={story.media_url}
          alt=""
          className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
        />
      ) : (
        <video
          src={story.media_url}
          className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
        />
      )}
    </div>
  )
}
          </div>
        ))}
      </div>
      {/* add story model */}
      { showModel && < StoryModel setShoModel={setShoModel} fetchStories= {fetchStories}/>}

      {/* view story model */}
      { viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>}
    </div>
  )
}
 export default  StoriesBar