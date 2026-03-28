import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO",
    company: "TechCorp Brasil",
    image: "/testimonials/carlos.jpg",
    rating: 5,
    text: "Wesley transformou nossa presença digital completamente. O site que ele desenvolveu aumentou nossas conversões em 150% nos primeiros 3 meses. Profissional excepcional!",
  },
  {
    name: "Marina Santos",
    role: "Fundadora",
    company: "Studio Criativo",
    image: "/testimonials/marina.jpg",
    rating: 5,
    text: "A atenção aos detalhes e o cuidado com a experiência do usuário são impressionantes. Nosso site não só ficou lindo, mas também performa excepcionalmente bem.",
  },
  {
    name: "Rafael Costa",
    role: "Diretor de Marketing",
    company: "Inova Digital",
    image: "/testimonials/rafael.jpg",
    rating: 5,
    text: "Trabalhar com Wesley foi uma experiência incrível. Ele entende perfeitamente a união entre design e funcionalidade. Recomendo de olhos fechados!",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.2,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
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
              Depoimentos
            </h2>
            <p className="text-center text-foreground/60 text-xl mt-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              O que meus clientes dizem sobre o trabalho que realizo
            </p>
          </div>

          {/* Testimonials Grid */}
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                style={{ backgroundColor: '#ffffff', opacity: 1 }}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/20" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p 
                  className="text-black/80 text-base leading-relaxed mb-8 flex-grow"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <span 
                      className="text-2xl font-bold text-primary"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <p 
                      className="text-black font-bold text-base"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {testimonial.name}
                    </p>
                    <p 
                      className="text-black/60 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

