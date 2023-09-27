
"use client"
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Country, Post, User } from "@prisma/client";
import { getPostsAction } from "../../../actions/get-posts.action";

const PostPage: React.FC<any> = () => {
  const pathName = usePathname()?.split('/')?.pop();
  const [post, setPost] = useState<Post & { author: User } & { country: Country } | undefined>(undefined);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await getPostsAction({ postId: pathName });

        if (response?.error) {
          console.error("Error fetching post:", response.error);
          alert(`Error getting post: ${response.error}`);
        } else {
          console.log('Successfully fetched post:', response.posts[0]);
          setPost(response.posts[0] as any);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Error getting post");
      }
    }

    fetchPostData();
  }, []);

  const isMusicCategory = post?.category === "Music";

  const formatDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleString() : "";
  };

  const getYoutubeVideoId = (url: string | undefined) => {
    if (!url) return "";
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/")[1];
      return videoId;
    }
    return "";
  };

  const youtubeThumbnailUrl = isMusicCategory && post?.songURL ? `https://img.youtube.com/vi/${getYoutubeVideoId(post.songURL)}/0.jpg` : "";

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-black text-3xl font-semibold mb-4">{post?.title}</h1>

      <p className="text-black mb-4">{post?.content}</p>

      <div className="text-black-200 text-sm mb-4">
        <p>
          <strong>Country:</strong> {post?.country?.name}
        </p>
        <p>
          <strong>Author:</strong> {post?.author?.name}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(post?.createdAt)}
        </p>
        <p>
          <strong>Updated At:</strong> {formatDate(post?.updatedAt)}
        </p>
      </div>

      <div className="relative h-full mb-6">
        {youtubeThumbnailUrl || post?.imageURL ? (
          <img
            src={youtubeThumbnailUrl || post?.imageURL || "/placeholder-image.jpg"}
            alt={post?.title || ''}
            className="rounded-md w-full h-full transition-opacity duration-300 ease-in-out"
            style={{ opacity: youtubeThumbnailUrl ? 0.7 : 1 }}
            onLoad={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        )}
      </div>

      {isMusicCategory && post?.songURL && (
        <div className="text-sm text-gray-200 mb-4">
          <button className="items-center mr-7 w-full gap-4 cursor-pointer relative bg-lime-700 hover:bg-lime-900 rounded-[50px] h-6">
            <span className="text-white tetx-1xl placeholder:cursor-pointer transition">
              Listen a song
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;