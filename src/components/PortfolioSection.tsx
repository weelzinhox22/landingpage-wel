import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FeelGuide",
    subtitle: "Bem-estar Emocional",
    category: "UI/UX Design & App Mobile",
    description: "Aplicativo de saúde mental com testes psicológicos validados, meditações guiadas e diário de gratidão. Design completo focado em bem-estar.",
    url: "https://play.google.com/store/apps/details?id=com.valdirdpg.FeelGuideV2&hl=pt",
    year: "2025",
    tags: ["App Design", "UX/UI", "Health Tech"],
  },
  {
    title: "Portal Fisio",
    subtitle: "Saúde Hospitalar",
    category: "Web Design & Desenvolvimento",
    description: "Plataforma completa para gestão e informações sobre saúde hospitalar, com foco em fisioterapia e cuidados especializados.",
    url: "https://portalfisio.vercel.app/saude-hospitalar",
    year: "2024",
    tags: ["React", "TypeScript", "Design System"],
  },
  {
    title: "Portal Fisio",
    subtitle: "Saúde do Atleta",
    category: "UI/UX & Frontend",
    description: "Site especializado em saúde esportiva e performance atlética, com interface moderna e otimizada.",
    url: "https://portalfisio.vercel.app/saude-atleta",
    year: "2024",
    tags: ["Next.js", "Tailwind", "UX Design"],
  },
  {
    title: "FisioNeo",
    subtitle: "Plataforma Digital",
    category: "Landing Page & Plataforma",
    description: "Plataforma inovadora de fisioterapia com design moderno, focada em experiência do usuário.",
    url: "https://fisioneo.vercel.app",
    year: "2024",
    tags: ["React", "GSAP", "Responsive"],
  },
  {
    title: "Portal Fisio",
    subtitle: "Saúde do Idoso",
    category: "Web Design & UX",
    description: "Plataforma dedicada à saúde e bem-estar do idoso, com interface acessível e design cuidadoso.",
    url: "https://portalfisio.vercel.app/saude-idoso",
    year: "2024",
    tags: ["Accessibility", "React", "UX"],
  },
];

// Website Preview Component with iframe
const WebsitePreview = ({ project }: { project: typeof projects[0] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-xl">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-30">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-600">Carregando preview...</p>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-20">
          <div className="text-center p-8">
            <ExternalLink className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">Clique para ver o site</p>
          </div>
        </div>
      )}

      {/* Iframe Preview */}
      {!hasError && (
        <iframe
          ref={iframeRef}
          src={project.url}
          className="absolute inset-0 w-full h-full border-0"
          style={{
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            width: '200%',
            height: '200%',
            pointerEvents: 'none',
          }}
          title={`Preview of ${project.title}`}
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts"
        />
      )}

      {/* Browser Chrome */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center px-3 gap-2 z-40">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-gray-100 rounded-md h-4 flex items-center px-2">
            <span className="text-[10px] text-gray-600 truncate">
              {new URL(project.url).hostname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
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
      id="portfolio"
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
              Projetos
            </h2>
            <p className="text-center text-foreground/60 text-xl mt-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Projetos selecionados que demonstram minha abordagem em design e desenvolvimento
            </p>
          </div>

          {/* Projects Grid */}
          <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                style={{ backgroundColor: '#ffffff', opacity: 1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Website Preview */}
                <div className="relative">
                  <WebsitePreview project={project} />
                  
                  {/* Clickable Overlay */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-50"
                    aria-label={`Ver ${project.title}`}
                  >
                    <span className="sr-only">Ver projeto {project.title}</span>
                  </a>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 relative">
                  {/* Project Number & Year */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-5xl font-bold text-black/10"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span 
                      className="text-xs font-medium text-black/40 uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Category */}
                  <span 
                    className="text-xs font-bold text-black/40 uppercase tracking-wider block mb-4"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {project.category}
                  </span>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 
                      className="text-3xl md:text-4xl font-bold text-black leading-tight mb-1 uppercase tracking-tight"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-xl md:text-2xl font-medium text-black/60 uppercase tracking-tight"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-black/70 text-sm md:text-base leading-relaxed mb-6"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-black/5 text-black/60 text-xs font-medium uppercase tracking-wider rounded-full"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-black hover:text-primary transition-colors"
                  >
                    <span 
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Ver Projeto
                    </span>
                    <ExternalLink className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Hover Effect Line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                ></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <p 
              className="text-foreground/60 text-lg mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Quer ver mais trabalhos?
            </p>
            <a 
              href="#contato" 
              className="inline-block px-10 py-5 bg-white text-black font-bold text-base rounded-full hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
