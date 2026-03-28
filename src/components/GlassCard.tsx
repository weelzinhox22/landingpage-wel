import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Tilt } from 'react-tilt';
import { FiPlay, FiCpu, FiActivity, FiCheckCircle } from 'react-icons/fi';

interface GlassCardProps {
  onDimensionsChange?: (maxWidth: string) => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ onDimensionsChange }) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const snippets = [
    {
      id: 'react',
      filename: 'developer.tsx',
      language: 'TypeScript React',
      icon: <FiCpu className="text-neon-pink" />,
      minHeight: 'min-h-[260px]',
      maxWidth: '64rem', // Default Wide (max-w-5xl)
      lines: [
        { id: 1, text: 'interface Project {', indent: 0, color: 'text-neon-pink' },
        { id: 2, text: '  id: string;', indent: 2, color: 'text-white' },
        { id: 3, text: '  status: "completed";', indent: 2, color: 'text-white' },
        { id: 4, text: '  tech: ["React", "Three.js"];', indent: 2, color: 'text-white' },
        { id: 5, text: '}', indent: 0, color: 'text-white' },
        { id: 6, text: '', indent: 0, color: 'text-white' },
        { id: 7, text: 'const deploy = async () => {', indent: 0, color: 'text-neon-blue' },
        { id: 8, text: '  await optimize_assets();', indent: 2, color: 'text-yellow-300' },
        { id: 9, text: '  return "Ready 🚀";', indent: 2, color: 'text-green-400' },
        { id: 10, text: '};', indent: 0, color: 'text-white' },
      ]
    },
    {
      id: 'api',
      filename: 'api.service.ts',
      language: 'TypeScript',
      icon: <FiActivity className="text-neon-blue" />,
      minHeight: 'min-h-[200px]',
      maxWidth: '48rem', // Standard (max-w-3xl)
      lines: [
        { id: 1, text: 'async function fetchData() {', indent: 0, color: 'text-neon-blue' },
        { id: 2, text: '  try {', indent: 2, color: 'text-neon-pink' },
        { id: 3, text: '    const res = await api.get();', indent: 4, color: 'text-white' },
        { id: 4, text: '    if (res.status === 200) {', indent: 4, color: 'text-neon-pink' },
        { id: 5, text: '      return res.data;', indent: 6, color: 'text-green-400' },
        { id: 6, text: '    }', indent: 4, color: 'text-white' },
        { id: 7, text: '  } catch (err) {', indent: 2, color: 'text-neon-pink' },
        { id: 8, text: '    console.error(err);', indent: 4, color: 'text-yellow-300' },
        { id: 9, text: '  }', indent: 2, color: 'text-white' },
        { id: 10, text: '}', indent: 0, color: 'text-white' },
      ]
    },
    {
      id: 'style',
      filename: 'animations.css',
      language: 'CSS',
      icon: <FiCheckCircle className="text-yellow-300" />,
      minHeight: 'min-h-[320px]',
      maxWidth: '32rem', // Narrow/Tall (max-w-lg)
      lines: [
        { id: 1, text: '.glass-card {', indent: 0, color: 'text-yellow-300' },
        { id: 2, text: '  background: rgba(0,0,0,0.8);', indent: 2, color: 'text-white' },
        { id: 3, text: '  backdrop-filter: blur(20px);', indent: 2, color: 'text-neon-blue' },
        { id: 4, text: '  border: 1px solid white;', indent: 2, color: 'text-white' },
        { id: 5, text: '  transition: all 0.3s;', indent: 2, color: 'text-neon-pink' },
        { id: 6, text: '}', indent: 0, color: 'text-white' },
        { id: 7, text: '', indent: 0, color: 'text-white' },
        { id: 8, text: '.glass-card:hover {', indent: 0, color: 'text-yellow-300' },
        { id: 9, text: '  transform: scale(1.05);', indent: 2, color: 'text-neon-blue' },
        { id: 10, text: '  box-shadow: 0 0 30px pink;', indent: 2, color: 'text-white' },
        { id: 11, text: '}', indent: 0, color: 'text-white' },
        { id: 12, text: '  /* Responsive Morphing */', indent: 2, color: 'text-gray-500' },
        { id: 13, text: '  @media (max-width: 768px) {', indent: 2, color: 'text-yellow-300' },
        { id: 14, text: '    width: 100%;', indent: 4, color: 'text-neon-pink' },
        { id: 15, text: '  }', indent: 2, color: 'text-white' },
      ]
    }
  ];

  const currentSnippet = snippets[currentSnippetIndex];
  
  const codeLines = currentSnippet.lines;

  useEffect(() => {
    // Notify parent of initial dimensions
    if (onDimensionsChange) {
      onDimensionsChange(currentSnippet.maxWidth);
    }
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent triggering if clicking specific controls
    if ((e.target as HTMLElement).closest('button')) return;

    const nextIndex = (currentSnippetIndex + 1) % snippets.length;
    const nextSnippet = snippets[nextIndex];

    // Notify parent immediately for width animation
    if (onDimensionsChange) {
      onDimensionsChange(nextSnippet.maxWidth);
    }
    
    // Animation out
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setCurrentSnippetIndex(nextIndex);
        setIsTyping(true);
        setShowSuccess(false);
        
        // Animation in
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1
        });
        
        // Simular recompilação rápida
        setTimeout(() => {
          setIsTyping(false);
          setShowSuccess(true);
        }, 800);
      }
    });
  };

  const defaultTiltOptions = {
    reverse:        false,  // reverse the tilt direction
    max:            15,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1.02,   // 2 = 200%, 1.5 = 150%, etc..
    speed:          1000,   // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true,   // If the tilt effect has to be reset on exit.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  };

  useEffect(() => {
    // Simulate typing effect completion
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRun = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card switch
    setShowSuccess(false);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <Tilt options={defaultTiltOptions} className="w-full h-full cursor-pointer">
      <div 
        ref={containerRef}
        onClick={handleCardClick}
        className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A0A0C]/90 border border-white/10 backdrop-blur-xl shadow-2xl group transition-all duration-500 hover:border-neon-pink/30 hover:shadow-[0_0_50px_rgba(255,121,198,0.2)]"
      >
        {/* Glow Effects - Dynamic based on snippet */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none mix-blend-screen animate-pulse transition-colors duration-500 ${currentSnippet.id === 'react' ? 'bg-neon-pink/10' : currentSnippet.id === 'api' ? 'bg-neon-blue/10' : 'bg-yellow-300/10'}`} />
        <div className={`absolute -bottom-20 -left-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none mix-blend-screen transition-colors duration-500 ${currentSnippet.id === 'react' ? 'bg-neon-blue/10' : currentSnippet.id === 'api' ? 'bg-green-400/10' : 'bg-neon-pink/10'}`} />

        {/* Header (Window Controls) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors" />
            </div>
            <span className="ml-3 text-xs text-gray-500 font-mono flex items-center gap-1 select-none">
              {currentSnippet.icon} {currentSnippet.filename}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono select-none">
                <div className={`w-1.5 h-1.5 rounded-full ${showSuccess ? 'bg-green-400' : isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-gray-500'}`} />
                {showSuccess ? 'Online' : isTyping ? 'Compiling...' : 'Idle'}
             </div>
             <button 
               onClick={handleRun}
               className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
               title="Run Build"
             >
                <FiPlay size={12} className={isTyping ? "animate-spin opacity-50" : ""} />
             </button>
          </div>
        </div>

        {/* Code Body */}
        <div className={`p-5 font-mono text-sm overflow-hidden relative transition-all duration-500 ease-in-out ${currentSnippet.minHeight}`}>
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, 
               backgroundSize: '24px 24px' 
             }} 
          />

          <div ref={contentRef} className="relative z-10 flex flex-col gap-1">
            {codeLines.map((line, idx) => (
              <div 
                key={`${currentSnippet.id}-${line.id}`}
                className={`flex group/line hover:bg-white/5 rounded px-1 -mx-1 transition-colors cursor-default ${activeLine === idx ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(idx)}
                onMouseLeave={() => setActiveLine(null)}
              >
                {/* Line Number */}
                <span className="text-gray-700 w-8 text-right pr-3 select-none text-xs pt-[2px]">{line.id}</span>
                
                {/* Code Text */}
                <div className="flex-1 pl-1 relative">
                  <span className={`${line.color} transition-opacity duration-300`} style={{ marginLeft: `${line.indent * 8}px` }}>
                    {line.text}
                  </span>
                  
                  {/* Interactive Tooltip on specific lines (React Snippet) */}
                  {currentSnippet.id === 'react' && line.text.includes('Project') && activeLine === idx && (
                    <div className="absolute left-[140px] -top-8 bg-[#1a1a1e] border border-white/10 px-2 py-1 rounded text-[10px] text-gray-300 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2">
                       Define structure
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Blinking Cursor at the end */}
            <div className="flex items-center pl-[10px] pt-1">
               <span className="text-gray-700 w-8 text-right pr-3 text-xs">{codeLines.length + 1}</span>
               <div className="w-2 h-4 bg-neon-pink animate-pulse ml-1" />
            </div>
          </div>

          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-500">
               <FiCheckCircle className="text-green-400" />
               <span className="text-xs text-green-100 font-medium">Build Successful</span>
            </div>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="absolute bottom-0 w-full bg-black/40 border-t border-white/5 px-4 py-1.5 flex justify-between items-center text-[10px] text-gray-500 font-mono select-none">
           <div className="flex gap-3">
              <span className="flex items-center gap-1 hover:text-gray-300 transition-colors"><FiActivity size={10} /> master*</span>
              <span className="hover:text-gray-300 transition-colors">Ln {codeLines.length + 1}, Col 1</span>
           </div>
           <div className="flex gap-3">
              <span className="hover:text-gray-300 transition-colors">UTF-8</span>
              <span className="hover:text-gray-300 transition-colors">{currentSnippet.language}</span>
              <span className="text-neon-pink hover:text-neon-pink/80 transition-colors">Prettier</span>
           </div>
        </div>

      </div>
    </Tilt>
  );
};

export default GlassCard;
