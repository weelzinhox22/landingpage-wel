import React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Crown, Target, Sparkles, Gauge, Layers, ArrowRight } from 'lucide-react';

// --- Types & Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  }
};

const titleVariants = {
  hidden: { opacity: 0, filter: 'blur(12px)', letterSpacing: '-0.05em' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    letterSpacing: '0.02em',
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- Orion Constellation Data ---

const STARS = [
  // Head
  { id: 'meissa', cx: 50, cy: 12, r: 1.5, delay: 0.1, name: 'Meissa', pulseDuration: 3, pulseDelay: 0.7 },
  
  // Shoulders
  { id: 'betelgeuse', cx: 30, cy: 25, r: 2.2, delay: 0.1, name: 'Betelgeuse', pulseDuration: 4, pulseDelay: 0.5 },
  { id: 'bellatrix', cx: 70, cy: 25, r: 1.8, delay: 0.2, name: 'Bellatrix', pulseDuration: 3.5, pulseDelay: 1 },
  
  // Belt
  { id: 'alnitak', cx: 40, cy: 50, r: 1.8, delay: 0.3, name: 'Alnitak', pulseDuration: 4.2, pulseDelay: 0.2 },
  { id: 'alnilam', cx: 50, cy: 48, r: 1.8, delay: 0.35, name: 'Alnilam', pulseDuration: 3.8, pulseDelay: 0.8 },
  { id: 'mintaka', cx: 60, cy: 46, r: 1.8, delay: 0.4, name: 'Mintaka', pulseDuration: 4.5, pulseDelay: 1.2 },
  
  // Feet
  { id: 'saiph', cx: 35, cy: 85, r: 1.8, delay: 0.5, name: 'Saiph', pulseDuration: 3.2, pulseDelay: 0.4 },
  { id: 'rigel', cx: 75, cy: 80, r: 2.4, delay: 0.6, name: 'Rigel', pulseDuration: 5, pulseDelay: 0 },
  
  // Club (Left Arm)
  { id: 'club_1', cx: 20, cy: 15, r: 1.3, delay: 0.7, name: 'Club Mid', pulseDuration: 3.5, pulseDelay: 0.5 },
  { id: 'club_2', cx: 25, cy: 8, r: 1.3, delay: 0.8, name: 'Club Top', pulseDuration: 3.5, pulseDelay: 0.7 },

  // Shield (Right Arm - Bow)
  { id: 'shield_1', cx: 85, cy: 30, r: 1.4, delay: 0.9, name: 'Tabit', pulseDuration: 4, pulseDelay: 1 },
  { id: 'shield_2', cx: 90, cy: 22, r: 1.3, delay: 0.95, name: 'Shield Up 1', pulseDuration: 4, pulseDelay: 1.2 },
  { id: 'shield_3', cx: 92, cy: 15, r: 1.3, delay: 1.0, name: 'Shield Up 2', pulseDuration: 4, pulseDelay: 1.4 },
  { id: 'shield_4', cx: 86, cy: 38, r: 1.3, delay: 1.05, name: 'Shield Down 1', pulseDuration: 4, pulseDelay: 1.1 },
  { id: 'shield_5', cx: 82, cy: 45, r: 1.3, delay: 1.1, name: 'Shield Down 2', pulseDuration: 4, pulseDelay: 1.3 },
  { id: 'shield_6', cx: 80, cy: 50, r: 1.3, delay: 1.15, name: 'Shield Down 3', pulseDuration: 4, pulseDelay: 1.5 },

  // Sword
  { id: 'sword_1', cx: 48, cy: 54, r: 1.2, delay: 1.2, name: 'Sword Top', pulseDuration: 3, pulseDelay: 1.5 },
  { id: 'sword_2', cx: 49, cy: 58, r: 1.6, delay: 1.25, name: 'M42', pulseDuration: 6, pulseDelay: 2 },
  { id: 'sword_3', cx: 50, cy: 62, r: 1.2, delay: 1.3, name: 'Sword Bot', pulseDuration: 3, pulseDelay: 1.7 },
];

const CONNECTIONS = [
  // Body Frame
  ['betelgeuse', 'meissa'],
  ['meissa', 'bellatrix'],
  ['betelgeuse', 'alnitak'],
  ['bellatrix', 'mintaka'],
  ['alnitak', 'alnilam'],
  ['alnilam', 'mintaka'],
  ['alnitak', 'saiph'],
  ['mintaka', 'rigel'],
  ['saiph', 'rigel'], // Base connection

  // Club
  ['betelgeuse', 'club_1'],
  ['club_1', 'club_2'],

  // Shield
  ['bellatrix', 'shield_1'],
  ['shield_1', 'shield_2'],
  ['shield_2', 'shield_3'],
  ['shield_1', 'shield_4'],
  ['shield_4', 'shield_5'],
  ['shield_5', 'shield_6'],

  // Sword
  ['alnilam', 'sword_1'],
  ['sword_1', 'sword_2'],
  ['sword_2', 'sword_3'],
];

// --- Components ---

const BentoCard = ({ children, className = "", colSpan = "" }: { children: React.ReactNode, className?: string, colSpan?: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }}
    className={`${colSpan} relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-colors group ${className}`}
  >
    {children}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
  </motion.div>
);

const OrionConstellation = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for parallax
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x * 20); // Sensitivity
    mouseY.set(y * 20);
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-square max-w-[500px] mx-auto overflow-visible cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        style={{ x: smoothX, y: smoothY }}
      >
        <defs>
          <filter id="glow-star" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {CONNECTIONS.map(([startId, endId], i) => {
          const start = STARS.find(s => s.id === startId)!;
          const end = STARS.find(s => s.id === endId)!;
          return (
            <motion.line
              key={`${startId}-${endId}`}
              x1={start.cx}
              y1={start.cy}
              x2={end.cx}
              y2={end.cy}
              stroke="url(#line-gradient)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 + i * 0.1, ease: "easeInOut" }}
            />
          );
        })}
        
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(165, 243, 252, 0)" />
          <stop offset="50%" stopColor="rgba(165, 243, 252, 0.5)" />
          <stop offset="100%" stopColor="rgba(165, 243, 252, 0)" />
        </linearGradient>

        {/* Stars */}
        {STARS.map((star) => (
          <motion.g key={star.id}>
             {/* Glow Halo */}
            <motion.circle
              cx={star.cx}
              cy={star.cy}
              r={star.r * 3}
              fill="rgba(165, 243, 252, 0.1)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: star.delay }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                transition: { 
                  duration: star.pulseDuration, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: star.pulseDelay
                }
              }}
            />
            {/* Core Star */}
            <motion.circle
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="white"
              filter="url(#glow-star)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: star.delay, type: "spring" }}
            />
          </motion.g>
        ))}
      </motion.svg>
      
      {/* Floating Particles / Dust */}
      <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
               }}
               animate={{
                 y: [0, -20, 0],
                 opacity: [0, 0.5, 0],
               }}
               transition={{
                 duration: 5 + Math.random() * 5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i * 1,
               }}
             />
          ))}
      </div>
    </div>
  );
};

