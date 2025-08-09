import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({ children, authentication = true }) {
    const [loader, setLoader] = useState('true');
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.authStore.isloggedIn)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [authentication, authStatus, navigate])

    // if (authentication && !isLoggedIn) {
    //     navigate("/login"); // page needs login, user is not logged in
    // } else if (!authentication && isLoggedIn) {
    //     navigate("/"); // page is guest-only, user is logged in
    // }


    return loader ? (
        <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
        </div>
    ) : <>{children}</>
}

export default Protected



//explaination
//using this component only authenticated users have the access to authenticated routes
//and only unauthenticated users(guest) have the access to non-authenticated routes like Login/SignIn page
//2 more scenarios

// (authN[needed] && userAuthStatus)
/* if (T && T) => children Component[eg. Test]
   if (T && F) => login
   if (F(T) && T) => '/' [eg. Home]
   if (F(T) && F) => children Component[eg. login/sign] */