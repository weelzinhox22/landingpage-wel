import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SEO from "@/components/SEO";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Lock,
  CloudLightning,
  Cpu,
  Database,
  User,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// Feature Cards Data
// ─────────────────────────────────────────────
const features = [
  {
    icon: Lock,
    title: "Protocolo de Blindagem",
    description:
      "Login Criptografado (AES-256). Seus dados de acesso ao portal nunca saem do seu computador.",
    gradient: "from-purple-500/20 to-violet-600/10",
    borderGlow: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    iconColor: "text-purple-400 group-hover:animate-pulse",
    iconBg: "bg-purple-500/20 border-purple-500/30",
  },
  {
    icon: CloudLightning,
    title: "Check-in Serverless",
    description:
      "Licença Validada em Tempo Real via Supabase. Autenticação instantânea sem delays.",
    gradient: "from-blue-500/20 to-cyan-600/10",
    borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20 border-blue-500/30",
  },
  {
    icon: Cpu,
    title: "Executável Nativo",
    description:
      "Engine em V8 compilada. Instalador único (.exe) otimizado para Windows, sem necessidade de instalar dependências.",
    gradient: "from-emerald-500/20 to-green-600/10",
    borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20 border-emerald-500/30",
  },
  {
    icon: Database,
    title: "Local Storage",
    description:
      "Histórico Salvo Localmente. Seus logs de progresso ficam guardados apenas para o seu controle, com privacidade total.",
    gradient: "from-pink-500/20 to-rose-600/10",
    borderGlow: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/20 border-pink-500/30",
  },
];

