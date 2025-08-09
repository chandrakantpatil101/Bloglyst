import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import { useParams } from 'react-router-dom'
import databaseService from '../appwrite/database'

function EditPost() {

  const [post, setPost] = useState()
  const {slug} = useParams()                             //use param return this { slug: "my_post_id" }


  useEffect(()=>{
    if (slug) {
      databaseService.getPost(slug)
      .then((post)=>setPost(post))
      .catch(()=>console.log("Error on fetting post while editing"))   
    }
  },[slug])
  
  console.log(slug, " = ",post);

  return post ? (
    <div>
      {/* We are using same form to edit the post */}
      <CreatePost post={post}/>                                                
    </div>
  ) : ('Not Found')
}

export default EditPost
