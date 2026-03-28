import { useParallax } from "@/hooks/use-parallax";

const QuoteSection = () => {
  const parallaxOffset = useParallax(0.2);

  return (
    <section className="py-32 md:py-40 relative overflow-hidden parallax-section">
      {/* Parallax Background Effects */}
      <div 
        className="absolute inset-0 bg-hero-gradient opacity-50"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[180px]"
        style={{ transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))` }}
      />
      
      {/* Decorative Elements with Parallax */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full"
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
      />
      <div 
        className="absolute bottom-20 right-10 w-48 h-48 border border-primary/5 rounded-full"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/30 rounded-full blur-sm"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="text-7xl md:text-9xl text-primary/20 font-heading mb-8"
            style={{ transform: `translateY(${parallaxOffset * 0.15}px)` }}
          >
            "
          </div>
          <blockquote className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Faça mais do que o necessário.
            <br />
            <span className="text-primary glow-text">
              É no detalhe extra que a diferença acontece.
            </span>
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-muted-foreground font-medium">Wesley</span>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
