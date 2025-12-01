import React from 'react';
import { GenerationItem, GenerationStatus, MediaType, ToolType } from '../types';
import ControlPanel from './ControlPanel';
import { RefreshCcw, Edit3, ChevronDown, Download, Heart, Trash2, Zap, Play } from 'lucide-react';

interface ImageGenerationViewProps {
  generations: GenerationItem[];
  onGenerate: (prompt: string, type: MediaType, tool: ToolType) => void;
  isGenerating: boolean;
  activeType: MediaType;
  onTypeChange: (type: MediaType) => void;
}

const ImageGenerationView: React.FC<ImageGenerationViewProps> = ({ generations, onGenerate, isGenerating, activeType, onTypeChange }) => {
  // Show all generations (Images and Videos) in a unified feed
  const displayGenerations = generations;

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] relative">
      
      {/* Top Filter Bar */}
      <div className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur border-b border-gray-800 px-8 py-4 flex justify-between items-center shrink-0">
         <div className="text-lg font-bold text-white tracking-tight">My generations</div>
         <div className="flex gap-4">
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition">
                Last 3 Months <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition">
                Creation Type <ChevronDown size={12} />
            </button>
         </div>
      </div>

      {/* Main List Area */}
      <div className="flex-1 overflow-y-auto p-8 pb-48 space-y-12">
        {displayGenerations.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Zap size={48} className="mb-4 opacity-20" />
              <p>No generations yet. Start creating!</p>
           </div>
        ) : (
           displayGenerations.map((item) => (
            <div key={item.id} className="animate-fade-in group/card max-w-5xl mx-auto">
                {/* Item Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <span className={`shrink-0 px-2 py-1 border rounded text-[10px] font-medium ${
                            item.type === MediaType.VIDEO 
                            ? 'bg-blue-900/20 border-blue-800 text-blue-300' 
                            : 'bg-gray-800 border-gray-700 text-gray-300'
                        }`}>
                            {item.tool}
                        </span>
                        <p className="text-sm text-gray-300 truncate font-light max-w-lg" title={item.prompt}>
                            {item.prompt}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs text-gray-500 font-mono hidden md:block">
                            {item.type === MediaType.VIDEO ? 'Veo 3.1' : 'Gemini 2.5 Flash'}
                        </span>
                        <div className="flex gap-2">
                             <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-xs transition border border-transparent hover:border-gray-700">
                                <Edit3 size={12} />
                                <span className="hidden sm:inline">Re-edit</span>
                             </button>
                             <button 
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-xs transition border border-transparent hover:border-gray-700"
                                onClick={() => !isGenerating && onGenerate(item.prompt, item.type, item.tool)}
                             >
                                <RefreshCcw size={12} />
                                <span className="hidden sm:inline">Regenerate</span>
                             </button>
                        </div>
                    </div>
                </div>

                {/* Content Container - Fixed Height (approx 40% of original aspect-video on large screens) */}
                <div className="w-full h-96 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
                    {/* Media Wrapper - Shrinks to fit content width */}
                    <div className="relative h-full w-auto group/media flex items-center justify-center">
                         {item.status === GenerationStatus.COMPLETED ? (
                            item.type === MediaType.VIDEO ? (
                                <video 
                                    src={item.url} 
                                    className="h-full w-auto max-w-full object-contain rounded shadow-2xl" 
                                    controls 
                                    loop 
                                />
                            ) : (
                                <img 
                                    src={item.url} 
                                    className="h-full w-auto max-w-full object-contain rounded shadow-2xl" 
                                    alt={item.prompt} 
                                />
                            )
                         ) : item.status === GenerationStatus.FAILED ? (
                            <div className="flex flex-col items-center justify-center text-red-400 w-64">
                                <span className="text-sm">Generation Failed</span>
                            </div>
                         ) : (
                            <div className="flex flex-col items-center justify-center text-gray-500 animate-pulse w-64">
                                <div className={`w-10 h-10 border-2 ${item.type === MediaType.VIDEO ? 'border-blue-500' : 'border-purple-500'} border-t-transparent rounded-full animate-spin mb-3`}></div>
                                <span className="text-xs">
                                    Generating {item.type === MediaType.VIDEO ? 'Video...' : 'Image...'}
                                </span>
                            </div>
                         )}

                         {/* Hover Overlay - Positioned relative to the media content */}
                         {item.status === GenerationStatus.COMPLETED && (
                            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 z-10">
                                 <button className="p-1.5 bg-black/60 backdrop-blur hover:bg-black/90 text-white rounded-md transition-colors" title="Favorite">
                                    <Heart size={14} />
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
                         )}
                    </div>
                </div>
            </div>
           ))
        )}
      </div>

      {/* Fixed Bottom Control Panel */}
      <ControlPanel 
         onGenerate={onGenerate} 
         isGenerating={isGenerating} 
         activeType={activeType}
         onTypeChange={onTypeChange}
      />
    </div>
  );
};

export default ImageGenerationView;