// ─────────────────────────────────────────────
// FAQ Data
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "O robô pode ser detectado pela Unime?",
    answer: "Não. O Oryon simula movimentos humanos e intervalos randômicos de cliques, tornando o comportamento indistinguível de um usuário real.",
  },
  {
    question: "Posso usar em dois computadores?",
    answer: "A licença é vinculada ao seu Hardware ID (HWID). Para trocar de máquina, entre em contato com nosso suporte.",
  },
  {
    question: "O pagamento é único?",
    answer: "O acesso é trimestral.",
  },
  {
    question: "Como recebo minha chave de licença?",
    answer: "Após a confirmação do pagamento via WhatsApp, você receberá sua chave por e-mail, e ela será vinculada ao seu e-mail da compra.",
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
      className="mb-4 last:mb-0 group/faq cursor-pointer"
    >
      <div
        className={`border rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${isOpen
          ? 'bg-white/[0.04] border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.03] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]'
          }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left gap-4 group"
        >
          <span
            className={`font-bold text-base transition-colors duration-300 ${isOpen ? 'text-purple-300' : 'text-white group-hover:text-purple-200'
              }`}
          >
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${isOpen ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-white/5 text-gray-500 group-hover:bg-purple-500/10 group-hover:text-purple-300'
              }`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6 pt-0 relative">
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-purple-500/30 to-pink-500/5" />
                <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-8 pt-5">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Tilt Card Wrapper Component
// ─────────────────────────────────────────────
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          x.set(mouseX / width - 0.5);
          y.set(mouseY / height - 0.5);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Page Componentaaaaaaaaaaa
// ─────────────────────────────────────────────
const AvaOryon = () => {
  const navigate = useNavigate();

  // Checkout State
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [pricingTab, setPricingTab] = useState<"individual" | "agency">("individual");

  const handleCheckoutSubmit = async (planName: string) => {
    const cleanEmail = checkoutEmail ? checkoutEmail.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@<>'\"()\[\]]+@[^\s@<>'\"()\[\]]+\.[^\s@<>'\"()\[\]]{2,}$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setCheckoutError("Por favor, insira um e-mail válido e seguro antes de prosseguir.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const message = `olá, quero adquirir a licença do Plano ${planName}. Meu e-mail é: ${cleanEmail}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5571991373142?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error(err);
      setCheckoutError("Não foi possível redirecionar para o WhatsApp.");
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
                  Pagamento seguro via WhatsApp
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
              Tecnologia e Segurança
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
                  className="h-full"
                >
                  <TiltCard className={`relative h-full rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all duration-500 ${feature.borderGlow} group`}>
                    {/* bg shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
                    </div>

                    <div className="pointer-events-none">
                      <div
                        className={`w-14 h-14 rounded-xl border ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                      >
                        <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                      </div>

                      <h3
                        className="text-xl font-bold text-white mb-3 transition-colors"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <section className="relative z-10 py-8 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 relative z-10">
            {[
              { icon: Lock, label: "Login Criptografado", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
              { icon: CloudLightning, label: "Licença Validada em Tempo Real", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
              { icon: Cpu, label: "Instalador Único (.exe)", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
              { icon: Database, label: "Histórico Salvo Localmente", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", glow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
            ].map(({ icon: Icon, label, color, bg, border, glow }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full border ${border} ${bg} backdrop-blur-sm group cursor-default transition-all duration-300 ${glow}`}
              >
                <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} />
                <span className="text-gray-300 text-sm font-medium tracking-wide group-hover:text-white transition-colors">{label}</span>
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
              Pagamento via WhatsApp · Ativação imediata
            </p>
          </motion.div>
        </section>

        {/* ── COMO FUNCIONA SECTION ── */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-xs uppercase tracking-[0.4em] text-gray-500 font-mono">
              Workflow Oryon
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                3 Passos Rápidos
              </span>
            </h2>
          </motion.div>

          <div className="relative flex flex-col md:flex-row gap-12 md:gap-6 justify-between items-start">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-[23px] left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-pink-500/0" />

            {[
              { num: "01", title: "Kick-off", desc: "Escolha seu plano (Estudante ou Agência) e receba sua Key instantaneamente no e-mail." },
              { num: "02", title: "Setup", desc: "Baixe o Launcher, faça login com seu e-mail de compra e ative sua licença." },
              { num: "03", title: "Automation", desc: "Dê o play. O robô assume o controle do portal enquanto você foca no que realmente importa." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative w-full md:w-1/3 flex flex-col items-center text-center group"
              >
                {/* Giant Number Background */}
                <div className="absolute top-0 md:-top-16 left-1/2 -translate-x-1/2 text-[8rem] md:text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-purple-500/[0.05] transition-colors duration-500" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {step.num}
                </div>

                <div className="relative z-10 w-12 h-12 rounded-full bg-[#0d1117] border-[2px] border-purple-500/30 text-purple-400 flex items-center justify-center text-lg font-bold mx-auto mb-8 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
                  {step.num}
                </div>
                <div className="relative z-10 px-4">
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
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

          {/* Pricing Tabs Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex gap-2 relative">
              <button
                onClick={() => setPricingTab("individual")}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 flex items-center gap-2 ${pricingTab === "individual"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/35"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <User className="w-4 h-4" />
                Uso Individual
              </button>
              <button
                onClick={() => setPricingTab("agency")}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 relative z-10 flex items-center gap-2 ${pricingTab === "agency"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/35"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <Briefcase className="w-4 h-4" />
                Planos Agência
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {pricingTab === "individual" ? (
              <motion.div
                key="individual"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
              >
                {/* PLANO MENSAL */}
                <div className="h-full">
                  <TiltCard className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all flex flex-col relative group h-full">
                    <div className="mb-8 pointer-events-none">
                      <h3 className="text-2xl font-bold text-white mb-2">Plano Mensal</h3>
                      <p className="text-gray-400 text-sm">Acesso de curto prazo</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 39,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ mês</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 1 RA <span className="text-gray-500 text-xs ml-1">(No primeiro acesso)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Dashboard e Countdown
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Suporte via Comunidade
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Individual Mensal")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-50 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Assinar Plano Mensal"}
                    </button>
                  </TiltCard>
                </div>

                {/* PLANO TRIMESTRAL */}
                <div className="h-full relative">
                  <TiltCard className="bg-white/[0.04] backdrop-blur-xl border border-purple-500/40 shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-3xl p-8 relative flex flex-col hover:border-purple-500/60 transition-all group h-full">
                    <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg"
                      >
                        MELHOR CUSTO-BENEFÍCIO
                      </motion.span>
                    </div>

                    <div className="mb-8 mt-2 pointer-events-none">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Plano Trimestral</h3>
                      <p className="text-gray-400 text-sm">Ideal para o semestre letivo</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 55,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ trimestre</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-white text-sm font-medium">
                        <Zap className="w-5 h-5 text-pink-400 shrink-0 fill-pink-400/20 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 1 RA <span className="text-gray-400 text-xs font-normal ml-1">(No primeiro acesso)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Dashboard e Countdown
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Prioridade em Atualizações
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Individual Trimestral")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Assinar Plano Trimestral"}
                    </button>
                  </TiltCard>
                </div>

                {/* PLANO VITALÍCIO */}
                <div className="h-full relative">
                  <TiltCard className="bg-white/[0.02] backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all flex flex-col relative group h-full">
                    <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                        SEM RENOVAÇÃO
                      </span>
                    </div>

                    <div className="mb-8 mt-2 pointer-events-none">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 mb-2">Plano Vitalício</h3>
                      <p className="text-gray-400 text-sm">Pague uma vez, use para sempre</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 129,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ único</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-white text-sm font-medium">
                        <Zap className="w-5 h-5 text-yellow-400 shrink-0 fill-yellow-400/20 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 1 RA <span className="text-gray-400 text-xs font-normal ml-1">(No primeiro acesso)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa Vitalícia
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Acesso Ilimitado sem Mensalidades
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Suporte VIP Prioritário
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Individual Vitalício")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl border border-pink-500/20 bg-pink-500/10 text-white font-bold hover:bg-pink-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Adquirir Plano Vitalício"}
                    </button>
                  </TiltCard>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="agency"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
              >
                {/* PLANO MENSAL AGÊNCIA */}
                <div className="h-full">
                  <TiltCard className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all flex flex-col relative group h-full">
                    <div className="mb-8 pointer-events-none">
                      <h3 className="text-2xl font-bold text-white mb-2">Mensal Agência</h3>
                      <p className="text-gray-400 text-sm">Acesso recorrente para times</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 69,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ mês</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 10 RAs <span className="text-gray-500 text-xs ml-1">(Na mesma chave)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Dashboard e Countdown
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Suporte Direto (WhatsApp)
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Agência Mensal")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-50 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Assinar Mensal Agência"}
                    </button>
                  </TiltCard>
                </div>

                {/* PLANO TRIMESTRAL AGÊNCIA */}
                <div className="h-full relative">
                  <TiltCard className="bg-white/[0.04] backdrop-blur-xl border border-purple-500/40 shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-3xl p-8 relative flex flex-col hover:border-purple-500/60 transition-all group h-full">
                    <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg"
                      >
                        MELHOR CUSTO-BENEFÍCIO
                      </motion.span>
                    </div>

                    <div className="mb-8 mt-2 pointer-events-none">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Trimestral Agência</h3>
                      <p className="text-gray-400 text-sm">Ideal para times e múltiplos RAs</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 99,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ trimestre</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-white text-sm font-medium">
                        <Zap className="w-5 h-5 text-pink-400 shrink-0 fill-pink-400/20 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 10 RAs <span className="text-gray-400 text-xs font-normal ml-1">(Na mesma chave)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Dashboard e Countdown
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Suporte Direto (WhatsApp)
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Agência Trimestral")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Assinar Trimestral Agência"}
                    </button>
                  </TiltCard>
                </div>

                {/* PLANO VITALÍCIO AGÊNCIA */}
                <div className="h-full relative">
                  <TiltCard className="bg-white/[0.02] backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all flex flex-col relative group h-full">
                    <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                        SEM RENOVAÇÃO / COMPLETO
                      </span>
                    </div>

                    <div className="mb-8 mt-2 pointer-events-none">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 mb-2">Vitalício Agência</h3>
                      <p className="text-gray-400 text-sm">Pague uma vez, use para sempre</p>
                    </div>
                    <div className="mb-8 flex items-end gap-2 pointer-events-none">
                      <span className="text-4xl font-bold text-white">R$ 229,90</span>
                      <span className="text-gray-500 text-sm pb-1">/ único</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 pointer-events-none">
                      <li className="flex items-center gap-3 text-white text-sm font-medium">
                        <Zap className="w-5 h-5 text-yellow-400 shrink-0 fill-yellow-400/20 group-hover:scale-125 transition-transform duration-300" />
                        Limite de 10 RAs <span className="text-gray-400 text-xs font-normal ml-1">(Na mesma chave)</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-75" />
                        Automação Completa Vitalícia
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-150" />
                        Acesso Ilimitado sem Mensalidades
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 group-hover:scale-125 transition-transform duration-300 delay-200" />
                        Suporte VIP Prioritário (WhatsApp)
                      </li>
                    </ul>
                    <button
                      onClick={() => handleCheckoutSubmit("Agência Vitalícia")}
                      disabled={checkoutLoading}
                      className="w-full py-4 rounded-xl border border-pink-500/20 bg-pink-500/10 text-white font-bold hover:bg-pink-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 relative z-10"
                    >
                      {checkoutLoading ? "Processando..." : "Adquirir Vitalício Agência"}
                    </button>
                  </TiltCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-14 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <TiltCard className="rounded-xl border border-purple-500/20 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 text-center flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="relative z-10 text-2xl font-bold text-white mb-2 pointer-events-none" style={{ fontFamily: "'Sora', sans-serif" }}>
                  <span className="text-yellow-400"></span> Sua operação cresceu?
                </h3>
                <p className="relative z-10 text-gray-400 text-sm md:text-base mb-8 pointer-events-none">
                  Aumente seu limite de RAs agora e atenda mais alunos sem precisar de uma nova chave.
                </p>

                <a
                  href="https://wa.me/5571991373142?text=olá,%20quero%20adquirir%20a%20licença%20(Upgrade)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300 transform group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] pointer-events-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl bg-[length:200%_auto] animate-gradient" />
                  <div className="absolute inset-[2px] bg-[#0d1117] rounded-[10px]" />
                  <div className="absolute inset-[2px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white text-gray-200 uppercase tracking-wider">
                    <Zap className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                    Clique aqui para Upgrade
                  </span>
                </a>
              </TiltCard>
            </motion.div>
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

          <div className="w-full">
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
                href="https://github.com/weelzinhox22/ava-exe/releases/download/v1.1.3/Studio_Oryon_Setup_v1.1.2.exe"
                id="ava-oryon-download-btn"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-white text-sm font-medium hover:bg-purple-500/20 hover:border-purple-500/60 transition-all group"
              >
                <Download className="w-4 h-4 text-purple-400 group-hover:animate-bounce" />
                Studio_Oryon_Setup_v1.1.2.exe
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
