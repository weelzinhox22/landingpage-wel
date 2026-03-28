import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Palette, Code2, Rocket, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottiePlayer } from '@dotlottie/react-player';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STEPS = [
  {
    id: '01',
    title: 'Contato',
    desc: 'Contato direto com nosso estúdio para entender sua necessidade.',
    icon: MessageSquare,
    color: '#60A5FA', // blue-400
    lottie: '/assets/contato.lottie'
  },
  {
    id: '02',
    title: 'Planejamento',
    desc: 'Definição de escopo, estratégia e arquitetura.',
    icon: Calendar,
    color: '#818CF8', // indigo-400
    lottie: '/assets/planejamento.lottie'
  },
  {
    id: '03',
    title: 'Design & UX',
    desc: 'Criação da interface e experiência do usuário.',
    icon: Palette,
    color: '#A78BFA', // violet-400
    lottie: '/assets/designux.lottie'
  },
  {
    id: '04',
    title: 'Desenvolvimento',
    desc: 'Implementação técnica com foco em performance e escalabilidade.',
    icon: Code2,
    color: '#C084FC', // purple-400
    lottie: '/assets/web-development.lottie'
  },
  {
    id: '05',
    title: 'Otimização',
    desc: 'SEO técnico, velocidade e nota máxima nos indicadores do Google.',
    icon: Rocket,
    color: '#E879F9', // fuchsia-400
    lottie: '/assets/otimizacao.lottie'
  },
  {
    id: '06',
    title: 'Suporte',
    desc: 'Acompanhamento contínuo e suporte vitalício.',
    icon: HeartHandshake,
    color: '#F472B6', // pink-400
    lottie: '/assets/suporte.lottie'
  }
];

const ClientJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps = document.querySelectorAll('.journey-step');
    
    // Create scroll trigger for each step to handle activation
    steps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top center+=100',
        end: 'bottom center+=100',
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });

    // Animate container entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );

  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-[#020525]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6"
          >
            NOSSO PROCESSO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Como transformamos sua ideia em um <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">produto digital de alto padrão</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl leading-relaxed"
          >
            Um processo claro, fluido e pensado para gerar resultado, sem burocracia e sem ruído.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative">
          
          {/* Left Column: Animated Lottie (Sticky) */}
          <div className="hidden lg:block sticky top-[15vh] h-fit perspective-1000">
             <motion.div 
               animate={{ 
                 y: [0, -12, 0],
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="relative w-full min-h-[600px] bg-slate-900/40 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden flex items-center justify-center shadow-[0_0_50px_-10px_rgba(30,58,138,0.15)] group"
             >
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" 
                />
                
                {/* Lottie Animations Layered for Crossfade */}
                <div className="relative w-full h-full flex items-center justify-center p-8 z-10">
                  <div className="w-full max-w-[500px] aspect-square relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                        transition={{ 
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1] 
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <DotLottiePlayer
                          src={JOURNEY_STEPS[activeStep].lottie}
                          autoplay={true}
                          loop
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Dynamic Status Display */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <motion.div 
                    initial={false}
                    animate={{ scale: [1, 1.02, 1] }}
                    key={activeStep}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-2xl shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">Status Atual</span>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] tracking-widest font-mono text-green-400 uppercase">Em Progresso</span>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-white flex items-center gap-3">
                      <motion.div
                        key={`icon-${activeStep}`}
                        initial={{ rotate: -20, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {React.createElement(JOURNEY_STEPS[activeStep].icon, { size: 24, style: { color: JOURNEY_STEPS[activeStep].color } })}
                      </motion.div>
                      {JOURNEY_STEPS[activeStep].title}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                        initial={{ width: `${(activeStep / JOURNEY_STEPS.length) * 100}%` }}
                        animate={{ width: `${((activeStep + 1) / JOURNEY_STEPS.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </motion.div>
                </div>
             </motion.div>
          </div>

          {/* Right Column: Steps Journey */}
          <div className="relative">
            {/* Connecting Line - Extended for transition */}
            <div className="absolute left-[28px] top-8 -bottom-32 w-0.5 bg-gradient-to-b from-slate-800 via-slate-800 to-transparent" />
            
            <div className="space-y-16">
              {JOURNEY_STEPS.map((step, index) => {
                const isActive = index === activeStep;
                
                return (
                  <div 
                    key={step.id}
                    className={`journey-step relative pl-20 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 blur-[1px]'}`}
                  >
                    {/* Number & Icon Bubble */}
                    <div 
                      className={`
                        absolute left-0 top-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2 z-10 transition-all duration-500
                        ${isActive 
                          ? 'bg-[#020525] border-transparent shadow-[0_0_30px_rgba(96,165,250,0.3)] scale-110' 
                          : 'bg-[#020525] border-slate-800 scale-100'}
                      `}
                      style={{ borderColor: isActive ? step.color : undefined }}
                    >
                      <step.icon 
                        size={24} 
                        color={isActive ? step.color : '#64748B'} 
                        className="transition-colors duration-300"
                      />
                    </div>

                    {/* Mobile Lottie Display (Visible only on mobile) */}
                    <div className="lg:hidden w-full h-48 mb-6 relative rounded-2xl overflow-hidden bg-slate-900/40 border border-white/10 backdrop-blur-sm">
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
                       <DotLottiePlayer
                          src={step.lottie}
                          autoplay={true}
                          loop
                          className="w-full h-full object-contain p-4"
                        />
                    </div>

                    {/* Content */}
                    <div>
                      <span 
                        className="text-xs font-mono font-bold mb-2 block"
                        style={{ color: isActive ? step.color : '#64748B' }}
                      >
                        {step.id}
                      </span>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientJourney;