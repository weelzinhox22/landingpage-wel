import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bot, ArrowRight, Zap, Shield, Clock } from "lucide-react";

const Downloads = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <SEO />
      <Header />

      <main className="relative z-10 bg-[#020525] text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[60vh] pt-32 pb-16 px-6 overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-pink-600/10 blur-[100px]" />
          </div>

          {/* Grid dots */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs uppercase tracking-[0.3em] font-mono"
            >
              Studio Oryon · Downloads
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Central de Soluções{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                Studio Oryon
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Ferramentas inteligentes desenvolvidas para automatizar, otimizar e
              potencializar sua produtividade.
            </motion.p>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-gray-500 text-xs uppercase tracking-[0.4em] mb-12"
          >
            Produtos Disponíveis
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AVA-Oryon Card — Main Featured */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2"
            >
              <button
                onClick={() => navigate("/ava-oryon")}
                className="group relative w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 via-[#0a0a1a] to-pink-900/20 p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(139,92,246,0.2)] cursor-pointer"
              >
                {/* Animated gradient orb */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-600/20 blur-[80px] group-hover:bg-purple-600/30 transition-all duration-700" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-pink-600/10 blur-[60px] group-hover:bg-pink-600/20 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Bot className="w-8 h-8 md:w-10 md:h-10 text-purple-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest">
                        Novo
                      </span>
                      <span className="text-gray-500 text-xs uppercase tracking-widest">
                        Extensão Desktop · v1.1
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300" style={{ fontFamily: "'Sora', sans-serif" }}>
                      Automação AVA-Oryon
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-xl">
                      Automatize suas atividades acadêmicas com segurança, precisão e
                      histórico completo de execução.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {[
                        { icon: Zap, label: "Automação Inteligente" },
                        { icon: Shield, label: "Segurança Supabase" },
                        { icon: Clock, label: "Histórico Completo" },
                      ].map(({ icon: Icon, label }) => (
                        <span
                          key={label}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs"
                        >
                          <Icon size={12} className="text-purple-400" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow CTA */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:border-purple-500/60 group-hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Placeholder card — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 overflow-hidden flex flex-col gap-4 opacity-50 cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-600 text-xs uppercase tracking-widest">
                  Em Breve
                </span>
                <h3 className="text-xl font-bold text-gray-600 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Nova Ferramenta
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Mais soluções chegando em breve.
                </p>
              </div>
            </motion.div>

            {/* Placeholder card 2 — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 overflow-hidden flex flex-col gap-4 opacity-50 cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-600 text-xs uppercase tracking-widest">
                  Em Breve
                </span>
                <h3 className="text-xl font-bold text-gray-600 mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Outro Produto
                </h3>
                <p className="text-gray-700 text-sm mt-1">
                  Soluções de automação em desenvolvimento.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>

      <FloatingWhatsApp />
    </Layout>
  );
};

export default Downloads;
