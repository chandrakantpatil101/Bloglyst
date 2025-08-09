import React, { useEffect, useState } from 'react'
import PostCard from '../miniComponents/PostCard'
import { useNavigate } from 'react-router-dom'
import databaseService from '../appwrite/database'

function AllPosts() {
  const navigate = useNavigate()
  const [Posts, setPosts] = useState([])


  useEffect(() => {
    databaseService.getAllPost()
      .then((posts) => {
        setPosts(posts)
        console.log(posts, " --> ", Posts);
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <div className='md:px-50 px-20 py-5'>
        {Posts && Posts.length > 0 ? (
          Posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))
        ) : (
          'No Post'
        )}

        <button onClick={() => navigate('/create-post')} className='fixed bottom-6 right-6' >Create New</button>
      </div>
    </div>
  )
}

export default AllPosts
