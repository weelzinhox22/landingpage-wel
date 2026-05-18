import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/5571991373142?text=olá,%20quero%20adquirir%20a%20licença"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[60] flex items-center justify-center group"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: -180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: -10, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                className="absolute right-full mr-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-xl shadow-lg whitespace-nowrap pointer-events-none"
              >
                Vamos conversar? 👋
                <div className="absolute top-1/2 right-[-6px] -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button Pulse Effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 duration-1000" />
          
          {/* Main Button */}
          <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] border border-white/20 overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-y-full group-hover:translate-y-[-200%] transition-transform duration-700 ease-out" />
            
            <MessageCircle className="w-7 h-7 text-white fill-white" />
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
