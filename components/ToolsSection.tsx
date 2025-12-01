import React, { useRef } from 'react';
import { Image as ImageIcon, Video, User, Wand2, RefreshCcw, Scissors, Layers, ScanFace, ChevronLeft, ChevronRight } from 'lucide-react';

const TOOLS = [
  { icon: ImageIcon, name: "Text to Image", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: RefreshCcw, name: "Image Face Swap", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { icon: Video, name: "Image to Video", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { icon: ScanFace, name: "Video Face Swap", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { icon: Scissors, name: "Background Remove", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { icon: Layers, name: "Image Upscale", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { icon: Wand2, name: "Style Transfer", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  { icon: User, name: "Avatar Generator", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
];

const ToolsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12 relative group/section">
      <div className="flex items-center gap-3 mb-6">
        <Wand2 className="text-purple-400" size={20} />
        <h2 className="text-xl font-bold text-white">Try with Visionary AI Tools</h2>
      </div>

      <div className="relative">
        
        {/* Left Arrow */}
        <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur border border-gray-700 rounded-full flex items-center justify-center text-white opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-purple-600 disabled:opacity-0"
        >
            <ChevronLeft size={20} />
        </button>

        {/* Scroll Container */}
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TOOLS.map((tool, index) => (
            <div 
              key={index} 
              className={`min-w-[200px] flex-1 bg-gray-800 rounded-xl border ${tool.border} p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-750 transition-all hover:-translate-y-1 snap-start group`}
            >
              <div className={`w-12 h-12 rounded-full ${tool.bg} flex items-center justify-center mb-1 group-hover:scale-110 transition-transform`}>
                <tool.icon className={tool.color} size={24} />
              </div>
              <span className="text-sm font-medium text-gray-200 text-center">{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur border border-gray-700 rounded-full flex items-center justify-center text-white opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-purple-600"
        >
            <ChevronRight size={20} />
        </button>

      </div>
    </div>
  );
};

export default ToolsSection;