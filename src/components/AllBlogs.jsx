import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import databaseService from '../appwrite/database';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
   const userData = useSelector((state)=> state.authStore.userData )

  useEffect(() => {
    databaseService.getAllPost({ status: 'active', userId:userData.$id })
      .then((posts) => {
        setBlogs(posts);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>    
      </div>
    );
  }

  if (!blogs.length) {
    return <p className="text-center">No active blogs found.</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:px-20">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-600 ">
        All Blogs
      </h1>

      {/* Blog Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.$id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {blog.featuredImage && (
              <img
                src={databaseService.getFilePreview(blog.featuredImage)}
                alt={blog.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
            )}
            <div className="flex flex-col flex-1 p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex-1 line-clamp-3">
                {parse(blog.content)}
              </p>
              <Link
                to={`/view-blog/${blog.$id}`}
                className="mt-4 flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;
