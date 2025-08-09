import React from 'react'
import { useNavigate } from 'react-router-dom'
import homewala from '../assets/homewala.png'

function Home() {
  const navigate = useNavigate() 
  return (
    <div>
      <main className="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-white  text-[#1A1A1A]" >
        {/* Hero Section */}
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to <span className="text-[#7F56D9] dark:text-[#00BFA6]">Bloglyst</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Bloglyst is a clean and modern blogging platform where developers and writers share knowledge, thoughts, and stories that matter. Fast, secure, and minimal — built for creators.
          </p>

          <img
            src={homewala}
            alt="Blog writing illustration"
            className="w-full max-w-md mx-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
          />

          <button
            onClick={() => navigate("/create-post")}
            className="mt-6 px-6 py-3 bg-[#7F56D9] dark:bg-[#00BFA6] text-white rounded-lg hover:bg-[#6B46C1] dark:hover:bg-[#00FFC2] transition"
          >
            Create New
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
