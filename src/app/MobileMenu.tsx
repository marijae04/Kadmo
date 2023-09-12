
"use client"
import React from 'react';
import Link from 'next/link'; 

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/destinations">Destination</Link> 
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/recipes">Recipes</Link> 
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/music">Music</Link>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <Link href="/events">Events</Link>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;