'use client';

import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import AppBarItem from '../app/AppBarItem';

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

  return (
    <nav className={`w-full fixed z-40 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500">
        <Link href="/" passHref>
          <a>
            <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
          </a>
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <AppBarItem label="Home" />
          <AppBarItem label="Destination" />
          <AppBarItem label="Receipt" />
          <AppBarItem label="Music" />
        </div>
        <div onClick={toggleMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div onClick={toggleMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/user.jpg" alt="User Avatar" />
            </div>
            <UserCircleIcon className="w-6 text-gray-200 hover:text-gray-300 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;