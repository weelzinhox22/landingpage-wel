import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Instagram, Github, Linkedin, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import FooterMarquee from "./FooterMarquee";

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/studiooryon", label: "Instagram" },
    { icon: Mail, href: "mailto:devwesleysc@gmail.com", label: "Email" },
  ];

  return (
    <>
      {/* Footer Content */}
      <div 
        ref={containerRef}
        className="relative w-full min-h-screen z-0 bg-[#020525] overflow-hidden flex flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Layers - Stacked with Overlay Logic */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Layer 1: Distant Mountains/Background (Back) */}
          <img 
            src="/assets/footer_Camada-1.png" 
            alt="" 
            className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
          />
          {/* Layer 2: Intermediate (Middle) */}
          <img 
            src="/assets/footer_Camada-2.png" 
            alt="" 
            className="absolute top-0 left-0 w-full h-full object-cover z-[2]"
          />
          {/* Layer 3: Front/Details (Front) */}
          <img 
            src="/assets/footer_Camada-3.png" 
            alt="" 
            className="absolute top-0 left-0 w-full h-full object-cover z-[3]"
          />
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            {/* CTA Section */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
                Vamos Criar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  Algo Incrível
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a 
                        href="https://wa.me/5511955821293?text=Olá%20Studio%20Oryon!%20Gostaria%20de%20iniciar%20um%20projeto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Iniciar Projeto</span>
                        <MessageCircle className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            Iniciar Projeto <MessageCircle className="w-5 h-5" />
                        </span>
                    </a>
                  </Magnetic>
                  
                  <Magnetic>
                    <a 
                        href="mailto:devwesleysc@gmail.com"
                        className="group relative px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 transition-transform hover:scale-105 hover:bg-white/5"
                    >
                        <span>Enviar Email</span>
                        <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    </a>
                  </Magnetic>
              </div>
            </div>

            {/* Navigation / Info */}
            <div className="flex flex-col justify-between gap-10 md:items-end">
                <div className="text-left md:text-right space-y-4">
                    <h3 className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Contato</h3>
                    <a href="mailto:devwesleysc@gmail.com" className="block text-2xl text-white font-light hover:text-gray-300 transition-colors">devwesleysc@gmail.com</a>
                    <a href="https://wa.me/5511955821293" target="_blank" rel="noopener noreferrer" className="block text-2xl text-white font-light hover:text-[#25D366] transition-colors">+55 (11) 95582-1293</a>
                </div>
                
                <div className="text-left md:text-right space-y-4">
                    <h3 className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Localização</h3>
                    <p className="text-2xl text-white font-light">São Paulo, SP</p>
                    <p className="text-sm text-gray-500">
                      Horário Local: {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Sao_Paulo' })}
                    </p>
                </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-4">
               <p className="text-gray-500 text-sm">
                © {currentYear} Studio Oryon. Todos os direitos reservados.
              </p>
               {/* Navigation Links */}
               <nav className="flex gap-6 text-sm text-gray-400">
                  <a href="https://studiooryon.pro/" className="hover:text-white transition-colors">Home</a>
                  <a href="https://studiooryon.pro/ava-oryon" className="hover:text-white transition-colors">Oryon App</a>
                  <a href="https://wa.me/5511955821293" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Suporte</a>
                  <a href="https://studiooryon.pro/#sobre" className="hover:text-white transition-colors">Sobre</a>
               </nav>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Magnetic key={index}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
        
        <FooterMarquee isHovered={isHovered} />
      </div>
    </>
  );
};

export default Footer;
