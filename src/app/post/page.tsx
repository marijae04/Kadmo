"use client"
import React from "react";
import Image from "next/image";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { Country, Post, User } from "@prisma/client";

interface PostPageProps {
  post: Post & { author: User } & { country: Country };
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {

  const isMusicCategory = post?.category === "Music";

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-semibold mb-4">{post?.title}</h1>

      <div className="relative h-64 mb-6">
        <Image
          src={post?.imageURL ?? "/placeholder-image.jpg"}
          alt={post?.title}
          layout="fill"
          objectFit="cover"
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
          {new Date(post?.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(post?.updatedAt).toLocaleString()}
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