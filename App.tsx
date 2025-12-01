
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ToolsSection from './components/ToolsSection';
import GenerationCard from './components/GenerationCard';
import ImageGenerationView from './components/ImageGenerationView';
import AssetsView from './components/AssetsView';
import { GenerationItem, MediaType, GenerationStatus, UserProfile, ToolType, AppView } from './types';
import { generateAsset } from './services/geminiService';
import { Sparkles } from 'lucide-react';

// Pre-fill with some mock data
const MOCK_DATA: GenerationItem[] = [
  {
    id: 'mock-1',
    type: MediaType.IMAGE,
    tool: ToolType.TEXT_TO_IMAGE,
    status: GenerationStatus.COMPLETED,
    prompt: 'A futuristic fashion model walking in Tokyo streets, neon lights, cyberpunk aesthetic, highly detailed, 8k',
    url: 'https://picsum.photos/seed/cyberpunk/800/1000',
    timestamp: Date.now() - 100000,
    isFavorite: true,
  },
  {
    id: 'mock-2',
    type: MediaType.IMAGE,
    tool: ToolType.IMAGE_EDITING,
    status: GenerationStatus.COMPLETED,
    prompt: 'Product photography of a luxury perfume bottle on black glass, dramatic lighting, gold accents',
    url: 'https://picsum.photos/seed/perfume/800/800',
    timestamp: Date.now() - 200000,
  },
  {
    id: 'mock-3',
    type: MediaType.VIDEO,
    tool: ToolType.TEXT_TO_VIDEO,
    status: GenerationStatus.COMPLETED,
    prompt: 'A cinematic drone shot flying over a Nordic coastline with crashing waves',
    url: 'https://media.istockphoto.com/id/1455772765/video/waterfall-with-fresh-water-in-the-romantic-and-idyllic-tropical-jungle-rainforest.mp4?s=mp4-640x640-is&k=20&c=S_Z7gX2W-OAv9Lk0OXs2f_CqW-WLZW5wO1uJ_r_KxOo=',
    timestamp: Date.now() - 300000,
    videoDuration: 5,
  },
  {
    id: 'mock-4',
    type: MediaType.IMAGE,
    tool: ToolType.TEXT_TO_IMAGE,
    status: GenerationStatus.COMPLETED,
    prompt: 'A cute isometric 3D rendering of a cozy living room with plants and a cat',
    url: 'https://picsum.photos/seed/cozyroom/800/600',
    timestamp: Date.now() - 400000,
    isFavorite: true,
  },
  {
    id: 'mock-5',
    type: MediaType.IMAGE,
    tool: ToolType.TEXT_TO_IMAGE,
    status: GenerationStatus.COMPLETED,
    prompt: 'Abstract oil painting of a storm at sea, expressive brushstrokes, dark blue and gold',
    url: 'https://picsum.photos/seed/art/600/800',
    timestamp: Date.now() - 500000,
  }
];

const App: React.FC = () => {
  const [generations, setGenerations] = useState<GenerationItem[]>(MOCK_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<UserProfile>({ name: 'Admin', points: 34250 });
  const [activeTab, setActiveTab] = useState<AppView>('home');
  const [generationMode, setGenerationMode] = useState<MediaType>(MediaType.IMAGE);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleGenerate = async (prompt: string, type: MediaType, tool: ToolType) => {
    setIsGenerating(true);
    
    // Switch to the appropriate view to show progress
    setActiveTab(type);

    const cost = type === MediaType.IMAGE ? 10 : 250;
    
    // Create pending item
    const newItem: GenerationItem = {
      id: Date.now().toString(),
      type,
      tool,
      status: GenerationStatus.PROCESSING,
      prompt,
      timestamp: Date.now(),
      isFavorite: false
    };

    setGenerations(prev => [newItem, ...prev]);

    try {
      // Call Service
      const assetUrl = await generateAsset(type, prompt);
      
      // Update item with success
      setGenerations(prev => prev.map(item => 
        item.id === newItem.id 
          ? { ...item, status: GenerationStatus.COMPLETED, url: assetUrl } 
          : item
      ));
      
      // Deduct points
      setUser(prev => ({ ...prev, points: prev.points - cost }));

    } catch (error: any) {
      console.error("Generation failed:", error);
      
      // Update item with failure
      setGenerations(prev => prev.map(item => 
        item.id === newItem.id 
          ? { ...item, status: GenerationStatus.FAILED } 
          : item
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNavChange = (tab: AppView) => {
      setActiveTab(tab);
      if (tab === MediaType.IMAGE || tab === MediaType.VIDEO) {
          setGenerationMode(tab);
      }
  };

  return (
    <div className="bg-[#0B0F19] text-gray-100 font-sans h-screen flex overflow-hidden selection:bg-purple-500/30">
      
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onNavigate={handleNavChange} 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        
        {/* Top User Bar */}
        <Header user={user} />

        <main className="flex-1 overflow-hidden relative">
            
            {activeTab === 'home' && (
                <div className="h-full overflow-y-auto scroll-smooth">
                    {/* Hero & Input Section */}
                    <HeroSection 
                        onGenerate={handleGenerate} 
                        isGenerating={isGenerating}
                        activeType={generationMode}
                        onTypeChange={setGenerationMode}
                    />

                    {/* Tools Section */}
                    <ToolsSection />

                    {/* Inspiration Grid */}
                    <div className="max-w-7xl mx-auto px-6 pb-20">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                            <Sparkles className="text-yellow-500" size={20} />
                            <h2 className="text-xl font-bold text-white">Get inspired by Trendy contents</h2>
                            <span className="text-sm text-gray-500 ml-auto hidden sm:block">Community Showcase & Recent</span>
                        </div>

                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                            {generations.map(item => (
                                <GenerationCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {(activeTab === MediaType.IMAGE || activeTab === MediaType.VIDEO) && (
                <ImageGenerationView 
                    generations={generations}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    activeType={activeTab}
                    onTypeChange={(type) => {
                        setActiveTab(type);
                        setGenerationMode(type);
                    }}
                />
            )}

            {activeTab === 'assets' && (
                <AssetsView items={generations} />
            )}

        </main>
      </div>
      
    </div>
  );
};

export default App;
