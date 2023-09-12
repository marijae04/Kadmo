'use client';

import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { getPostsAction } from "../actions/get-posts.action";
import { Post } from "@prisma/client";
import PostCard from "./Post-card";
import Search from "../app/Search";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter()

  useEffect(() => {
    (async () => {
      console.log("Getting posts");
      let response = await getPostsAction();

      setPosts(response?.posts);
    })();
  }, []);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return router.push('/sign-in');
    // return <p>Access Denied</p>;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = searchQuery
    ? posts?.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <>
      <div>
        <div>
          <h1 className="text-white text-2xl font-semibold text-primary mt-10 ml-5 mb-1">
            NEWS: {posts?.length ?? 0}
          </h1>

          <div className="flex justify-center w-full mr-5 mt-2">
            <Search onSearch={handleSearch} />
          </div>

          <div className="grid gap-x-0 gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredPosts?.map((post, index) => {
              return (
                <div key={index}>
                  <PostCard
                    likedPost={post.likedByUsersIDs.includes(session?.user?.id!)}
                    savedPost={post.savedByUsersIDs.includes(session?.user?.id!)}
                    post={post as any}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
