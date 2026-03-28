
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020525] text-white overflow-x-hidden selection:bg-cyan-500/30">
      <Header />
      
      <main className="relative z-10 bg-[#020525] min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 py-12 pt-32 relative z-10">
          
          {/* Header */}
          <header className="mb-20">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para o início</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block text-cyan-400/80 font-bold tracking-[0.3em] text-sm uppercase mb-4">
                Portfólio
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Projetos Selecionados
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Uma coleção de trabalhos que demonstram nossa paixão por design, engenharia e performance.
              </p>
            </motion.div>
          </header>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Image Container */}
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-3"
                        style={{ 
                          backgroundColor: `${project.accent}20`, 
                          color: project.accent,
                          border: `1px solid ${project.accent}40`
                        }}
                      >
                        {project.category}
                      </span>
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h2>
                    </div>
                    <span className="text-slate-500 font-mono text-sm">{project.year}</span>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.desc}
                  </p>

                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                    >
                      Ver projeto online
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-32 text-center pb-12">
            <p className="text-slate-500">
              Mais projetos disponíveis mediante solicitação.
            </p>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
