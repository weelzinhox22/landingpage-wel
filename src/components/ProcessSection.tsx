import { useEffect, useRef } from "react";
import { MessageSquare, Palette, Code, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Briefing & Planejamento",
    description: "Entendemos profundamente seu negócio, objetivos e público-alvo. Definimos escopo, cronograma e estratégia.",
    duration: "1-3 dias",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design & Prototipação",
    description: "Criamos wireframes e protótipos navegáveis no Figma. Validamos a experiência antes de desenvolver.",
    duration: "1-2 semanas",
  },
  {
    number: "03",
    icon: Code,
    title: "Desenvolvimento",
    description: "Transformamos o design aprovado em código otimizado, responsivo e com as melhores práticas.",
    duration: "2-4 semanas",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Suporte",
    description: "Fazemos deploy em produção, configuramos analytics e oferecemos suporte pós-lançamento.",
    duration: "3-5 dias",
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }

      if (stepsRef.current && stepsRef.current.children.length > 0) {
        const children = Array.from(stepsRef.current.children) as HTMLElement[];
        // Garantir que comecem visíveis
        children.forEach(child => {
          gsap.set(child, { opacity: 1, y: 0 });
        });
        
        gsap.from(children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
            once: true,
          },
          immediateRender: false,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-20">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.95] tracking-tight uppercase text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Processo
            </h2>
            <p className="text-center text-foreground/60 text-xl mt-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Como transformo sua ideia em realidade digital
            </p>
          </div>

          {/* Steps Grid */}
          <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
                  style={{ backgroundColor: '#ffffff', opacity: 1, transform: 'translateY(0)' }}
                >
                  {/* Number */}
                  <div className="absolute top-6 right-6">
                    <span 
                      className="text-6xl font-bold text-black/5 group-hover:text-black/10 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-grow">
                    <h3 
                      className="text-2xl font-bold text-black mb-4 uppercase tracking-tight"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-black/70 text-base leading-relaxed mb-4 flex-grow"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-black/10 mt-auto">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span 
                        className="text-xs font-bold text-black/60 uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Connector Line (only for desktop, not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p 
              className="text-foreground/60 text-lg mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Pronto para começar seu projeto?
            </p>
            <a 
              href="#contato" 
              className="inline-block px-10 py-5 bg-white text-black font-bold text-base rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Vamos Conversar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

