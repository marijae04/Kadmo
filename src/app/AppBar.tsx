
"use client"
import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon, UserCircleIcon, ChevronDownIcon, ChevronUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AppBarItem from "./AppBarItems";
import MobileMenu from "./MobileMenu";
import LoginButton from "./LoginButton";

const TOP_OFFSET = 66;

const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className={`w-full h-50 fixed z-40 ${showBackground ? 'bg-black' : ''}`}>
      <div className="px-4 md:px-16 py-4 flex flex-row items-center transition duration-500">

        <Link href="/" passHref>
          <img src="/images/logo.png" className="h-5 lg:h-8 mt" alt="Logo" />
        </Link>

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <AppBarItem href="destinations" label="Destination" />
          <AppBarItem href="recipes" label="Recipes" />
          <AppBarItem href="music" label="Music" />
          <AppBarItem href="events" label="Events" />
        </div>

        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="flex flex-row ml-auto items-end">
          <a href="/add-post" className="lg:flex items-center gap-2 cursor-pointer relative">
            <PencilSquareIcon className="hidden lg:w-6 lg:h-6 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
            <span className="text-gray-200 hover:text-gray-300 cursor-pointer transition">Add Post</span>
          </a>
        </div>

        <LoginButton/>

        <Link href="/profile">
          <div className="lg:flex items-center gap-4 ml-5 cursor-pointer relative">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <UserCircleIcon className="w-9 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
            </div>
          </div>
        </Link>
        
      </div>
    </nav>
  );
}

export default AppBar;