import React from 'react';
import { motion } from 'motion/react';

interface FooterMarqueeProps {
  isHovered: boolean;
}

const FooterMarquee: React.FC<FooterMarqueeProps> = ({ isHovered }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-[10]">
      <div className="relative w-full translate-y-[-10%]">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ 
            x: ["0%", "-50%"] 
          }}
          transition={{ 
            duration: isHovered ? 60 : 30, 
            ease: "linear", 
            repeat: Infinity,
          }}
        >
          {/* Content duplicated for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <div 
                key={i} 
                className={`
                    relative px-4
                    text-[15vw] leading-none font-bold tracking-widest
                    text-white opacity-[0.05]
                    transition-all duration-700
                    ${isHovered ? 'blur-[1px] opacity-[0.08]' : ''}
                `}
                style={{
                    fontFamily: 'Inter, sans-serif',
                }}
            >
              STUDIO ORYON
            </div>
          ))}
        </motion.div>
        
        {/* Subtle Gradient Fade Edges (Optional, for premium feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020525] via-transparent to-[#020525] w-full h-full opacity-20 pointer-events-none" />
      </div>
    </div>
  );
};

export default FooterMarquee;
