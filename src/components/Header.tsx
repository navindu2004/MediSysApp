
import React from 'react';
import { LogoutIcon, UserCircleIcon } from './IconComponents';

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="flex items-center justify-end h-16 bg-white shadow-sm px-4 md:px-8 shrink-0">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
          <span className="hidden md:inline ml-2 text-sm font-medium text-gray-700">{userEmail}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="hidden md:inline ml-2">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
