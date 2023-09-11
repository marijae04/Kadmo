import { Post } from "@prisma/client"
import React from 'react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    title,
    content,
    imageURL,
    category,
    authorId,
    createdAt,
    updatedAt,
    countryId,
    songURL,
  } = post;

  return (
    <div className="text-3xl bg-gray-100 w-9/10 h-full rounded-lg shadow-lg overflow-hidden hover:gray-300 hover:opacity-90 ml-5 mr-5 mt-1 mb-1">
      <img
        src={imageURL ?? ''}
        alt={title}
        className="w-full h-auto sm:h-48 object-cover"
      />
      <div className="p-2">
        <h2 className="text-lg font-semibold mb-2 text-primary">{title}</h2>
        <p className="text-sm text-gray-800 mb-5">{content}</p>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-1 text-xs text-gray-500">
          <div className="mb-1">
            <strong>Country:</strong> {countryId}
          </div>
          <div className="mb-1">
            <strong>Category:</strong> {category}
          </div>
          <div className="mb-1">
            <strong>Created At:</strong> {createdAt.toLocaleString()}
          </div>
          <div className="mb-1">
            <strong>Updated At:</strong> {updatedAt.toLocaleString()}
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          <a
            href={songURL ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            Song Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;