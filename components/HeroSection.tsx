import React, { useState } from 'react';
import { MediaType, ToolType } from '../types';
import { ChevronRight, Video, Image as ImageIcon, Paperclip, Zap, Wand2 } from 'lucide-react';

interface HeroSectionProps {
  onGenerate: (prompt: string, type: MediaType, tool: ToolType) => void;
  isGenerating: boolean;
  activeType: MediaType;
  onTypeChange: (type: MediaType) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGenerate, isGenerating, activeType, onTypeChange }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolType>(ToolType.TEXT_TO_IMAGE);

  // Update tool options when type changes
  React.useEffect(() => {
    if (activeType === MediaType.IMAGE) {
      setSelectedTool(ToolType.TEXT_TO_IMAGE);
    } else {
      setSelectedTool(ToolType.TEXT_TO_VIDEO);
    }
  }, [activeType]);

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt, activeType, selectedTool);
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Make amazing creatives with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">VisionaryAI!</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your ideas into reality using the latest advanced AIGC models.
        </p>
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-2 shadow-2xl relative overflow-visible z-20">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-2 px-2 pt-2">
            <button
                onClick={() => onTypeChange(MediaType.IMAGE)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeType === MediaType.IMAGE 
                    ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
            >
                <ImageIcon size={16} />
                AI Image
            </button>
            <button
                onClick={() => onTypeChange(MediaType.VIDEO)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeType === MediaType.VIDEO 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
            >
                <Video size={16} />
                AI Video
            </button>
        </div>

        {/* Input Area */}
        <div className="relative bg-gray-900 rounded-xl border border-gray-700/50 focus-within:border-gray-600 transition-colors">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white px-5 py-4 pb-16 outline-none resize-none h-40 text-lg placeholder-gray-500 font-light"
              placeholder={activeType === MediaType.IMAGE 
                ? "Describe the image you want to generate..." 
                : "Describe the video you want to generate..."}
            />
            
            {/* Toolbar inside text area */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
                    <button className="p-2 text-gray-400 hover:text-white bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
                        <Paperclip size={18} />
                    </button>
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 relative group">
                         <span className="text-gray-500">Tool:</span>
                         {activeType === MediaType.IMAGE ? (
                            <select 
                                value={selectedTool}
                                onChange={(e) => setSelectedTool(e.target.value as ToolType)}
                                className="bg-transparent border-none outline-none appearance-none text-white font-medium cursor-pointer pr-4"
                            >
                                <option value={ToolType.TEXT_TO_IMAGE}>Text to Image</option>
                                <option value={ToolType.IMAGE_EDITING}>Image Editing</option>
                                <option value={ToolType.IMAGE_FACE_SWAP}>Image Face Swap</option>
                            </select>
                         ) : (
                            <span className="text-white font-medium">Text to Video</span>
                         )}
                         {activeType === MediaType.IMAGE && (
                             <Wand2 size={10} className="absolute right-2 text-gray-400 pointer-events-none" />
                         )}
                    </div>

                    <div className="flex items-center px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300">
                        <span className="text-gray-500 mr-2">Model:</span>
                        <span className="font-mono text-yellow-400">
                            {activeType === MediaType.IMAGE ? 'Gemini 2.5 Flash Image' : 'Veo 3.1'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <div className="text-xs text-gray-400 hidden sm:block">
                        Cost: <span className="text-white font-bold">{activeType === MediaType.IMAGE ? '10' : '250'}</span> <Zap size={10} className="inline mb-0.5 text-yellow-500" />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!prompt.trim() || isGenerating}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg ${
                            !prompt.trim() || isGenerating
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                            : activeType === MediaType.IMAGE 
                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
                        }`}
                    >
                        {isGenerating ? 'Generating...' : 'Generate'}
                        {!isGenerating && <ChevronRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;