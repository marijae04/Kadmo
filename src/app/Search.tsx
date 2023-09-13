
"use client"
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; 

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center w-full ml-5 mr-5 h-10 mb-12 relative">
      <div className="flex items-center flex-1">
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute top-1/2 transform -translate-y-1/2 left-3 text-black"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-7 pl-10 pr-3 py-2 rounded-full border focus:outline-none focus:ring focus:border-neutral"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Search;