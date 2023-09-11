import React from 'react';

interface AppBarItemProps {
  label: string;
  active?: boolean;
}

const AppBarItem: React.FC<AppBarItemProps> = ({ label, active }) => {
  return (
    <div className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default AppBarItem;
