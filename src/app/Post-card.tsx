import { Country, Post, User } from "@prisma/client";
import React, { useState } from "react";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import { savePostAction } from "../actions/save-post.action";
import { likePostAction } from "../actions/like-post.action";

interface PostCardProps {
  post: Post & { author: User } & { country: Country };
  likedPost: boolean;
  savedPost: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ likedPost, savedPost, post }) => {
  const {
    id,
    title,
    content,
    imageURL,
    author,
    country,
    createdAt,
    updatedAt,
    songURL,
  } = post;

  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [saved, setSaved] = useState<boolean | undefined>(undefined);

  const handleLike = () => {
    if(liked){
      unlikePost()
    }else{
      likePost()
    }
  };

  const likePost = async () => {
    setLiked(true);
    likePostAction(id)
    .then((response) => {

      if(response?.error){
        console.log(response.error);
        alert(response.error)
        setLiked(!liked);
      }else{
        console.log("Successfully liked")
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error liking post');
      setLiked(!liked);
    })
  }

  const unlikePost = async () => {
    setLiked(false);
    likePostAction(id, false)
    .then((response) => {

      if(response?.error){
        console.log(response.error);
        alert(response.error);
        setLiked(!liked);
      }else{
        console.log("Successfully unliked")
        
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error unliking post');
      setLiked(!liked);
    })
  }

  const handleSave = () => {
    if(saved){
      unsavePost()
    }else{
      savePost()
    }
  };

  const savePost = async () => {
    setSaved(true);
    savePostAction(id)
    .then((response) => {

      if(response?.error){
        console.log(response.error);
        alert(response.error)
        setSaved(!saved);
      }else{
        console.log("Successfully saved")
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error saving post!!');
      setSaved(!saved);
    })
  }

  const unsavePost = async () => {
    setSaved(false);
    savePostAction(id, false)
    .then((response) => {

      if(response?.error){
        console.log(response.error);
        alert(response.error);
        setSaved(!saved);
      }else{
        console.log("Successfully saved")
        
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error saving post!!');
      setSaved(!saved);
    })
  }

  return (
    <div className="bg-gray-300 bg-opacity-90 rounded-lg shadow-lg hover:bg-gray-200 w-9/10 ml-5 mr-5">
      <img
        src={imageURL ?? ""}
        alt={title}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="flex items-left mb-2 mt-2 ml-2 mr-2 cursor-pointer">
        <button onClick={handleLike}>
          {(liked ?? likedPost) ? (
            <HeartIcon className="w-5 h-5 text-red-700" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:gray-100 hover:opacity-50" />
          )}
        </button>
        <button onClick={handleSave}>
          {(saved ?? savedPost) ? (
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