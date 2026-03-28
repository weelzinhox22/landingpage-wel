import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer: "O prazo varia de acordo com a complexidade. Uma landing page simples leva de 1-2 semanas, enquanto projetos mais complexos podem levar de 4-8 semanas. Sempre forneço um cronograma detalhado no início do projeto."
  },
  {
    question: "Qual é o investimento médio para um site?",
    answer: "O investimento varia conforme o escopo do projeto. Landing pages começam a partir de R$ 1.500, sites institucionais a partir de R$ 3.000, e projetos customizados são orçados individualmente. Entre em contato para um orçamento personalizado."
  },
  {
    question: "Você oferece manutenção após a entrega?",
    answer: "Sim! Ofereço pacotes de manutenção mensal que incluem atualizações de conteúdo, monitoramento de performance, backups regulares e suporte técnico. Também forneço treinamento para que você possa fazer pequenas atualizações sozinho."
  },
  {
    question: "O site será responsivo para mobile?",
    answer: "Com certeza! Todos os meus projetos são desenvolvidos com abordagem mobile-first, garantindo perfeita experiência em smartphones, tablets e desktops. Testo em diversos dispositivos antes da entrega."
  },
  {
    question: "Você trabalha com redesign de sites existentes?",
    answer: "Sim! Muitos clientes me procuram para modernizar sites antigos. Faço uma análise completa do site atual, identifico pontos de melhoria e proponho uma solução que mantém o que funciona e transforma o que precisa."
  },
  {
    question: "Quais tecnologias você utiliza?",
    answer: "Trabalho principalmente com React, Next.js, TypeScript, Tailwind CSS e Figma para design. Escolho a stack ideal para cada projeto, priorizando performance, manutenibilidade e escalabilidade."
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

      if (faqsRef.current && faqsRef.current.children.length > 0) {
        gsap.from(Array.from(faqsRef.current.children), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqsRef.current,
            start: "top 85%",
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-16">
            <h2
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.95] tracking-tight uppercase text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              FAQ
            </h2>
            <p className="text-center text-foreground/60 text-xl mt-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Perguntas frequentes sobre meus serviços
            </p>
          </div>

          {/* FAQ Items */}
          <div ref={faqsRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
                style={{ backgroundColor: '#ffffff', opacity: 1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between gap-4 text-left hover:bg-black/5 transition-colors"
                >
                  <span 
                    className="text-lg md:text-xl font-bold text-black"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 md:px-8 pb-6 animate-fade-in">
                    <p 
                      className="text-black/70 text-base md:text-lg leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

