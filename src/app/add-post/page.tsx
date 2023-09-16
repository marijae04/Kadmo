"use client"
import React, { useState } from "react";
import { Category, Country } from "@prisma/client";
import { createPostAction } from "../../actions/create-post-action";

const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<Category>("Destination");
  const [country, setCountry] = useState<string>("");

  const renderSongUrlInput = () => {
    if (category === "Music") {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Song URL
          </label>
          <input
            type="text"
            placeholder="Enter song URL"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      );
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const post = {
      title,
      content,
      imageUrl,
      category,
      country,
    };

    createPostAction({ title, content, imageURL: imageUrl, category, country })
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          alert(`Error creating post: ${response.error}`);
        } else {
          alert('Post created successfully');
          setTitle("");
          setContent("");
          setImageUrl("");
          setCategory(Category.Destination);
          setCountry("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error creating post');
      });
  };

  return (
    <div className="container mx-auto mt-4 p-4 sm:p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Content
          </label>
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full h-40"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          >
            <option value={Category.Destination}>{Category.Destination}</option>
            <option value={Category.Recipe}>{Category.Recipe}</option>
            <option value={Category.Music}>{Category.Music}</option>
            <option value={Category.Event}>{Category.Event}</option>
          </select>
        </div>

        {renderSongUrlInput()}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Country
          </label>
          <input
            type="text"
            placeholder="Enter country name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="bg-lime-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-lime-900"
          >
            Create Post
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddPost;