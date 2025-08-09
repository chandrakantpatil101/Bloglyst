import React from 'react'
import { User, MessageCircle, Share2, BarChart3, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';
import databaseService from '../appwrite/database';
import parse from 'html-react-parser';

function PostCard({ content, status, title, $id, featuredImage, onDelete }) {

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await databaseService.deletePost($id); // Your Appwrite delete method
                if (onDelete) onDelete($id); // Notify parent to update UI
            } catch (err) {
                console.error("Error deleting post:", err);
            }
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 flex items-start justify-between hover:shadow-md transition-all">

            {/* Left: Initial Icon */}
            <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-xl rounded-md border">
                    {featuredImage ? (
                        <img
                            src={databaseService.getFilePreview(featuredImage)}
                            alt={title.charAt(0).toUpperCase() + title.slice(1)}
                            className="w-full h-full mx-auto rounded-md border"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <h1>{title ? title.charAt(0).toUpperCase() : ''}</h1>
                    )}
                </div>
            </div>

            {/* Middle: Title & Content & date */}
            <div className="flex-grow">
                <Link to={`/edit-post/${$id}`}>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title || 'Title'}
                    </h3>
                    <div className="text-sm text-gray-500 line-clamp-2">
                        {parse(content) || 'Content'}
                    </div>
                </Link>
            </div>

            {/* Right: Status + Delete */}
            <div className="flex items-end justify-end flex-col gap-2 text-gray-500">
                <span>{status || 'Status'}</span>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
                    title="Delete Post"
                >
                    <Trash2 size={20} />
                </button>
            </div>

        </div>
    );
}

export default PostCard;
