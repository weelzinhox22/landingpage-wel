import { useEffect, useRef } from "react";
import { Mail, Phone, Instagram, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 71 99137-3142",
    href: "https://wa.me/5571991373142?text=olá,%20quero%20adquirir%20a%20licença",
    description: "Resposta rápida",
  },
  {
    icon: Mail,
    label: "Email",
    value: "devwesleysc@gmail.com",
    href: "mailto:devwesleysc@gmail.com",
    description: "Para orçamentos",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@studiooryon",
    href: "https://instagram.com/studiooryon",
    description: "Acompanhe meu trabalho",
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current && cardsRef.current.children.length > 0) {
        const children = Array.from(cardsRef.current.children) as HTMLElement[];
        // Garantir que comecem visíveis
        children.forEach(child => {
          gsap.set(child, { opacity: 1, y: 0 });
        });
        
        gsap.from(children, {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
          immediateRender: false,
        });
      }

      if (ctaRef.current) {
        // Garantir que comece visível
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
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
      id="contato"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-4 sm:mb-6 md:mb-12 lg:mb-20">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.95] tracking-tight uppercase text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Contato
            </h2>
            <p className="text-center text-foreground/60 text-xl mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pronto para transformar sua ideia em realidade digital?
            </p>
          </div>

          {/* Contact Methods */}
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-4 sm:mb-6 md:mb-12 lg:mb-20">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundColor: '#ffffff', opacity: 1, transform: 'translateY(0)' }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <p 
                      className="text-xs font-bold text-black/40 uppercase tracking-wider mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {method.label}
                    </p>
                    <p 
                      className="text-xl md:text-2xl font-bold text-black mb-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {method.value}
                    </p>
                    <p 
                      className="text-sm text-black/60"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {method.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-black/60 group-hover:text-primary transition-colors">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Abrir
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="max-w-4xl mx-auto" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 md:p-16 text-center border border-primary/20">
              <h3 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 uppercase tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Vamos Criar Algo
                <br />
                <span className="text-primary">Incrível Juntos</span>
              </h3>
              <p 
                className="text-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Estou disponível para novos projetos e parcerias. Entre em contato e vamos conversar sobre como posso ajudar seu negócio.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://wa.me/5571991373142?text=olá,%20quero%20adquirir%20a%20licença"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-base rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href="mailto:devwesleysc@gmail.com?subject=Contato do Portfólio"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-transparent text-foreground font-bold text-base rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase tracking-wider w-full sm:w-auto justify-center"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Mail className="w-5 h-5" />
                  Email
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
