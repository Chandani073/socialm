import React from 'react'
import bgImage from '../assets/bgImage.png'
import logo from '../assets/logo.svg'
import groupUser from '../assets/group_users.png'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gray-50">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="background"
        className="absolute top-0 left-0 -z-10 w-full h-full object-cover opacity-30"
      />

      {/* Left side: Branding & Images */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 text-center md:text-left">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-32 h-auto mb-8" />

        {/* Group users image */}
        <img src={groupUser} alt="group users" className="w-64 h-auto mb-6 mx-auto md:mx-0" />

        {/* Star rating */}
        <div className="flex justify-center md:justify-start space-x-1 mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="text-yellow-500 w-6 h-6" />
            ))}
        </div>

        <p className="text-gray-600 mb-8">Used by 13k+ developers</p>

        <h1 className="text-3xl font-bold mb-2">Let's connect with our friends</h1>
        <p className="text-gray-600 mb-6">Connect to the global community</p>
      </div>

      {/* Right side: Clerk SignIn */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Login
