import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          // Parallax Header Effect
          gsap.fromTo(".projects-info", 
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top center",
                scrub: 1
              }
            }
          );

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=400%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.to(track, {
            y: () => -Math.max(0, track.scrollHeight - window.innerHeight),
            ease: 'none',
          });

          const panels = gsap.utils.toArray<HTMLElement>('.project-panel');
          panels.forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0.4, y: 60 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 85%',
                  end: 'top 45%',
                  scrub: 1,
                },
              }
            );
          });
        },
        "(max-width: 1023px)": function() {
           // Mobile animations (simple fade in)
           const panels = gsap.utils.toArray<HTMLElement>('.project-panel');
           panels.forEach((panel) => {
             gsap.fromTo(
               panel,
               { opacity: 0, y: 30 },
               {
                 opacity: 1,
                 y: 0,
                 duration: 0.6,
                 scrollTrigger: {
                   trigger: panel,
                   start: 'top 80%',
                   toggleActions: 'play none none reverse'
                 },
               }
             );
           });
        }
      });
    }, section);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-scrolly">
      <div className="projects-pin">
        <div className="projects-info">
          <span className="projects-kicker">Projetos em destaque</span>
          <h2 className="projects-title">Casos com impacto visual e engenharia de produto</h2>
          <p className="projects-desc">
            Narrativas construídas com motion, performance e detalhes de interface que elevam a experiência.
          </p>
          <button 
            onClick={() => navigate('/projects')}
            className="projects-cta clickable"
          >
            Explorar coleção
          </button>
        </div>
        <div className="projects-stage">
          <div ref={trackRef} className="projects-track">
            {projects.map((project) => (
              <article
                key={project.title}
                className="project-panel clickable"
                style={{ ['--accent' as string]: project.accent }}
              >
                <div className="project-media">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
                <div className="project-overlay" />
                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-tag">{project.category}</span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-action clickable inline-block text-center no-underline"
                  >
                    Abrir projeto
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
