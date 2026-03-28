import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  History,
  Shield,
  Package,
  ShoppingCart,
  Download,
  ChevronDown,
  CheckCircle2,
  Zap,
  ArrowLeft,
  X,
  Mail,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// Feature Cards Data
// ─────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: "Automação Inteligente",
    description:
      "Execução de atividades e leitura de conteúdos de forma orgânica e natural, simulando o comportamento humano para máxima segurança.",
    gradient: "from-purple-500/20 to-violet-600/10",
    borderGlow: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/20 border-purple-500/30",
  },
  {
    icon: History,
    title: "Histórico de Atividades",
    description:
      "Registro completo de tudo que foi executado, salvo no seu %AppData% local. Acompanhe cada ação com timestamps precisos.",
    gradient: "from-blue-500/20 to-cyan-600/10",
    borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20 border-blue-500/30",
  },
  {
    icon: Shield,
    title: "Segurança Supabase",
    description:
      "Login criptografado e validação de licença em tempo real via Supabase. Seus dados são protegidos com criptografia de ponta.",
    gradient: "from-emerald-500/20 to-green-600/10",
    borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
  },
  {
    icon: Package,
    title: "Simplicidade Total",
    description:
      "Um único executável (.exe) leve e rápido. Sem instalações complexas, sem dependências extras. Clique e use imediatamente.",
    gradient: "from-pink-500/20 to-rose-600/10",
    borderGlow: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/20 border-pink-500/30",
  },
];

// ─────────────────────────────────────────────
// FAQ Data
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "Como recebo minha chave de licença?",
    answer:
      "Após a confirmação do pagamento via Mercado Pago, você receberá sua chave de licença por e-mail em até 5 minutos. A chave é gerada automaticamente e vinculada ao seu CPF. Caso não receba, entre em contato pelo WhatsApp.",
  },
  {
    question: "É seguro usar o AVA-Oryon?",
    answer:
      "Sim. O AVA-Oryon foi desenvolvido com foco em segurança: a automação simula comportamento humano orgânico, seu login é criptografado via Supabase, e todos os dados ficam armazenados localmente no seu computador. Não armazenamos suas senhas acadêmicas.",
  },
  {
    question: "Funciona em quais matérias?",
    answer:
      "O AVA-Oryon é compatível com a maioria das atividades do AVA Unime, incluindo leitura de conteúdos, questionários e atividades de múltipla escolha. Para atividades dissertativas, o sistema identifica e pula automaticamente. A compatibilidade pode variar conforme atualizações da plataforma.",
  },
  {
    question: "A licença tem validade?",
    answer:
      "Sim, a licença tem validade de 30 dias a partir da data de ativação. Após vencer, basta renovar para continuar usando. Fique atento às nossas promoções via WhatsApp e Instagram.",
  },
  {
    question: "Funciona em qualquer computador?",
    answer:
      "O AVA-Oryon funciona em qualquer computador com Windows 10 ou superior. Não é necessário instalar Python, Node.js ou qualquer dependência. Basta baixar o instalador (.exe) e executar.",
  },
];

// ─────────────────────────────────────────────
// FAQ Item Component
// ─────────────────────────────────────────────
const FAQItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-white font-medium text-base group-hover:text-purple-300 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${isOpen ? "text-purple-400" : "text-gray-500"
              }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400 leading-relaxed text-sm md:text-base pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────
