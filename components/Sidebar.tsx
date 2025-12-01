
import React from 'react';
import { Home, Image as ImageIcon, Video, Settings, LifeBuoy, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaType, AppView } from '../types';

interface SidebarProps {
  activeTab: AppView;
  onNavigate: (tab: AppView) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate, isCollapsed, onToggle }) => {
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-950 border-r border-gray-800 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out`}>
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} border-b border-gray-800 relative`}>
         <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20 shrink-0">V</div>
            {!isCollapsed && <span className="text-lg font-bold text-white tracking-tight ml-3 animate-fade-in whitespace-nowrap overflow-hidden">VisionaryAI</span>}
         </div>
         
         {!isCollapsed && (
             <button onClick={onToggle} className="text-gray-500 hover:text-white transition p-1">
                 <ChevronLeft size={18} />
             </button>
         )}
         {isCollapsed && (
             <button onClick={onToggle} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 z-50">
                 <ChevronRight size={14} />
             </button>
         )}
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        <button 
          onClick={() => onNavigate('home')}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'home' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          title={isCollapsed ? "Homepage" : ""}
        >
          <Home size={20} />
          {!isCollapsed && <span>Homepage</span>}
        </button>

        {!isCollapsed ? (
          <div className="mt-8 px-2 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 whitespace-nowrap overflow-hidden">
            Generation
          </div>
        ) : (
          <div className="my-4 border-t border-gray-800 mx-2"></div>
        )}
        
        <button 
          onClick={() => onNavigate(MediaType.IMAGE)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === MediaType.IMAGE ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          title={isCollapsed ? "AI Image" : ""}
        >
          <ImageIcon size={20} />
          {!isCollapsed && <span>AI Image</span>}
        </button>
        <button 
          onClick={() => onNavigate(MediaType.VIDEO)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === MediaType.VIDEO ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
          title={isCollapsed ? "AI Video" : ""}
        >
          <Video size={20} />
          {!isCollapsed && <span>AI Video</span>}
        </button>

        {!isCollapsed ? (
          <div className="mt-8 px-2 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 whitespace-nowrap overflow-hidden">
            Library
          </div>
        ) : (
          <div className="my-4 border-t border-gray-800 mx-2"></div>
        )}

        <button 
            onClick={() => onNavigate('assets')}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'assets' ? 'bg-gray-800 text-white border border-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
            title={isCollapsed ? "Assets" : ""}
        >
          <Layers size={20} />
          {!isCollapsed && <span>Assets</span>}
        </button>
      </div>

      <div className="p-4 border-t border-gray-800 space-y-1">
         <button 
            className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} text-gray-400 hover:text-white text-sm font-medium w-full py-2.5 rounded-lg hover:bg-gray-900 transition`}
            title={isCollapsed ? "Settings" : ""}
         >
            <Settings size={20} />
            {!isCollapsed && <span>Settings</span>}
         </button>
         <button 
            className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} text-gray-400 hover:text-white text-sm font-medium w-full py-2.5 rounded-lg hover:bg-gray-900 transition`}
            title={isCollapsed ? "Help & Support" : ""}
         >
            <LifeBuoy size={20} />
            {!isCollapsed && <span>Help & Support</span>}
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
