import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Interface for Cloud objects
interface Cloud {
  src: string;
  duration: number;
  className: string;
  delay: number; // Negative delay to start mid-animation
}

export const HeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax Transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]); // Fundo: Muito lento
  const mountainsY = useTransform(scrollY, [0, 1000], [0, 300]); // Montanhas: Lento
  const valeY = useTransform(scrollY, [0, 1000], [0, 400]);      // Vale: Médio
  const forestY = useTransform(scrollY, [0, 1000], [0, 500]);    // Floresta: Médio/Rápido
  const logoY = useTransform(scrollY, [0, 1000], [0, 250]);      // Logo: Leve para manter visibilidade
  const objectsY = useTransform(scrollY, [0, 1000], [0, 100]);   // Objetos: Quase fixo

  // Cloud Configuration (Ultra Slow Motion & Scattered)
  // Durations between 180s - 300s
  const clouds: Cloud[] = [
    { 
        src: '/assets/cloud1.png', 
        duration: 240, 
        delay: -10,
        className: 'top-[5%] w-[180px] md:w-[40vw]' 
    },
    { 
        src: '/assets/cloud2.png', 
        duration: 220, 
        delay: -100,
        className: 'top-[15%] w-[200px] md:w-[50vw]' 
    },
    { 
        src: '/assets/cloud3.png', 
        duration: 200, 
        delay: -40,
        className: 'top-[25%] w-[220px] md:w-[60vw]' 
    },
    { 
        src: '/assets/cloud4.png', 
        duration: 180, 
        delay: -140,
        className: 'top-[40%] w-[240px] md:w-[70vw]' 
    },
    { 
        src: '/assets/cloud5.png', 
        duration: 160, 
        delay: -80,
        className: 'top-[10%] w-[220px] md:w-[60vw]' 
    },
    { 
        src: '/assets/cloud6.png', 
        duration: 140, 
        delay: -20,
        className: 'bottom-[20%] w-[280px] md:w-[80vw]' 
    },
  ];

  return (
    <div ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-[#020525]">
      
      {/* 1. Background Layer (Z-0) */}
      <motion.div 
        style={{ y: backgroundY, zIndex: 0 }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/assets/background.png" 
          alt="Sky Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* 2. Mountains Layer (Z-10) */}
      {/* Positioned higher (bottom-[15%]) to be visible behind the valley */}
      <motion.div 
        style={{ y: mountainsY, zIndex: 10 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img 
          src="/assets/montanhas.png" 
          alt="Montanhas" 
          className="absolute inset-0 w-full h-full object-cover -translate-y-[2vh]"
        />
        <img 
          src="/assets/montain2.png" 
          alt="Mountain Right" 
          className="absolute bottom-0 md:bottom-[15%] right-0 h-[30vh] w-auto md:w-[50%] md:h-auto object-contain md:max-h-[80vh] opacity-90"
        />
      </motion.div>

      {/* 3. Clouds Layer (Z-20) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {clouds.map((cloud, index) => (
            <motion.div
                key={index}
                className={`absolute left-0 ${cloud.className}`}
                initial={{ x: "-100%" }}
                animate={{ x: "100vw" }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: cloud.duration,
                    delay: cloud.delay 
                }}
            >
                <img 
                  src={cloud.src} 
                  alt="Cloud" 
                  className="w-full h-auto object-contain opacity-60 md:opacity-100" 
                />
            </motion.div>
        ))}
      </div>

      {/* 4. Vale/River Layer (Z-30) */}
      <motion.div 
        style={{ y: valeY, zIndex: 30 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img 
          src="/assets/vale.png" 
          alt="Valley" 
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
      </motion.div>

      {/* 5. Forest Layer (Z-40) */}
      <motion.div 
        style={{ y: forestY, zIndex: 40 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img 
          src="/assets/florest.png" 
          alt="Forest" 
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
      </motion.div>

      {/* 6. Logos (Z-50) */}
      <motion.div 
        style={{ y: logoY, zIndex: 50 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-[120vw] md:w-[900px] aspect-square flex items-center justify-center">
            {/* Constellation Pulse */}
            <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <img 
                  src="/assets/logo_constelacao.png" 
                  alt="Constellation" 
                  className="w-full h-full object-contain"
                />
            </motion.div>
            
            {/* Main Logo */}
            <img 
              src="/assets/logo.png" 
              alt="Studio Oryon Logo" 
              className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            />
        </div>
      </motion.div>

      {/* 7. Objects/Foreground (Z-60) - REMOVIDO */}{/* 
      <motion.div 
        style={{ y: objectsY, zIndex: 60 }}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center"
      >
        <img 
          src="/assets/objetos.png" 
          alt="Foreground Objects" 
          className="w-full h-auto object-cover object-bottom max-h-[80vh]"
        />
      </motion.div> */}
      
      {/* Overlay Gradient (Z-40) - Behind Foreground Objects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020525] via-[#020525]/80 to-transparent z-40" />
    </div>
  );
};
