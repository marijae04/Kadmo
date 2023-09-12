'use client';

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
    // Fetch and set the user's saved, liked, and own posts
  };

  return (
    <div className="container mx-auto mt-6 p-4 ml-5">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-black">@{user.username}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 ">Name</label>
            <input
              type="text"
              id="name"
              className="input-field rounded-[50px] w-1/4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="input-field rounded-[50px] w-1/4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="input-field rounded-[50px] w-1/4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary bg-green-700 hover:bg-green-900 text-white w-1/4 h-full rounded-[50px]">
            Update Profile
          </button>
        </form>
      </div>

      <div className="mt-8">
        <div className="mb-8">
          <h2 className="text-xl text-white font-semibold mb-4">Saved Posts</h2>
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-white font-semibold mb-4">Liked Posts</h2>
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-white font-semibold mb-4">Your Posts</h2>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;