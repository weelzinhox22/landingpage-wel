import { useEffect, useRef } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={contentRef} className="text-center space-y-8">
            {/* Main Heading */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight uppercase"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Pronto para
              <br />
              <span className="text-primary">Decolar?</span>
            </h2>

            {/* Description */}
            <p 
              className="text-foreground/70 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Transforme sua visão em uma experiência digital que seus clientes vão adorar. Vamos conversar sobre seu projeto?
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a 
                href="https://wa.me/5511955821293?text=Olá%20Studio%20Oryon!%20Vim%20através%20do%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-white dark:text-white font-bold text-base rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-2xl w-full sm:w-auto justify-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Phone className="w-5 h-5" />
                Chamar no WhatsApp
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="mailto:devwesleysc@gmail.com?subject=Contato do Portfólio"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-base rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-2xl w-full sm:w-auto justify-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Mail className="w-5 h-5" />
                Enviar Email
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-foreground/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Resposta em 24h
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Orçamento Gratuito
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Sem Compromisso
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

