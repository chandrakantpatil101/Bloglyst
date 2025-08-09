import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import LogIn from './components/LogIn.jsx'
import SignUp from './components/SignUp.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AllPosts from './components/AllPosts.jsx'
import AllBlogs from './components/AllBlogs.jsx'
import CreatePost from './components/CreatePost.jsx'
import EditPost from './components/EditPost.jsx'
import ViewBlog from './components/ViewBlog.jsx'
import Protected from './miniComponents/AuthLayout.jsx'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/signup',
        element:<Protected authentication = {false}> <SignUp/> </Protected>
      },
      {
        path:'/login',
        element:<Protected authentication = {false}> <LogIn/> </Protected>
      },
      {
        path:'/all-posts',
        element:<Protected authentication> <AllPosts/> </Protected>
      },
      {
        path:'/all-blogs',
        element:<Protected authentication> <AllBlogs/> </Protected>
      },
      {
        path:'/create-post',
        element:<Protected authentication> <CreatePost/> </Protected>
      },
      {
        path:'/edit-post/:slug',
        element:<Protected authentication> <EditPost/> </Protected>
      },
      {
        path:'/view-blog/:id',
        element:<Protected authentication> <ViewBlog/> </Protected>
        
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <Toaster position='bottom-right'/>
      <RouterProvider router={router} />
    </Provider>
  
)
