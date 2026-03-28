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

  // Checkout State
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckoutSubmit = async (limit: number) => {
    if (!checkoutEmail || !checkoutEmail.includes("@")) {
      setCheckoutError("Por favor, insira um e-mail válido antes de escolher o plano.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const apiUrl = import.meta.env.VITE_MP_PREFERENCE_URL || "/api/create-preference";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: checkoutEmail, ra_limit: limit }),
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
    } finally {
      setCheckoutLoading(false);
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

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
                  onClick={scrollToPricing}
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
              onClick={scrollToPricing}
              id="ava-oryon-cta-buy-bottom"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg overflow-hidden bg-white text-black transition-transform hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingCart className="relative z-10 w-6 h-6 group-hover:text-white transition-colors duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Adquirir Licença Agora
              </span>
            </button>

            <p className="mt-5 text-gray-600 text-sm">
              Pagamento via Mercado Pago · Confirmação imediata
            </p>
          </motion.div>
        </section>

        {/* ── COMO FUNCIONA SECTION ── */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-[0.4em] text-gray-500 font-mono">
              O Novo Fluxo
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Como Funciona em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                3 Passos Rápidos
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
            {[
              { num: "01", title: "Assine", desc: "Escolha o plano que cabe no seu bolso (Estudante ou Agência)." },
              { num: "02", title: "Acesse", desc: "Faça o download e logue no App com o e-mail da compra." },
              { num: "03", title: "Dê o Play", desc: "Insira o RA/Senha da Unime e deixe o Oryon trabalhar por você." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PRICING SECTION (THE GRID) ── */}
        <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs uppercase tracking-[0.4em] text-purple-400 font-mono">
              Planos e Preços
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Poder</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Planos baseados no seu limite de alunos. Libere sua produtividade acadêmica.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">1. Identificação</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Use o <strong className="text-purple-400">mesmo e-mail</strong> que você usará para logar no App.
            </p>
            <div className="relative">
              <input
                type="email"
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                placeholder="seu.melhor@email.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-center text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                disabled={checkoutLoading}
                required
              />
            </div>
            {checkoutError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-3"
              >
                {checkoutError}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PLANO ESTUDANTE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#161B22] border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all flex flex-col relative overflow-hidden"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Plano Estudante</h3>
                <p className="text-gray-400 text-sm">Ideal para uso individual</p>
              </div>
              <div className="mb-8 flex items-end gap-2">
                <span className="text-4xl font-bold text-white">R$ 29,90</span>
                <span className="text-gray-500 text-sm pb-1">/ semestre</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Limite de 1 RA <span className="text-gray-500 text-xs ml-1">(No primeiro acesso)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Automação Completa
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Dashboard e Countdown
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Suporte via Comunidade
                </li>
              </ul>
              <button
                onClick={() => handleCheckoutSubmit(1)}
                disabled={checkoutLoading}
                className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {checkoutLoading ? "Processando..." : "Assinar Plano Estudante"}
              </button>
            </motion.div>

            {/* PLANO AGÊNCIA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#161B22] border border-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] rounded-3xl p-8 relative flex flex-col"
            >
              <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                  MELHOR CUSTO-BENEFÍCIO
                </span>
              </div>

              <div className="mb-8 mt-2">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Plano Agência</h3>
                <p className="text-gray-400 text-sm">Para quem presta serviço</p>
              </div>
              <div className="mb-8 flex items-end gap-2">
                <span className="text-4xl font-bold text-white">R$ 59,90</span>
                <span className="text-gray-500 text-sm pb-1">/ semestre</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-sm font-medium">
                  <Zap className="w-5 h-5 text-pink-400 shrink-0 fill-pink-400/20" />
                  Limite de 10 RAs <span className="text-gray-400 text-xs font-normal ml-1">(Na mesma chave)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Prioridade em Atualizações
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Suporte Direto (WhatsApp)
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  Painel de Gestão
                </li>
              </ul>
              <button
                onClick={() => handleCheckoutSubmit(10)}
                disabled={checkoutLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {checkoutLoading ? "Processando..." : "Assinar Plano Agência"}
              </button>
            </motion.div>
          </div>

          <div className="mt-14 text-center">
            <a
              href="https://wa.me/55xx99999999" // TODO: Add actual support link if needed
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm hover:underline underline-offset-4"
            >
              Já tem uma licença e quer adicionar mais RAs? <span className="text-purple-400">[Clique aqui para Upgrade]</span>
            </a>
          </div>
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
                onClick={scrollToPricing}
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4"
              >
                Adquirir agora
              </button>
            </p>
          </motion.div>
        </section>

        <Footer />
      </main>

      <FloatingWhatsApp />
    </Layout>
  );
};

export default AvaOryon;
