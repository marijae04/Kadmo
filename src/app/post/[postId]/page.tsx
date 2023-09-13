"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Country, Post, User } from "@prisma/client";
import { getPostsAction } from "../../../actions/get-posts.action";

const PostPage: React.FC<any> = () => {

  // const router = useRouter();

  const pathName = usePathname()?.split('/')?.pop();

  const [post, setPost] = useState<Post & {author: User} & { country: Country} | undefined>(undefined);

  useEffect(() =>{
    getPostsAction({postId: pathName})
    .then((response: any) =>{
      if(response?.error) {
        console.log(response.error);
        alert(`Error getting post: ${response.error}`);
      } else {
        console.log('Successfully got post');
        console.log(response.posts[0])
        setPost(response.posts  [0] as any);
      }
    })
    .catch(error =>{
      console.log(error);
      alert('Error getting post');
    })
  },[])

  const isMusicCategory = post?.category === "Music";

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-semibold mb-4">{post?.title}</h1>

      <div className="relative h-64 mb-6">
        <img
          src={post?.imageURL ?? "/placeholder-image.jpg"}
          alt={post?.title ?? ''}
          className="rounded-md"
        />
      </div>

      <p className="text-gray-200 mb-4">{post?.content}</p>

      <div className="text-gray-200 text-sm mb-4">
        <p>
          <strong>Country:</strong> {post?.country?.name}
        </p>
        <p>
          <strong>Author:</strong> {post?.author?.name}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(post?.createdAt!).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(post?.updatedAt!).toLocaleString()}
        </p>
      </div>

      {isMusicCategory && post?.songURL && (
        <div className="text-sm text-gray-200 mb-4">
          <a
            href={post?.songURL}
            className="text-white hover:underline cursor-pointer"
          >
            Listen to the song
          </a>
        </div>
      )}
    </div>
  );
};

export default PostPage;