"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

interface ProfileMenuProps {
  visible?: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ visible }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { data: session } = useSession();

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="item-right">
      <div className="cursor-pointer" onClick={toggleMenu}>
        <Bars3Icon className="h-8 w-8 text-black hover:text-gray-300" />
      </div>
      {menuVisible && (
        <div className="bg-black w-56 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex">
          <div className="flex flex-col gap-4">
            <div className="px-3 text-center text-white hover:underline">
              <Link href="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </div>
            <div className="px-3 text-center text-white hover:underline">
              <Link href="/sign-in" onClick={closeMenu}>
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;