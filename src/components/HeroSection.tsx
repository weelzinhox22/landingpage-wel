import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LaserFlow from './LaserFlow'; // Updated to .tsx
import GlassCard from './GlassCard';
import SplitText from './SplitText';
import { SiGithub, SiLinkedin } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      // Card Entry Animation
      tl.fromTo(cardContainerRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleAnimationComplete = () => {
    // console.log('All letters have animated!');
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#020525] pt-24 md:pt-32 pb-20">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
               backgroundSize: '30px 30px' 
             }} 
        />
        {/* Top Vignette */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
      </div>

      {/* Main Content Container - Vertical Layout */}
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-start text-left space-y-12">
        
        {/* Header Text Section */}
        <div className="flex flex-col items-start max-w-4xl space-y-6">
           
           {/* Kicker */}
           <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
             <p className="text-neon-pink font-mono tracking-[0.2em] text-xs uppercase font-bold">
               Digital Innovation
             </p>
           </div>

           {/* Title with SplitText Animation */}
           <div className="flex flex-col items-start -space-y-4">
              <SplitText 
                text="NEXUS STUDIO" 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white" 
                delay={30} 
                duration={1}
                splitType="chars"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete} 
              />
           </div>

           {/* Description */}
           <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mt-6">
             Transformando ideias em experiências digitais imersivas. <br className="hidden md:block" />
             Especialista em Web Design e Front-end com foco em microinterações e performance.
           </p>

           {/* Buttons */}
           <div className="flex flex-wrap justify-start gap-4 pt-4">
              <button className="cursor-target px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Ver Projetos
              </button>
              <button className="cursor-target px-8 py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all backdrop-blur-sm">
                Contato
              </button>
           </div>
        </div>

          {/* Card Interaction Area */}
        <div className="relative w-full flex flex-col items-start mt-12 pb-20">
           
           {/* Glass Card - Centered and "Catching" the laser */}
           <div ref={cardContainerRef} className="relative z-10 w-full max-w-5xl transform perspective-1000 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              
              {/* Laser Flow - Anchored to the top of the card and extending upwards */}
               <div className="absolute bottom-full left-0 w-full h-[100vh] md:h-[150vh] z-0 flex justify-center items-end opacity-100 mix-blend-screen pointer-events-none pb-0">
                  <div className="w-full h-full">
                     <LaserFlow 
                       color="#FF79C6" 
                       wispDensity={1.5} 
                       flowSpeed={0.8} 
                       verticalSizing={10} 
                       horizontalSizing={1} 
                       fogIntensity={0.6} 
                       fogScale={0.5} 
                       wispSpeed={15} 
                       wispIntensity={5} 
                       flowStrength={0.3} 
                       decay={1.8} 
                       horizontalBeamOffset={0} 
                       verticalBeamOffset={0} 
                     />
                  </div>
               </div>

              {/* Splash/Impact Effect at the top of the card */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[80px] md:h-[120px] bg-[#FF79C6]/30 blur-[40px] md:blur-[60px] rounded-full mix-blend-screen pointer-events-none z-20" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] md:w-[200px] h-[30px] md:h-[40px] bg-white/50 blur-[15px] md:blur-[20px] rounded-full mix-blend-overlay pointer-events-none z-30" />

              {/* Glow border wrapper */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#FF79C6]/50 via-[#FF79C6]/10 to-transparent blur-sm z-0"></div>
              
              <div className="relative z-10 transform rotate-x-[5deg] shadow-[0_-20px_80px_rgba(255,121,198,0.4)] rounded-2xl border-t border-white/20 bg-[#020204]">
                 <GlassCard onDimensionsChange={(maxWidth) => {
                    if (cardContainerRef.current) {
                      cardContainerRef.current.style.maxWidth = maxWidth;
                    }
                 }} />
              </div>
              
              {/* Dripping Light Edges */}
              <div className="absolute -left-[2px] top-0 w-[2px] h-[70%] bg-gradient-to-b from-[#FF79C6] to-transparent blur-[1px] opacity-80" />
              <div className="absolute -right-[2px] top-0 w-[2px] h-[70%] bg-gradient-to-b from-[#FF79C6] to-transparent blur-[1px] opacity-80" />
           </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
