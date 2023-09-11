
"use client"
import { useSession, getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react";
import { getPostsAction } from "../actions/get-posts.action";
import { Post } from "@prisma/client";
import PostCard from "./Post-card";

export default function Home() {

  const [posts, setPosts] = useState<Post[] | undefined>([]);

  useEffect(() => {
    if(posts && posts.length > 0){
      (async()=>{
        let response = await getPostsAction();
        
        setPosts(response.posts);
      })();
    }
  }, []);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    //redirect to sign-in page

    redirect("/sign-in");
    return <p>Access Denied</p>
  }

  return (
    <>
      <div>

        <div>
          <h1 className="text-white">Posts total: { posts?.length ?? 0} </h1>

          {
            posts && posts.map((post, index) => {
              return <PostCard key={index} post={post} index={index}/>
            })
          }
        </div>
      </div>
    </>
  )
}
