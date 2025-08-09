import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import databaseService from '../appwrite/database';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state)=>state.authStore.userData)

  useEffect(() => {
    databaseService.getPost(id) // Fetch single post by ID
      .then((post) => {
        setBlog(post);
      })
      .catch((err) => {
        console.error('Error fetching blog:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Blog image */}
      {blog.featuredImage && (
        <img
          src={databaseService.getFilePreview(blog.featuredImage)}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      )}

      {/* Blog title */}
      <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>

      {/* Author and date */}
      <div className="flex items-center gap-3 text-gray-500 text-sm mt-2">
        <span>By {userData.name || "Unknown"}</span>
        <span>•</span>
        <span>{new Date(blog.$createdAt).toLocaleDateString()}</span>
      </div>

      {/* Blog content */}
      <div className="mt-6 prose max-w-none">
        {parse(blog.content)} {/* HTML parsing here */}
      </div>

      {/* Back button */}
      <Link
        to="/all-blogs"
        className="inline-block mt-8 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
}

export default ViewBlog;
