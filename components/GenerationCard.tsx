import React from 'react';
import { GenerationItem, GenerationStatus, MediaType } from '../types';
import { Loader2, Download, Heart, Play, AlertCircle } from 'lucide-react';

interface GenerationCardProps {
  item: GenerationItem;
}

const GenerationCard: React.FC<GenerationCardProps> = ({ item }) => {
  const isVideo = item.type === MediaType.VIDEO;
  const isPending = item.status === GenerationStatus.PENDING || item.status === GenerationStatus.PROCESSING;
  const isFailed = item.status === GenerationStatus.FAILED;

  if (isPending) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative group break-inside-avoid mb-6 animate-pulse">
        <div className={`aspect-${isVideo ? 'video' : 'square'} bg-gray-900/50 flex flex-col items-center justify-center p-6 text-center`}>
          <div className="w-12 h-12 relative mb-4">
             <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm font-medium text-gray-300">
            Processing {isVideo ? 'Video' : 'Image'}...
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {isVideo ? 'Estimated: 1-2 min' : 'Estimated: 5-10 sec'}
          </p>
        </div>
        <div className="p-3 bg-gray-800 border-t border-gray-700">
           <div className="h-3 w-24 bg-gray-700 rounded mb-2"></div>
           <div className="h-2 w-full bg-gray-700 rounded opacity-50"></div>
        </div>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="bg-gray-800 rounded-xl border border-red-900/30 overflow-hidden break-inside-avoid mb-6">
        <div className="aspect-square bg-gray-900 flex flex-col items-center justify-center p-6 text-center text-red-400">
           <AlertCircle className="w-10 h-10 mb-2 opacity-80" />
           <p className="text-sm font-medium">Generation Failed</p>
           <p className="text-xs opacity-60 mt-1 max-w-[200px]">The model could not process this request.</p>
        </div>
        <div className="p-3 bg-gray-800 border-t border-gray-700">
            <p className="text-xs text-gray-500 line-clamp-1">{item.prompt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative group break-inside-avoid mb-6 hover:border-gray-500 transition-colors duration-300 shadow-lg shadow-black/20">
      <div className="relative overflow-hidden">
        {isVideo ? (
          <div className="relative">
             <video 
                src={item.url} 
                className="w-full object-cover aspect-video" 
                controls 
                loop 
                muted 
                poster={item.url} // Using video as poster if needed, or placeholder
             />
             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                <Play size={8} className="fill-white" />
                Veo
             </div>
          </div>
        ) : (
          <img 
            src={item.url} 
            alt={item.prompt} 
            className="w-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex justify-end gap-2">
            <button className="p-2 bg-gray-800/80 backdrop-blur text-white rounded-lg hover:bg-purple-600 transition-colors">
              <Heart size={16} />
            </button>
            {item.url && (
              <a href={item.url} download={`visionary-${item.id}.${isVideo ? 'mp4' : 'png'}`} className="p-2 bg-gray-800/80 backdrop-blur text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center">
                <Download size={16} />
              </a>
            )}
          </div>
          
          <button className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50">
            {isVideo ? 'Extend Video' : 'Upscale Image'}
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isVideo ? 'text-blue-400' : 'text-purple-400'} flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isVideo ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
            {isVideo ? 'AI Video · Veo' : 'AI Image · Gemini'}
          </span>
          <span className="text-[10px] text-gray-500">Just now</span>
        </div>
        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-light">
          {item.prompt}
        </p>
      </div>
    </div>
  );
};

export default GenerationCard;