import React from 'react'
import authService from '../appwrite/authentication'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogOutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(data) {

        authService.logout(data)
            .then(() => {
                dispatch(logout())
                navigate('/')
                console.log(data," logout");
            })
            .catch(() => console.error('Error on Logout'))
    }

    return (
        <button
        className='text-sm px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition'
        onClick={handleLogout}
        >
            LogOut
        </button>
    )
}

export default LogOutBtn
