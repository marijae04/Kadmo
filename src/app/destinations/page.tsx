
"use client"
import { useSession, getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react";
import { Category, Post } from "@prisma/client";
import { getPostsAction } from "../../actions/get-posts.action";
import PostCard from "../Post-card";

export default function Recipes() {

  const [posts, setPosts] = useState<Post[] | undefined>([]);

  useEffect(() => {
      (async()=>{
        console.log("Getting posts")
        let response = await getPostsAction({ category: Category.Destination});
        
        setPosts(response?.posts);
      })();
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
          <h1 className="text-white text-2xl font-semibold text-primary mt-10 ml-5 mb-1">NEWS: {posts?.length ?? 0} </h1>
  
          <hr className="border-t-2 border-primary mx-5 my-2 pt-5" />
          
          <div className="grid gap-x-0 gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            
            {posts && posts.map((post, index) => {
              return (
                <div key={index}>

                  <PostCard post={post} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

