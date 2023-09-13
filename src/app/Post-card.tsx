"use client"
import { Category, Country, Post, User } from "@prisma/client";
import React, { useState } from "react";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import { savePostAction } from "../actions/save-post.action";
import { likePostAction } from "../actions/like-post.action";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
    category,
  } = post;

  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [saved, setSaved] = useState<boolean | undefined>(undefined);

  const handleLike = () => {
    if (liked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const likePost = async () => {
    setLiked(true);
    likePostAction(id)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          alert(response.error);
          setLiked(!liked);
        } else {
          console.log("Successfully liked");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error liking post");
        setLiked(!liked);
      });
  };

  const unlikePost = async () => {
    setLiked(false);
    likePostAction(id, false)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          alert(response.error);
          setLiked(!liked);
        } else {
          console.log("Successfully unliked");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error unliking post");
        setLiked(!liked);
      });
  };

  const handleSave = () => {
    if (saved) {
      unsavePost();
    } else {
      savePost();
    }
  };

  const savePost = async () => {
    setSaved(true);
    savePostAction(id)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          alert(response.error);
          setSaved(!saved);
        } else {
          console.log("Successfully saved");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving post!!");
        setSaved(!saved);
      });
  };

  const unsavePost = async () => {
    setSaved(false);
    savePostAction(id, false)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          alert(response.error);
          setSaved(!saved);
        } else {
          console.log("Successfully saved");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving post!!");
        setSaved(!saved);
      });
  };

  const getImageUrl = () =>{
    if(category != Category.Music) return imageURL ?? '';

    if(songURL?.includes('youtube')){
      const url = new URL(songURL ?? '');
      const videoId = url.searchParams.get('v');
      console.log("RETURNING URL", `https://img.youtube.com/vi/${videoId}/0.jpg`)
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }else if(songURL?.includes('youtu.be')){
      const url = new URL(songURL ?? '');
      const videoId = url.pathname.split('/')[1];
      console.log("RETURNING URL", `https://img.youtube.com/vi/${videoId}/0.jpg`)
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }else{
      return imageURL ?? '';
    }
  }

  return (
    <div className="bg-zinc-300 bg-opacity-90 rounded-[5px] shadow-lg hover:bg-zinc-200 w-120 ml-3 mr-3">
      <img
        src={getImageUrl()}
        alt={title}
        sizes="(max-inline-size: 768px) 100vw, 700px "
        className="w-full h-36 object-cover rounded-[3px] "
      />
      <div className="flex items-left mb-2 mt-2 ml-2 mr-2 cursor-pointer">
        <button onClick={handleLike}>
          {(liked ?? likedPost) ? (
            <HeartIcon className="w-5 h-5 text-red-700 opacity-90" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 hover:gray-100 hover:opacity-50 " />
          )}
        </button>
        <button onClick={handleSave}>
          {(saved ?? savedPost) ? (
            <BookmarkIcon className="w-5 h-5 text-black opacity-90" />
          ) : (
            <BookmarkIcon className="w-5 h-5 text-gray-400 hover:gray-100 hover:opacity-50 " />
          )}
        </button>
        
        {/*Popravi link*/}
        <Link href={`/post/${id}`} className="mt-2">
            <button>
              <InformationCircleIcon className="w-5 h-5 text-black" />
            </button>
        </Link>

      </div>
      <h2 className="text-lg font-semibold text-primary ml-2 mr-2">{title}</h2>
      <p className="text-sm text-gray-800 mb-2 line-clamp-2 ml-2 mr-2">{content}</p>
      <div className="text-xs text-zinc-600 ml-2 mr-2">
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
      {category === "Music" && (
        <button
              className=" bg-green-700 hover:bg-green-900 rounded-[50px] ml-2 mb-3 mt-2 w-[10vw]">
            <a
              href={songURL ?? ""}
              className="text-white text-center"
            >
              Song Link
            </a>
        </button>
      )}
    </div>
  );
};

export default PostCard;