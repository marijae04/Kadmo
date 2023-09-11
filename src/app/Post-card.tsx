import { Post } from "@prisma/client"
import React from 'react';

interface PostCardProps {
  title: string;
  content: string;
  imageUrl: string;
  countryId: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  songUrl: string;
}

const PostCard: React.FC<{ post: Post, index: number}> = (props:{ post: Post, index: number}) => {
  const { title, content, imageURL, category, authorId, createdAt, updatedAt, countryId, songURL} = props.post;
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageURL ?? ''} alt={title} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Country: {countryId}
          </div>
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Category: {category}
          </div>
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Created At: {createdAt.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Updated At: {updatedAt.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            <a
              href={songURL ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              Song Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;