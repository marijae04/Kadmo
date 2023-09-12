
"use client"
import { Post } from '@prisma/client';
import { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const user = {
    name: 'Pera',
    username: 'Pera Peric',
  };

  const fetchUserPosts = () => {
    //user's saved, liked, and own posts
  };

  return (
    <div className="container mx-auto mt-4 p-4 ml-5">
      <div className="justify-center mt-2">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-black">@{user.username}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-5">Profile Settings</h2>

        <form>
          <div className="mb-2">
            <input
              type="text"
              id="name"
              className="input-field rounded-[50px] w-1/3 text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='name'
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              id="username"
              className="input-field rounded-[50px] w-1/3 text-center"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='username'
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              id="password"
              className="input-field rounded-[50px] w-1/3 text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
            />
          </div>
          <button type="submit" className="btn-primary bg-green-700 hover:bg-green-900 text-white w-1/3 h-full rounded-[50px] mt-3">
            Update Profile
          </button>
        </form>
      </div>

      <div className="mt-8 flex ">
        <div className="mb-8 w-full p-3">
          <h2 className="text-xl text-black font-semibold mb-4">Saved Posts</h2>
          <div className="bg-zinc-800 bg-opacity-50 rounded-lg p-10 w-full h-full mr-5">
            {/* Saved Posts */}
          </div>
        </div>

        <div className="mb-8 w-full p-3">
          <h2 className="text-xl text-black font-semibold mb-4">Liked Posts</h2>
          <div className="bg-zinc-800 bg-opacity-50 rounded-lg p-10 w-full h-full mr-5">
            {/* Liked Posts */}
          </div>
        </div>

        <div className="mb-8 w-full p-3">
          <h2 className="text-xl text-black font-semibold mb-4">Your Posts</h2>
          <div className="bg-zinc-800 bg-opacity-50 rounded-lg p-10 w-full h-full mr-5">
            {/* My Posts */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;