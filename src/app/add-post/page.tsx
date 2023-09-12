"use client"
import React, { useState } from "react";
import { Category, Country } from "@prisma/client";
import Link from "next/link";

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
          <label className="block text-gray-700 text-sm font-bold mb-2">
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

    console.log("Post data:", post);

    setTitle("");
    setContent("");
    setImageUrl("");
    setCategory("Destination");
    setCountry("");
  };

  return (
    <div className="container mx-auto mt-4 p-4 ml-5">
      <h1 className="text-2xl font-semibold">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full h-32"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          >
            <option value="Destination">Destination</option>
            <option value="Recipes">Recipes</option>
            <option value="Music">Music</option>
            <option value="Events">Events</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
        {renderSongUrlInput()}
        <button
          type="submit"
          className="bg-green-700 text-white font-bold py-2 px-4 rounded-full hover:bg-green-900"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;