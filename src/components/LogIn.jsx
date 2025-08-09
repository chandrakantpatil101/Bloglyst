import React from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/authentication'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'


function LogIn() {
  const { handleSubmit, register } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogin(data) {
    try {
      const s_id = await authService.login(data)
      // console.log("Logged In ", data);
      // console.log("S_id", s_id);
      if (s_id) {
        const userData = await authService.getCurrentUser()
        // console.log("UserData ", userData);
        if (userData) {
          dispatch(login(userData))
          console.log("Navigating to /all-posts");
          navigate('/all-posts')
          console.log(userData.name, "LoggedIn");
        }
      }

    } catch (error) {
      console.error(" Login Page ", error)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-[#1A1A1A]  px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Login to create blog
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7F56D9] dark:focus:ring-[#00BFA6]"
              {...register('email', { required: true })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7F56D9] dark:focus:ring-[#00BFA6]"
              {...register('password', { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#7F56D9] dark:bg-[#00BFA6] text-white rounded-md hover:bg-[#6B46C1] dark:hover:bg-[#00FFC2] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
