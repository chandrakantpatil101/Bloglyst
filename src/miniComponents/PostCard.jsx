import React from 'react'
import { User, MessageCircle, Share2, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';

function PostCard({ content, status, title, $id }) {
    return (
        <div className="border rounded-lg p-4 mb-4 flex items-start justify-between hover:shadow-md transition-all">

            {/* Left: Initial Icon */}
            <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-xl rounded-md border">
                    W
                </div>
            </div>

            {/* Middle: Title & Date */}
            <div className="flex-grow">
                <Link to={`/edit-post/${$id}`}>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title || 'Title'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {content || 'Content'}
                    </p>
                </Link>
            </div>

            {/* Right: Author + Stats */}
            <div className="flex items-end justify-end flex-col gap-2 text-gray-500">
                {status || 'Status'}
            </div>

        </div>
    )
}

export default PostCard
