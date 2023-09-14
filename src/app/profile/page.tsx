
"use client"
import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
import { getPostsAction } from '../../actions/get-posts.action';
import PostCard from '../Post-card';
import { updateProfileDataAction } from '../../actions/update-profile-data.action';
import { getUserData } from '../../actions/get-user-data.action';

const Profile = () => {

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [selectedPosts, setSelectedPosts] = useState<"My posts" | "Saved posts" | "Liked posts">("My posts");

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts("My posts");

    getUserData()
    .then( (response: any)=>{
      if(response?.error) {
        console.log(response.error);
        alert(`Error getting user data: ${response.error}`);
      } else {
        console.log('Successfully got user data');
        setName(response.name);
        setUsername(response.username);
      }
    }).catch(error =>{
      console.log(error);
      alert('Error getting user data');
    })
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

  const updateProfileData = async (event: any) => {
    event.preventDefault();

    const dataForUpdating:any = {};
    if(name.trim() !== '') dataForUpdating.name = name;
    if(username.trim() !== '') dataForUpdating.username = username;
    if(password.trim() !== '') dataForUpdating.password = password;

    updateProfileDataAction(dataForUpdating)
    .then((response) => {
      if(response?.error) {
        console.log(response.error);
        alert(`Error updating profile data: ${response.error}`);
      } else {
        console.log('Successfully updated profile data');
        alert('Successfully updated profile data')
        setPassword('');
      }
    })
    .catch(error => {
      console.log(error);
      alert('Error updating profile data');
    })
    console.log(name, username, password);
  }

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
      <div className="container mx-auto mt-4 flex flex-col items-center">
        <div className="text-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="mt-2">
            <h1 className="text-2xl font-semibold">{name}</h1>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

            <form>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className="input-field rounded-[50px] w-full text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  className="input-field rounded-[50px] w-full text-center"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="input-field rounded-[50px] w-full text-center"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                onClick={(event) => updateProfileData(event)}
                className="btn-primary bg-lime-700 hover:bg-lime-900 text-white w-full h-full rounded-[50px] mt-3"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8 mb-5">
          <div
            className="cursor-pointer bg-lime-900 bg-opacity-80 rounded-lg p-4 text-center"
            onClick={() => getPosts("Saved posts")}
          >
            <h2 className="text-xl text-white font-semi mb-2">Saved Posts</h2>
          </div>

          <div
            className="cursor-pointer bg-lime-900 bg-opacity-80 rounded-lg p-4 text-center"
            onClick={() => getPosts("Liked posts")}
          >
            <h2 className="text-xl text-white font-semi mb-2">Liked Posts</h2>
          </div>

          <div
            className="cursor-pointer bg-lime-900 bg-opacity-80 rounded-lg p-4 text-center"
            onClick={() => getPosts("My posts")}
          >
            <h2 className="text-xl text-white font-semi mb-2">My Posts</h2>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl text-lime-900 font-semibold mb-4 text-left ml-3">
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