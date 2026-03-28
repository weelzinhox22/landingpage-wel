import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Crown, Target, Sparkles, Gauge, ArrowRight, Layout, Zap, TrendingUp } from 'lucide-react';

const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  icon: Icon 
}: { 
  children?: React.ReactNode;
  className?: string;
  title: string;
  icon: React.ElementType;
}) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,255,255,0.1)" }}
    className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="mb-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-cyan-500/20 transition-colors duration-300">
          <Icon className="w-5 h-5 text-cyan-300" />
        </div>
        <h3 className="text-lg font-medium text-white group-hover:text-cyan-200 transition-colors">{title}</h3>
      </div>
      {children && <div className="text-sm text-slate-400">{children}</div>}
    </div>
  </motion.div>
);

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  // Text moves slower (positive y value fights the natural upward scroll)
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // Grid moves faster (negative y value accelerates the upward scroll)
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="bg-[#020525] text-slate-200 py-24 md:py-40 relative z-20 overflow-hidden min-h-screen flex items-center">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Strategic Concept (Text) */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-5 space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-2">
                DESIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">VISIONÁRIO</span>
                <br />
                <span className="text-2xl md:text-3xl font-light text-slate-400 block mt-2">& engenharia digital.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-slate-300 leading-relaxed font-light max-w-md"
            >
              <span className="text-white font-medium block mb-4 text-xl">"Não seguimos padrões. Criamos exceções."</span>
              Combinamos design estratégico, experiência imersiva e engenharia de alta performance para forjar identidades digitais que não apenas existem, mas dominam. Cada pixel tem um propósito; cada interação, uma intenção.
            </motion.p>
          </motion.div>

          {/* Right Column: Bento Grid (Features) */}
          <motion.div 
            style={{ y: gridY }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <BentoCard title="Marca Forte & Memorável" icon={Crown} className="md:col-span-1 bg-white/[0.03]">
                Posicionamento de autoridade que eleva o valor percebido do seu negócio instantaneamente.
              </BentoCard>

              {/* Card 2 */}
              <BentoCard title="Mais Leads. Mais Vendas." icon={TrendingUp} className="md:col-span-1 bg-white/[0.03]">
                Estruturas otimizadas para conversão, guiando o usuário intuitivamente até o "sim".
              </BentoCard>

              {/* Card 3 */}
              <BentoCard title="Experiência Imersiva" icon={Sparkles} className="md:col-span-1 bg-white/[0.03]">
                Navegação fluida e animações que retêm a atenção e contam a história da sua marca.
              </BentoCard>

              {/* Card 4 */}
              <BentoCard title="Rápido, Leve e Escalável" icon={Gauge} className="md:col-span-1 bg-white/[0.03]">
                Performance de ponta com código limpo, garantindo carregamento instantâneo e SEO superior.
              </BentoCard>

              {/* Card 5 - Horizontal Full Width */}
              <BentoCard title="Do Conceito ao Impacto" icon={ArrowRight} className="md:col-span-2 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Transformamos visões abstratas em resultados digitais tangíveis e mensuráveis.</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
              </BentoCard>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
