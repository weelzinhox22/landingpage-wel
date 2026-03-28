import React, { useEffect } from 'react';
import Lenis from 'lenis';
import TargetCursor from './TargetCursor';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020525] text-white">
      <TargetCursor 
         spinDuration={4.3} 
         hideDefaultCursor 
         parallaxOn 
         hoverDuration={0.5} 
      />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};
