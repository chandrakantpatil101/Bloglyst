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
        element:<SignUp/>
      },
      {
        path:'/login',
        element:<LogIn/>
      },
      {
        path:'/all-posts',
        element:<AllPosts/>
      },
      {
        path:'/all-blogs',
        element:<AllBlogs/>
      },
      {
        path:'/create-post',
        element:<CreatePost/>
      },
      {
        path:'/edit-post/:id',
        element:<EditPost/>
      },
      {
        path:'/view-blog/:id',
        element:<ViewBlog/>
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