const Introduction = () => {
  return (
    <section className="bg-[#020525] text-slate-200 py-20 md:py-32 relative z-20 overflow-hidden">


      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: The "Beyond Code" Experience */}
            <div className="relative">
               {/* Visual Anchor: Orion Constellation */}
               <div className="mb-8 md:mb-12 relative z-10">
                 <OrionConstellation />
               </div>

               {/* Typography & Manifesto */}
               <div className="text-center md:text-left relative z-20">
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <motion.h2 
                      variants={titleVariants}
                      className="text-4xl md:text-6xl font-semibold tracking-wide text-white leading-tight"
                    >
                      ALÉM DO <br/>
                      <span className="text-cyan-200/90 relative inline-block">
                        CÓDIGO
                        <motion.span 
                          className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          transition={{ delay: 1, duration: 1.5 }}
                        />
                      </span>
                    </motion.h2>

                    <div className="space-y-4 max-w-md mx-auto md:mx-0">
                      <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed tracking-wide">
                        "Do código nasce constelação. <br/>
                        Do caos nasce sentido."
                      </p>
                      <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed">
                        Não apenas escrevemos linhas de comando. Criamos universos digitais onde identidade, estética e função orbitam em perfeita harmonia.
                      </p>
                    </div>

                    <motion.div 
                      className="pt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1 }}
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400/60 uppercase tracking-[0.2em]">
                        <Sparkles className="w-3 h-3" />
                        Estúdio Criativo
                      </span>
                    </motion.div>
                  </motion.div>
               </div>
            </div>

            {/* Right Column: Bento Grid (Retained for Content Value) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:pl-10">
              
              {/* Card 1: Autoridade */}
              <BentoCard className="flex flex-col justify-between min-h-[180px]">
                 <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                    <Crown className="text-purple-400 w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white mb-1">Identidade Única</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sua marca posicionada como referência incontestável.
                    </p>
                 </div>
              </BentoCard>

              {/* Card 2: Conversão */}
              <BentoCard className="flex flex-col justify-between min-h-[180px]">
                 <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 border border-green-500/20">
                    <Target className="text-green-400 w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white mb-1">Resultados Reais</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Estratégia focada em transformar visitantes em clientes.
                    </p>
                 </div>
              </BentoCard>

              {/* Card 3: Experiência */}
              <BentoCard className="flex flex-col justify-between min-h-[180px]">
                 <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                    <Sparkles className="text-cyan-400 w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white mb-1">Imersão Total</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Interfaces que prendem, encantam e guiam o usuário.
                    </p>
                 </div>
              </BentoCard>

              {/* Card 4: Performance */}
              <BentoCard className="flex flex-col justify-between min-h-[180px]">
                 <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 border border-orange-500/20">
                    <Gauge className="text-orange-400 w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold text-white mb-1">Ultra Performance</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Velocidade que o Google ama e seu cliente exige.
                    </p>
                 </div>
              </BentoCard>

              {/* Card 5: Processo (Main) */}
              <BentoCard colSpan="md:col-span-2" className="flex flex-col md:flex-row items-center md:items-start gap-6">
                 <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <Layers className="text-blue-400 w-7 h-7" />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-white mb-2">Visão 360°</h3>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-[10px] font-mono text-cyan-400 mb-2">
                       <span>CONCEPT</span>
                       <ArrowRight className="w-3 h-3 text-slate-600" />
                       <span>DESIGN</span>
                       <ArrowRight className="w-3 h-3 text-slate-600" />
                       <span>CODE</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Do esboço à realidade, cuidamos de cada detalhe do seu universo digital.
                    </p>
                 </div>
              </BentoCard>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
