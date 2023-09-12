import { Country, Post, User } from "@prisma/client";
import React, { useState } from "react";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid";

interface PostCardProps {
  post: Post & { author: User } & { country: Country };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    title,
    content,
    imageURL,
    author,
    country,
    createdAt,
    updatedAt,
    songURL,
  } = post;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-gray-300 bg-opacity-90 rounded-lg shadow-lg hover:bg-gray-200 w-9/10 ml-5 mr-5">
      <img
        src={imageURL ?? ""}
        alt={title}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="flex items-left mb-2 mt-2 ml-2 mr-2 cursor-pointer">
        <button onClick={handleLike}>
          {liked ? (
            <HeartIcon className="w-5 h-5 text-red-700" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:gray-100 hover:opacity-50" />
          )}
        </button>
        <button onClick={handleSave}>
          {saved ? (
            <BookmarkIcon className="w-5 h-5 text-black" />
          ) : (
            <BookmarkIcon className="w-5 h-5 text-gray-400 hover:gray-100 hover:opacity-50" />
          )}
        </button>
      </div>
      <h2 className="text-lg font-semibold text-primary ml-2 mr-2">{title}</h2>
      <p className="text-sm text-gray-800 mb-2 line-clamp-2 ml-2 mr-2">{content}</p>
      <div className="text-xs text-gray-700 ml-2 mr-2">
        <p>
          <strong>Country:</strong> {country.name}
        </p>
        <p>
          <strong>Author:</strong> {author.name}
        </p>
        <p>
          <strong>Created At:</strong> {createdAt.toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong> {updatedAt.toLocaleString()}
        </p>
      </div>
      <div className="text-sm text-gray-500 ml-2 mr-2">
        <a
          href={songURL ?? ""}
          className="text-red-500 hover:underline cursor-pointer"
        >
          Song Link
        </a>
      </div>
    </div>
  );
};

export default PostCard;