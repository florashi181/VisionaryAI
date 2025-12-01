import React from 'react';
import { UserProfile } from '../types';
import { Bolt, Bell } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="h-16 flex items-center justify-end px-8 shrink-0 z-40">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Spark Points</div>
          <div className="text-sm font-bold text-yellow-400 flex items-center gap-1">
            <Bolt size={14} className="fill-yellow-400" />
            {user.points.toLocaleString()}
          </div>
        </div>
        <div className="h-8 w-[1px] bg-gray-800"></div>
        <button className="text-gray-400 hover:text-white transition relative">
            <Bell size={20} />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-gray-900"></div>
        </button>
        <div className="flex items-center gap-3 pl-2">
           <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border-2 border-gray-700 shadow-inner ring-2 ring-gray-900 cursor-pointer"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;