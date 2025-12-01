
import React, { useState, useMemo } from 'react';
import { GenerationItem, MediaType } from '../types';
import { Calendar, Music, Heart, Download, Trash2 } from 'lucide-react';

interface AssetsViewProps {
  items: GenerationItem[];
}

const AssetsView: React.FC<AssetsViewProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<MediaType>(MediaType.IMAGE);
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter and Group Items
  const groupedItems = useMemo(() => {
    // 1. Filter by Tab (Type)
    let filtered = items.filter(item => item.type === activeTab);

    // 2. Filter by Favorites (if checked)
    if (showFavorites) {
      filtered = filtered.filter(item => item.isFavorite);
    }

    // 3. Sort by Date (Newest first)
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    // 4. Group by Date String
    const groups: { [key: string]: GenerationItem[] } = {};
    
    filtered.forEach(item => {
      const date = new Date(item.timestamp);
      // Format: Month Day (e.g. November 27)
      const dateKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    return groups;
  }, [items, activeTab, showFavorites]);

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] p-8 overflow-hidden">
      
      {/* Header & Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab(MediaType.IMAGE)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === MediaType.IMAGE
              ? 'bg-gray-800 text-white border border-gray-700'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab(MediaType.VIDEO)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === MediaType.VIDEO
              ? 'bg-gray-800 text-white border border-gray-700'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Videos
        </button>
      </div>

      {/* Filter Bar */}
      {activeTab === MediaType.IMAGE && (
        <div className="flex items-center gap-4 mb-8 bg-gray-900/50 p-1 rounded-lg w-fit">
          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 w-64">
            <input 
               type="text" 
               placeholder="Start Date" 
               className="bg-transparent border-none outline-none text-xs text-gray-300 w-full placeholder-gray-500"
            />
            <span className="text-gray-500 mx-2">→</span>
            <input 
               type="text" 
               placeholder="End Date" 
               className="bg-transparent border-none outline-none text-xs text-gray-300 w-full placeholder-gray-500"
            />
            <Calendar size={14} className="text-gray-500 ml-2" />
          </div>
          
          <div className="h-4 w-[1px] bg-gray-700"></div>

          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer px-2 hover:text-gray-200 select-none">
            <input 
                type="checkbox" 
                checked={showFavorites}
                onChange={(e) => setShowFavorites(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-0 focus:ring-offset-0" 
            />
            My Favorites
          </label>
        </div>
      )}

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto pr-2 pb-20 custom-scrollbar">
        {Object.keys(groupedItems).length === 0 ? (
            <div className="text-gray-500 text-sm mt-10 ml-2">No assets found for this selection.</div>
        ) : (
            Object.keys(groupedItems).map(dateKey => (
            <div key={dateKey} className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">{dateKey}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {groupedItems[dateKey].map(item => (
                    <div key={item.id} className="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all aspect-video">
                        {item.type === MediaType.VIDEO ? (
                             <div className="w-full h-full relative">
                                <video 
                                    src={item.url} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 text-gray-400">
                                    <Music size={12} />
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300">
                                    00:05
                                </div>
                             </div>
                        ) : (
                             <img 
                                src={item.url} 
                                alt={item.prompt} 
                                className="w-full h-full object-cover"
                             />
                        )}
                        
                        {/* Hover Overlay with Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button className="p-1.5 bg-black/60 backdrop-blur hover:bg-black/90 text-white rounded-md transition-colors" title="Favorite">
                                <Heart size={14} className={item.isFavorite ? "fill-white" : ""} />
                             </button>
                             <a 
                                href={item.url} 
                                download={`visionary-${item.id}.${item.type === MediaType.VIDEO ? 'mp4' : 'png'}`}
                                className="p-1.5 bg-black/60 backdrop-blur hover:bg-black/90 text-white rounded-md transition-colors flex items-center justify-center"
                                title="Download"
                             >
                                <Download size={14} />
                             </a>
                             <button className="p-1.5 bg-black/60 backdrop-blur hover:bg-red-900/90 text-white rounded-md transition-colors" title="Delete">
                                <Trash2 size={14} />
                             </button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            ))
        )}
      </div>

    </div>
  );
};

export default AssetsView;
