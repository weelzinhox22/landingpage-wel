import { useParallax } from "@/hooks/use-parallax";
import { useState, useEffect, useRef } from "react";
import { 
  Code, 
  Palette, 
  Zap, 
  Smartphone, 
  Layers, 
  Sparkles,
  Globe,
  Gauge
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "HTML5", level: 95, color: "from-orange-500 to-red-600" },
      { name: "CSS3", level: 92, color: "from-blue-500 to-cyan-600" },
      { name: "JavaScript", level: 88, color: "from-yellow-500 to-orange-600" },
      { name: "React", level: 85, color: "from-cyan-500 to-blue-600" },
    ]
  },
  {
    title: "Design",
    icon: Palette,
    skills: [
      { name: "UI Design", level: 90, color: "from-pink-500 to-rose-600" },
      { name: "UX Design", level: 85, color: "from-purple-500 to-indigo-600" },
      { name: "Figma", level: 88, color: "from-violet-500 to-purple-600" },
    ]
  },
  {
    title: "Performance",
    icon: Zap,
    skills: [
      { name: "Responsividade", level: 95, color: "from-emerald-500 to-teal-600" },
      { name: "Performance Web", level: 88, color: "from-green-500 to-emerald-600" },
      { name: "SEO", level: 82, color: "from-lime-500 to-green-600" },
    ]
  },
];

const allSkills = skillCategories.flatMap(category => category.skills);

// Skill Card Component
const SkillCard = ({ skill, index, isVisible }: { skill: typeof allSkills[0]; index: number; isVisible: boolean }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      const startLevel = 0;
      const targetLevel = skill.level;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentLevel = Math.floor(startLevel + (targetLevel - startLevel) * easeOutCubic);
        
        setAnimatedLevel(currentLevel);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, skill.level]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedLevel / 100) * circumference;

  return (
    <div
      ref={cardRef}
      className="group glass-card p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]"
    >
      {/* Circular Progress with Gradient */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-secondary/30"
          />
          {/* Progress Circle with Gradient */}
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsl(var(--primary))`} />
              <stop offset="100%" stopColor={`hsl(var(--primary))`} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={`url(#gradient-${index})`}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-heading font-bold text-primary">
            {animatedLevel}%
          </span>
        </div>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-xl transition-all duration-500" />
      </div>
      
      {/* Skill Name */}
      <p className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">
        {skill.name}
      </p>
      
      {/* Progress Bar (Linear) */}
      <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? `${animatedLevel}%` : '0%',
          }}
        />
      </div>
    </div>
  );
};

// Category Section Component
const CategorySection = ({ category, index, isVisible }: { category: typeof skillCategories[0]; index: number; isVisible: boolean }) => {
  const Icon = category.icon;
  
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          {category.title}
        </h3>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skillIndex}
            skill={skill}
            index={index * 10 + skillIndex}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const parallaxOffset = useParallax(0.1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden parallax-section"
    >
      {/* Parallax Background Effects */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px]"
        style={{ transform: `translate(-50%, ${parallaxOffset}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      />
      <div 
        className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-primary/2 rounded-full blur-[100px]"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-medium uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" />
            Tecnologias
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Tecnologias & <span className="text-primary">Habilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Domínio técnico e criativo em ferramentas modernas para criar experiências digitais excepcionais
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <CategorySection
              key={index}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
            <Globe className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold mb-1">Web Standards</p>
            <p className="text-sm text-muted-foreground">Seguindo as melhores práticas</p>
          </div>
          <div className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
            <Gauge className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold mb-1">Performance</p>
            <p className="text-sm text-muted-foreground">Otimização contínua</p>
          </div>
          <div className="glass-card p-6 text-center group hover:border-primary/50 transition-all">
            <Smartphone className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold mb-1">Responsivo</p>
            <p className="text-sm text-muted-foreground">Perfeito em todos os dispositivos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