const AvaOryon = () => {
  const navigate = useNavigate();

  // Inline Checkout State
  const [expandedSection, setExpandedSection] = useState<'hero' | 'bottom' | 'download' | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail || !checkoutEmail.includes("@")) {
      setCheckoutError("Por favor, insira um e-mail válido.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      // 🚀 CHAMA A SERVERLESS FUNCTION NA VERCEL:
      // O script Node (api/create-preference.js) usa o Access Token e o e-mail para criar a preference no Mercado Pago
      const apiUrl = import.meta.env.VITE_MP_PREFERENCE_URL || "/api/create-preference";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: checkoutEmail }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar link de pagamento.");
      }

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("Link (init_point) não retornado pela API.");
      }
    } catch (err) {
      console.error(err);
      setCheckoutError("Não foi possível gerar a cobrança agora.");
      // Opcional: Fallback
      // window.location.href = "https://mpago.li/2kLegqy";
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderCheckoutForm = (sectionId: string) => (
    <motion.form
      key={`checkout-form-${sectionId}`}
      initial={{ height: 0, opacity: 0, marginTop: 0 }}
      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
      exit={{ height: 0, opacity: 0, marginTop: 0 }}
      className="w-full max-w-md mx-auto overflow-hidden text-left"
      onSubmit={handleCheckoutSubmit}
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md">
        <p className="text-sm text-gray-400 mb-4 whitespace-normal text-center leading-relaxed flex flex-col items-center">
          <Mail className="w-5 h-5 text-purple-400 mb-2" />
          Sua chave de acesso será enviada <strong>imediatamente</strong> para o e-mail abaixo após a confirmação:
        </p>
        <div className="relative mb-4">
          <input
            type="email"
            value={checkoutEmail}
            onChange={(e) => setCheckoutEmail(e.target.value)}
            placeholder="seu.melhor@email.com"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-center"
            disabled={checkoutLoading}
            required
          />
        </div>
        {checkoutError && (
          <p className="text-red-400 text-xs mb-4 text-center">{checkoutError}</p>
        )}
        <button
          type="submit"
          disabled={checkoutLoading}
          className="w-full relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-purple-600 disabled:opacity-70 transition-all hover:bg-purple-500 shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_30px_rgba(147,51,234,0.5)]"
        >
          {checkoutLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Preparando...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continuar com Pagamento
            </>
          )}
        </button>
      </div>
    </motion.form>
  );

  return (
    <Layout>
      <SEO />
      <Header />

      <main className="relative z-10 bg-[#020525] text-white min-h-screen overflow-x-hidden">

        {/* ── HERO SECTION ── */}
        <section className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-20 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Main glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-purple-600/8 blur-[150px]" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/8 blur-[120px]" />
            {/* Grid dots */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
            {/* Top fade */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020525] to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Back link */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate("/downloads")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 text-sm mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Central de Soluções</span>
            </motion.button>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-xs uppercase tracking-[0.3em] font-mono">
                AVA-Oryon · v1.1
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Domine seu tempo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">
                com o AVA-Oryon
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            >
              A extensão inteligente que automatiza suas atividades acadêmicas com{" "}
              <span className="text-gray-300">segurança</span>,{" "}
              <span className="text-gray-300">precisão</span> e{" "}
              <span className="text-gray-300">registro de histórico</span>.
            </motion.p>

            {/* CTA Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Primary CTA */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedSection(expandedSection === 'hero' ? null : 'hero');
                  }}
                  id="ava-oryon-cta-buy"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base text-black bg-white overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <ShoppingCart className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Adquirir Licença Agora
                  </span>
                </button>

                {/* Secondary — info */}
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Pagamento seguro via Mercado Pago
                </p>
              </div>

              {/* Formulário Inline que expande abaixo do botão */}
              <AnimatePresence>
                {expandedSection === 'hero' && renderCheckoutForm('hero')}
              </AnimatePresence>
            </motion.div>

            {/* Download Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8"
            >
              <p className="text-gray-600 text-sm">
                Já possui uma licença?{" "}
                <a
                  href="#download"
                  id="ava-oryon-installer-link"
                  className="text-gray-400 underline underline-offset-4 hover:text-gray-200 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("download")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Baixar Instalador v1.1
                </a>
              </p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          >
            <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">
              scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── FEATURES SECTION ── */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-[0.4em] text-gray-500 font-mono">
              Principais Recursos
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Tudo que você precisa,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                sem complicação
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${feature.gradient} p-7 overflow-hidden transition-all duration-500 ${feature.borderGlow} group`}
                >
                  {/* bg shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl border ${feature.iconBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Shield, label: "Login Criptografado" },
              { icon: CheckCircle2, label: "Licença Validada em Tempo Real" },
              { icon: Package, label: "Instalador Único (.exe)" },
              { icon: History, label: "Histórico Salvo Localmente" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2.5 text-gray-400 text-sm"
              >
                <Icon className="w-4 h-4 text-purple-400" />
                {label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="relative z-10 py-28 px-6">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-3xl mx-auto text-center"
          >
            <span className="inline-block mb-6 text-xs uppercase tracking-[0.4em] text-gray-500 font-mono">
              Comece Agora
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Pronto para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                economizar horas
              </span>{" "}
              toda semana?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Adquira sua licença agora e comece a usar em minutos.
              Pagamento seguro e chave enviada automaticamente.
            </p>

            <button
              onClick={(e) => {
                e.preventDefault();
                setExpandedSection(expandedSection === 'bottom' ? null : 'bottom');
              }}
              id="ava-oryon-cta-buy-bottom"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg overflow-hidden bg-white text-black transition-transform hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingCart className="relative z-10 w-6 h-6 group-hover:text-white transition-colors duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Adquirir Licença Agora
              </span>
            </button>
            <AnimatePresence>
              {expandedSection === 'bottom' && renderCheckoutForm('bottom')}
            </AnimatePresence>

            <p className="mt-5 text-gray-600 text-sm">
              Pagamento via Mercado Pago · Confirmação imediata
            </p>
          </motion.div>
        </section>

        {/* ── FAQ SECTION ── */}
        <section className="relative z-10 max-w-3xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-[0.4em] text-gray-500 font-mono">
              Perguntas Frequentes
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Dúvidas?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                A gente responde
              </span>
            </h2>
          </motion.div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/0 px-6 md:px-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ── DOWNLOAD SECTION ── */}
        <section
          id="download"
          className="relative z-10 max-w-3xl mx-auto px-6 py-16 mb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-10 text-center overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 mb-6">
              <Download className="w-7 h-7 text-purple-400" />
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Instalador AVA-Oryon
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md mx-auto">
              Utilize seu e-mail cadastrado e sua chave de licença para ativar o
              software após a instalação.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/weelzinhox22/ava-exe/releases/download/v1.0.0/Studio_Oryon_Setup_v1.0.0.exe"
                id="ava-oryon-download-btn"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-white text-sm font-medium hover:bg-purple-500/20 hover:border-purple-500/60 transition-all group"
              >
                <Download className="w-4 h-4 text-purple-400 group-hover:animate-bounce" />
                Studio_Oryon_Setup_v1.0.0.exe
              </a>
              <span className="text-gray-600 text-xs">Windows 10+</span>
            </div>

            <p className="mt-6 text-gray-600 text-xs">
              Não possui uma licença ainda?{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedSection(expandedSection === 'download' ? null : 'download');
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4"
              >
                Adquirir agora
              </button>
            </p>
            <AnimatePresence>
              {expandedSection === 'download' && renderCheckoutForm('download')}
            </AnimatePresence>
          </motion.div>
        </section>

        <Footer />
      </main>

      <FloatingWhatsApp />
    </Layout>
  );
};

export default AvaOryon;
