import { useEffect, useState } from 'react'
import './App.css'
import Header from './miniComponents/Header'
import Footer from './miniComponents/Footer'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/authentication.js'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice.js'

function App() {
  const [Loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
          console.log(userData.name, "Already loggedIn as",userData.$id);
        } else {
          dispatch(logout())
          console.log("No loggedIn");
        }
      })
      .catch((error) => ('unable to fetch user data ',error))
      .finally(() => setLoading(false))
  }, [])

  return !Loading ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>)
}

export default App
