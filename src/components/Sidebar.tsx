
import React from 'react';
import { LogoIcon, DashboardIcon, UploadIcon } from './IconComponents';

interface SidebarProps {
  activeView: 'dashboard' | 'upload';
  setActiveView: (view: 'dashboard' | 'upload') => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const baseClasses = 'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors';
  const activeClasses = 'bg-brand-primary text-white';
  const inactiveClasses = 'text-gray-600 hover:bg-brand-light hover:text-brand-primary';
  
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b">
        <LogoIcon className="h-10 w-auto" />
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-4 space-y-2">
           <NavLink 
            icon={<DashboardIcon className="h-6 w-6" />}
            label="Dashboard"
            isActive={activeView === 'dashboard'}
            onClick={() => setActiveView('dashboard')}
           />
           <NavLink 
            icon={<UploadIcon className="h-6 w-6" />}
            label="Upload Report"
            isActive={activeView === 'upload'}
            onClick={() => setActiveView('upload')}
           />
        </nav>
      </div>
       <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">&copy; 2024 MediSys Diagnostics Ltd.</p>
      </div>
    </div>
  );
};

export default Sidebar;
