
"use client"
import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
import { getPostsAction } from '../../actions/get-posts.action';
import PostCard from '../Post-card';

const Profile = () => {

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [selectedPosts, setSelectedPosts] = useState<"My posts" | "Saved posts" | "Liked posts">("My posts");

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts("My posts");
  }, []);

  const getPosts = async (postType: typeof selectedPosts) => {
    setSelectedPosts(postType);
    try {
      const response = await getPostsAction({ type: postType });
      if (response.error) {
        console.log(response.error);
        alert(`Error getting posts: ${response.error}`);
      } else {
        setPosts(response.posts as Post[]);
      }
    } catch (error) {
      console.error(error);
      alert('Error getting posts');
    }
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>User not found</p>;
  }

  const user = {
    name: session?.user?.name,
  };

  return (
    <>
      <div className="container mt-4 ml-5 mr-5 flex">
        <div className="w-1/2 pr-3">
          <div className="justify-center mt-2">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-5">Profile Settings</h2>

            <form>
              <div className="mb-2">
                <input
                  type="text"
                  id="name"
                  className="input-field rounded-[50px] w-1/2 text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  id="username"
                  className="input-field rounded-[50px] w-1/2 text-center"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  id="password"
                  className="input-field rounded-[50px] w-1/2 text-center"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <button
                type="submit"
                className="btn-primary bg-green-700 hover:bg-green-900 text-white w-1/2 h-full rounded-[50px] mt-3"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="w-1/2">
          <div onClick={() => getPosts("Saved posts")} className="cursor-pointer mb-8">
            <div className="bg-zinc-700 bg-opacity-50 rounded-lg p-10">
              <h2 className="text-xl text-white font-semibold mb-4 text-center">
                Saved Posts
              </h2>
            </div>
          </div>

          <div onClick={() => getPosts("Liked posts")} className="cursor-pointer mb-8">
            <div className="bg-zinc-700 bg-opacity-50 rounded-lg p-10">
              <h2 className="text-xl text-white font-semibold mb-4 text-center">
                Liked Posts
              </h2>
            </div>
          </div>

          <div onClick={() => getPosts("My posts")} className="cursor-pointer mb-8">
            <div className="bg-zinc-700 bg-opacity-50 rounded-lg p-10">
              <h2 className="text-xl text-white font-semibold mb-4 text-center">
                My Posts
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl text-white font-semibold mb-4 text-center">
          {selectedPosts}
        </h2>
        <div className="grid gap-x-0 gap-y-5 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4">
          {posts?.map((post, index) => (
            <div key={index} className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <PostCard
                likedPost={post.likedByUsersIDs.includes(session?.user?.id!)}
                savedPost={post.savedByUsersIDs.includes(session?.user?.id!)}
                post={post as any}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;