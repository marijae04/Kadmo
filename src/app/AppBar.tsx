'use client';

import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon, UserCircleIcon, ChevronDownIcon, ChevronUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AppBarItem from "./AppBarItems";

const TOP_OFFSET = 66;

const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((current) => !current);
  }, []);

  const mobileMenu = (
    <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
      <AppBarItem href="home" label="Home" />
      <AppBarItem href="destinations" label="Destination" />
      <AppBarItem href="recipes" label="Recipes" />
      <AppBarItem href="music" label="Music" />
      <AppBarItem href="events" label="Events" />
    </div>
  );

  return (
    <nav className={`w-full fixed z-40 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500">
        <Link href="/" passHref>
          <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <AppBarItem href="home" label="Home" />
          <AppBarItem href="destinations" label="Destination" />
          <AppBarItem href="recipes" label="Recipes" />
          <AppBarItem href="music" label="Music" />
          <AppBarItem href="events" label="Events" />
        </div>
        <div onClick={toggleMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <button onClick={toggleMenu} className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            {menuOpen ? <ChevronUpIcon className="w-6" /> : <ChevronDownIcon className="w-6" />}
          </button>
          {menuOpen && mobileMenu}
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <a href="/create-post" className="hidden lg:flex items-center gap-2 cursor-pointer relative">
            <PencilSquareIcon className="w-6 h-6 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
            <span className="text-gray-200 hover:text-gray-300 cursor-pointer transition">Add Post</span>
          </a>
          <a className="flex flex-row items-center gap-2 cursor-pointer relative lg:hidden">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/user.jpg" alt="User" />
            </div>
            <UserCircleIcon className="w-6 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
          </a>
          <div className="lg:flex hidden items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/user.jpg" alt="User" />
            </div>
            <UserCircleIcon className="w-6 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;