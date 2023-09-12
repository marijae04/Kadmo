import Link from 'next/link';
import React from 'react';

interface AppBarItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const AppBarItem: React.FC<AppBarItemProps> = ({ label, active, href }) => {
  return (
    <Link href={href}>
      <div className={active ? 'text-white font-semibold cursor-default' : 'text-white hover:text-gray-300 cursor-pointer transition'}>
        {label}
      </div>
    </Link>
  )
}

export default AppBarItem;
