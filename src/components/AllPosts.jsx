import React, { useEffect, useState } from 'react';
import PostCard from '../miniComponents/PostCard';
import { useNavigate } from 'react-router-dom';
import databaseService from '../appwrite/database';
import { useSelector } from 'react-redux';

function AllPosts() {
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.authStore.userData);

  useEffect(() => {
    setLoading(true);
    databaseService
      .getAllPost({ userId: userData.$id })
      .then((posts) => setPosts(posts))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.$id !== id)); // instantly remove
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!Posts.length) {
    return (
      <div>
        <p className="text-center">No posts found.</p>
        <button
          onClick={() => navigate('/create-post')}
          className='fixed bottom-45 left-270 bg-blue-500 text-white mb-5 px-4 py-2 rounded-full shadow-lg'>
          Create New
        </button>
      </div>
    )
  }

  return (
    <div>

      <div className='relative md:px-50 px-10 py-2 h-min-[100vh]'>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
          All Posts
        </h1>
        {Posts.map((post) => (
          <PostCard key={post.$id} {...post} onDelete={handleDelete} />
        ))}
      </div>
      <button
        onClick={() => navigate('/create-post')}
        className='sticky bottom-10 left-270 bg-blue-500 text-white mb-5 px-4 py-2 rounded-full shadow-lg'>
        Create New
      </button>
    </div>
  );
}

export default AllPosts;
