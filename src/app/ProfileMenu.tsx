"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface ProfileMenuProps {
  visible?: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ visible }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="relative">
      <UserCircleIcon
        className="cursor-pointer"
        onClick={toggleMenu}
      />
      {menuVisible && (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
          <div className="flex flex-col gap-4">
            <div className="px-3 text-center text-white hover:underline">
              <Link href="/profile">Profile</Link>
            </div>
            <div className="px-3 text-center text-white hover:underline">
              <Link href="/sign-in">Sign out</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;