import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiVite,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiWebpack,
  SiSass,
  SiGreensock,
} from 'react-icons/si';

const technologies = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Vite', icon: SiVite },
  { name: 'Figma', icon: SiFigma },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss3 },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Git', icon: SiGit },
  { name: 'Webpack', icon: SiWebpack },
  { name: 'Sass', icon: SiSass },
];

const TechMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const tracks = container.querySelectorAll('.marquee-track');
    
    if (tracks.length === 0) return;

    const firstTrack = tracks[0] as HTMLElement;
    const trackWidth = firstTrack.scrollWidth;

    // Animate all tracks
    gsap.to(tracks, {
      x: -trackWidth,
      duration: 80,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <section className="bg-background border-t border-border overflow-hidden py-3">
      <div ref={containerRef} className="flex">
        {/* First track */}
        <div className="marquee-track flex items-center">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`first-${index}`}
                className="flex items-center gap-2 px-8"
              >
                <Icon className="text-foreground/50 w-4 h-4" />
                <span
                  className="text-foreground/50 text-xs uppercase tracking-wider font-light"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
        {/* Second track (duplicate for seamless loop) */}
        <div className="marquee-track flex items-center">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`second-${index}`}
                className="flex items-center gap-2 px-8"
              >
                <Icon className="text-foreground/50 w-4 h-4" />
                <span
                  className="text-foreground/50 text-xs uppercase tracking-wider font-light"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
