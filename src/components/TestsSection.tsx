import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==================== CONTEXT ANALYZER ====================
interface BusinessContext {
  type: string; // saas, ecommerce, portfolio, agency, restaurant, etc
  industry: string; // barbershop, tech, fashion, food, etc
  keywords: string[];
  tone: string; // professional, casual, bold, elegant
}

function analyzeContext(title: string, description: string): BusinessContext {
  const text = (title + " " + description).toLowerCase();
  
  // Detect business type
  let type = 'website';
  if (text.match(/saas|software|app|plataforma|sistema|dashboard/)) type = 'saas';
  else if (text.match(/loja|ecommerce|e-commerce|venda|produto|store/)) type = 'ecommerce';
  else if (text.match(/portfolio|portfólio|work|projeto|designer|dev/)) type = 'portfolio';
  else if (text.match(/agência|agency|marketing|consultoria/)) type = 'agency';
  else if (text.match(/restaurante|food|comida|café|bar|barbearia|salão|salon|barbershop/)) type = 'local-business';
  else if (text.match(/curso|escola|educação|learning|ensino/)) type = 'education';
  
  // Detect industry
  let industry = 'geral';
  if (text.match(/barbearia|barbershop|barber|cabelo|hair/)) industry = 'barbershop';
  else if (text.match(/tech|tecnologia|software|digital/)) industry = 'tech';
  else if (text.match(/moda|fashion|roupa|clothes/)) industry = 'fashion';
  else if (text.match(/comida|food|restaurante|café/)) industry = 'food';
  else if (text.match(/fitness|gym|academia|saúde|health/)) industry = 'fitness';
  else if (text.match(/imobiliária|real estate|casa|apartamento/)) industry = 'realestate';
  
  // Extract keywords
  const keywords = text.match(/\b\w{4,}\b/g)?.slice(0, 10) || [];
  
  // Detect tone
  let tone = 'professional';
  if (text.match(/ousado|bold|criativo|inovador|moderno/)) tone = 'bold';
  else if (text.match(/elegante|luxo|premium|sofisticado/)) tone = 'elegant';
  else if (text.match(/divertido|fun|casual|descontraído/)) tone = 'casual';
  
  return { type, industry, keywords, tone };
}

function generateContextualContent(context: BusinessContext, componentType: string): any {
  const { type, industry } = context;
  
  // Content templates based on context
  const templates: any = {
    barbershop: {
      hero: {
        titles: ['Seu Estilo, Nossa Paixão', 'Cortes Premium', 'Barbearia Moderna', 'Estilo & Atitude'],
        subtitles: ['Agende seu horário online', 'Onde tradição encontra modernidade', 'Os melhores profissionais da cidade'],
        features: ['Agendamento Online', 'Cortes Modernos', 'Ambiente Premium', 'Profissionais Experientes'],
        services: ['Corte de Cabelo', 'Barba & Bigode', 'Tratamento Capilar', 'Pacotes VIP'],
        cta: 'Agendar Horário'
      },
      saas: {
        titles: ['Gerencie sua Barbearia', 'Controle Total do seu Negócio', 'Sistema Completo'],
        subtitles: ['Agendamentos, clientes e pagamentos em um só lugar', 'Automatize sua barbearia'],
        features: ['Agenda Inteligente', 'Gestão de Clientes', 'Controle Financeiro', 'Relatórios em Tempo Real'],
        cta: 'Iniciar Teste Grátis'
      }
    },
    tech: {
      saas: {
        titles: ['Transforme Dados em Decisões', 'Plataforma Inteligente', 'Inovação em Software'],
        subtitles: ['Tecnologia que impulsiona seu negócio', 'A solução que você procurava'],
        features: ['IA Avançada', 'Integração Fácil', 'API Robusta', 'Suporte 24/7'],
        cta: 'Começar Agora'
      }
    },
    fitness: {
      titles: ['Transforme seu Corpo', 'Sua Academia Digital', 'Treinos Personalizados'],
      subtitles: ['Alcance seus objetivos fitness', 'Treinos e nutrição em um só lugar'],
      features: ['Treinos Personalizados', 'Acompanhamento Nutricional', 'App Mobile', 'Coach Virtual'],
      cta: 'Começar Treino'
    },
    food: {
      titles: ['Sabor Autêntico', 'Experiência Gastronômica', 'Delivery Rápido'],
      subtitles: ['Da nossa cozinha para sua casa', 'Os melhores pratos da região'],
      features: ['Delivery Rápido', 'Ingredientes Frescos', 'Menu Variado', 'Pratos Especiais'],
      cta: 'Ver Cardápio'
    },
    general: {
      titles: ['Soluções Digitais', 'Seu Negócio Online', 'Presença Digital Completa'],
      subtitles: ['Crescimento através da tecnologia', 'Transformação digital para sua empresa'],
      features: ['Alta Performance', 'Design Moderno', 'Suporte Dedicado', 'Resultados Comprovados'],
      cta: 'Saiba Mais'
    }
  };
  
  const industryContent = templates[industry] || templates.general;
  const typeContent = industryContent[type] || industryContent;
  
  return typeContent;
}

// ==================== COMPONENT LIBRARY ====================

const HeroComponent1 = ({ title, subtitle, primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'hero');
  return (
    <div className="py-32 px-8 text-center" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${adjustColor(primaryColor, -30)} 100%)` }}>
      <h1 className="text-7xl font-bold text-white mb-6">{title || content.titles[0]}</h1>
      <p className="text-2xl text-white/90 mb-8">{subtitle || content.subtitles[0]}</p>
      <button className="bg-white px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-xl" style={{ color: primaryColor }}>
        {content.cta}
      </button>
    </div>
  );
};

const HeroComponent2 = ({ title, subtitle, primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'hero');
  return (
    <div className="py-40 px-8 flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex-1">
        <h1 className="text-8xl font-bold mb-6" style={{ color: primaryColor }}>{title || content.titles[1] || "Innovation"}</h1>
        <p className="text-xl text-gray-700 mb-8">{subtitle || content.subtitles[1] || "Building the future"}</p>
        <button className="px-8 py-4 rounded-lg font-bold text-white transition" style={{ backgroundColor: primaryColor }}>
          {content.cta}
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-96 h-96 rounded-3xl" style={{ background: `linear-gradient(45deg, ${primaryColor}, ${adjustColor(primaryColor, 50)})` }}></div>
      </div>
    </div>
  );
};

const HeroComponent3 = ({ title, subtitle, primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'hero');
  return (
    <div className="relative py-48 px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
      <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${primaryColor} 0%, transparent 70%)` }}></div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-9xl font-black text-white mb-6 uppercase tracking-tight">{title || content.titles[2] || "Bold"}</h1>
        <p className="text-2xl text-white/80">{subtitle || content.subtitles[0]}</p>
      </div>
    </div>
  );
};

const FeaturesComponent1 = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'features');
  const features = content.features || ['Feature 1', 'Feature 2', 'Feature 3'];
  return (
    <div className="py-24 px-8 bg-white">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Recursos Principais</h2>
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.slice(0, 3).map((feature: string, i: number) => (
          <div key={i} className="text-center p-8 rounded-2xl border-2 border-gray-100 hover:shadow-lg transition">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: primaryColor }}>
              {i + 1}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature}</h3>
            <p className="text-gray-600">Solução completa e eficiente para suas necessidades</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesComponent2 = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'features');
  const features = content.features || ['Feature 1', 'Feature 2', 'Feature 3'];
  return (
    <div className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="text-6xl font-bold mb-4" style={{ color: primaryColor }}>Por Que Escolher</h2>
      <p className="text-xl text-gray-600 mb-16">As vantagens que nos diferenciam</p>
      <div className="space-y-8">
        {features.slice(0, 3).map((feature: string, i: number) => (
          <div key={i} className="flex gap-8 items-start p-8 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ backgroundColor: primaryColor }}>
              {i + 1}
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900">{feature}</h3>
              <p className="text-lg text-gray-600">Tecnologia de ponta para resultados excepcionais</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesComponent3 = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'features');
  const features = content.features || ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
  const icons = ['🚀', '🔒', '📱', '⚡', '💎', '🎯'];
  return (
    <div className="py-24 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">Tudo Que Você Precisa</h2>
        <div className="grid grid-cols-2 gap-12">
          {features.slice(0, 4).map((feature: string, i: number) => (
            <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition">
              <div className="text-6xl">{icons[i]}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>{feature}</h3>
                <p className="text-gray-600 text-lg">Qualidade e eficiência garantidas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesComponent = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'services');
  const services = content.services || content.features || ['Serviço 1', 'Serviço 2', 'Serviço 3', 'Serviço 4'];
  return (
    <div className="py-24 px-8 bg-gray-50">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Nossos Serviços</h2>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.slice(0, 4).map((service: string, i: number) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition">
            <div className="text-4xl mb-4">{['💼', '🎨', '⚙️', '📊'][i]}</div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>{service}</h3>
            <p className="text-gray-600 mb-4">Serviço completo e profissional para suas necessidades</p>
            <button className="text-sm font-bold uppercase tracking-wider hover:underline" style={{ color: primaryColor }}>
              Saiba Mais →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsComponent1 = ({ primaryColor, context }: any) => {
  const names = context.industry === 'barbershop' 
    ? ['Carlos Silva', 'Rafael Santos']
    : ['João Pedro', 'Maria Costa'];
  const quotes = context.industry === 'barbershop'
    ? ['Melhor corte que já fiz! Profissionais excelentes.', 'Ambiente incrível e atendimento de primeira.']
    : ['Serviço excepcional que superou todas expectativas.', 'A melhor decisão que tomamos para nosso negócio.'];
  
  return (
    <div className="py-24 px-8 bg-white">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">O Que Dizem Nossos Clientes</h2>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {quotes.map((quote, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-2xl border-l-4" style={{ borderColor: primaryColor }}>
            <p className="text-xl text-gray-700 mb-6 italic">"{quote}"</p>
            <div className="font-bold text-gray-900 text-lg">{names[i]}</div>
            <div className="text-gray-600">Cliente Satisfeito</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsComponent2 = ({ primaryColor, context }: any) => {
  const names = context.industry === 'barbershop' 
    ? ['Pedro Alves', 'Lucas Martins']
    : ['Ana Silva', 'Roberto Lima'];
  const quotes = context.industry === 'barbershop'
    ? ['Ambiente moderno e profissionais competentes', 'Sempre volto, o melhor da região']
    : ['Resultados incríveis em tempo recorde', 'Transformou completamente nosso negócio'];
  
  return (
    <div className="py-24 px-8" style={{ background: `linear-gradient(135deg, ${adjustColor(primaryColor, -40)} 0%, ${adjustColor(primaryColor, -20)} 100%)` }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-6xl font-bold text-white mb-20">Adorado por Milhares</h2>
        <div className="space-y-12">
          {quotes.map((quote, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl">
              <p className="text-2xl text-white mb-6">"{quote}"</p>
              <div className="text-xl font-bold text-white">{names[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CTAComponent1 = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'cta');
  return (
    <div className="py-32 px-8 text-center" style={{ backgroundColor: primaryColor }}>
      <h2 className="text-6xl font-bold text-white mb-6">Pronto Para Começar?</h2>
      <p className="text-2xl text-white/90 mb-10">Junte-se a milhares de clientes satisfeitos</p>
      <button className="bg-white px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-2xl" style={{ color: primaryColor }}>
        {content.cta}
      </button>
    </div>
  );
};

const CTAComponent2 = ({ primaryColor, context }: any) => {
  const content = generateContextualContent(context, 'cta');
  return (
    <div className="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold text-white mb-4">Vamos Construir Juntos</h2>
          <p className="text-xl text-white/80">Sua história de sucesso começa aqui</p>
        </div>
        <button className="px-10 py-5 rounded-lg text-xl font-bold text-white transition shadow-xl" style={{ backgroundColor: primaryColor }}>
          {content.cta}
        </button>
      </div>
    </div>
  );
};

const StatsComponent = ({ primaryColor, context }: any) => {
  const stats = context.industry === 'barbershop'
    ? [
      { value: '5K+', label: 'Clientes Satisfeitos' },
      { value: '98%', label: 'Avaliação Positiva' },
      { value: '24/7', label: 'Agendamento Online' },
      { value: '10+', label: 'Anos de Experiência' }
    ]
    : context.type === 'saas'
    ? [
      { value: '50K+', label: 'Usuários Ativos' },
      { value: '99.9%', label: 'Uptime' },
      { value: '24/7', label: 'Suporte' },
      { value: '150+', label: 'Países' }
    ]
    : [
      { value: '10K+', label: 'Clientes' },
      { value: '99%', label: 'Satisfação' },
      { value: '24/7', label: 'Suporte' },
      { value: '50+', label: 'Países' }
    ];
  
  return (
    <div className="py-24 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Números Que Falam</h2>
        <div className="grid grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl font-black mb-4" style={{ color: primaryColor }}>{stat.value}</div>
              <div className="text-lg text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PricingComponent = ({ primaryColor, context }: any) => {
  const plans = context.type === 'saas'
    ? [
      { name: 'Starter', price: 'R$ 49', features: ['Até 100 Usuários', 'Suporte Básico', '5GB Armazenamento'] },
      { name: 'Pro', price: 'R$ 149', features: ['Usuários Ilimitados', 'Suporte Prioritário', '50GB Armazenamento'], featured: true },
      { name: 'Enterprise', price: 'R$ 399', features: ['Soluções Personalizadas', 'Suporte 24/7', 'Armazenamento Ilimitado'] }
    ]
    : [
      { name: 'Básico', price: 'R$ 99', features: ['5 Projetos', 'Suporte Email', '1GB Storage'] },
      { name: 'Profissional', price: 'R$ 249', features: ['Projetos Ilimitados', 'Suporte Prioritário', '50GB Storage'], featured: true },
      { name: 'Premium', price: 'R$ 499', features: ['Tudo Incluso', 'Suporte 24/7', 'Storage Ilimitado'] }
    ];
  
  return (
    <div className="py-24 px-8 bg-white">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Planos Simples</h2>
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-3xl ${plan.featured ? 'shadow-2xl border-4 scale-105' : 'bg-gray-50'}`} style={plan.featured ? { borderColor: primaryColor } : {}}>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{plan.name}</h3>
            <div className="text-5xl font-black mb-8" style={{ color: primaryColor }}>{plan.price}<span className="text-xl text-gray-600">/mês</span></div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">✓</span>
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-lg font-bold transition ${plan.featured ? 'text-white shadow-lg' : 'bg-gray-200 text-gray-900'}`} style={plan.featured ? { backgroundColor: primaryColor } : {}}>
              Escolher Plano
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamComponent = ({ primaryColor, context }: any) => {
  const roles = context.industry === 'barbershop'
    ? ['Mestre Barbeiro', 'Especialista', 'Colorista', 'Estilista']
    : ['CEO', 'CTO', 'Designer', 'Developer'];
  
  return (
    <div className="py-24 px-8 bg-gray-50">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Conheça o Time</h2>
      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        {roles.map((role, i) => (
          <div key={i} className="text-center">
            <div className="w-48 h-48 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, 40)})` }}>
              {role[0]}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profissional</h3>
            <p className="text-gray-600">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryComponent = ({ primaryColor, context }: any) => {
  const title = context.industry === 'barbershop' ? 'Galeria de Trabalhos' : 'Nosso Portfólio';
  return (
    <div className="py-24 px-8 bg-white">
      <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">{title}</h2>
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition" style={{ background: `linear-gradient(${45 * i}deg, ${primaryColor}, ${adjustColor(primaryColor, 30)})` }}>
            <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold opacity-50">
              {i}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactFormComponent = ({ primaryColor, context }: any) => {
  const cta = context.industry === 'barbershop' ? 'Agendar Horário' : 'Enviar Mensagem';
  return (
    <div className="py-24 px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900">Entre em Contato</h2>
        <form className="space-y-6">
          <input type="text" placeholder="Seu Nome" className="w-full p-5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-gray-400 transition text-lg text-gray-900 bg-white placeholder:text-gray-400" />
          <input type="email" placeholder="Seu Email" className="w-full p-5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-gray-400 transition text-lg text-gray-900 bg-white placeholder:text-gray-400" />
          <textarea placeholder="Sua Mensagem" rows={6} className="w-full p-5 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-gray-400 transition text-lg text-gray-900 bg-white placeholder:text-gray-400 resize-none"></textarea>
          <button type="submit" className="w-full py-5 rounded-xl text-white font-bold text-xl shadow-xl hover:shadow-2xl transition" style={{ backgroundColor: primaryColor }}>
            {cta}
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// AI-powered component selector with intelligent variation
function selectComponentsAI(title: string, description: string, style: string, context: BusinessContext): string[] {
  const components: string[] = [];
  const text = description.toLowerCase();
  
  // Hero selection with randomization
  const heroVariants = ['hero1', 'hero2', 'hero3'];
  if (style === 'modern') {
    components.push(Math.random() > 0.3 ? 'hero1' : 'hero2');
  } else if (style === 'minimal') {
    components.push(Math.random() > 0.5 ? 'hero2' : 'hero3');
  } else if (style === 'bold') {
    components.push(Math.random() > 0.3 ? 'hero3' : 'hero1');
  } else {
    components.push(heroVariants[Math.floor(Math.random() * heroVariants.length)]);
  }
  
  // Services section (for local businesses and SaaS)
  if (context.type === 'local-business' || context.type === 'saas' || text.includes('serviço')) {
    if (Math.random() > 0.4) {
      components.push('services');
    }
  }
  
  // Features section with variation
  const featureVariants = ['features1', 'features2', 'features3'];
  if (text.includes('feature') || text.includes('recurso') || text.includes('benefício') || text.includes('vantagem')) {
    components.push(featureVariants[Math.floor(Math.random() * featureVariants.length)]);
  } else if (Math.random() > 0.3) {
    components.push(featureVariants[Math.floor(Math.random() * featureVariants.length)]);
  }
  
  // Stats (smart detection)
  if (text.match(/\d+/) || text.includes('número') || text.includes('estatística') || 
      context.type === 'saas' || Math.random() > 0.6) {
    components.push('stats');
  }
  
  // Gallery for visual businesses
  if (text.includes('portfolio') || text.includes('galeria') || text.includes('trabalho') || 
      context.industry === 'barbershop' || context.type === 'portfolio' || Math.random() > 0.7) {
    components.push('gallery');
  }
  
  // Testimonials with variation
  if (text.includes('depoimento') || text.includes('cliente') || text.includes('avaliação') || 
      Math.random() > 0.4) {
    components.push(Math.random() > 0.5 ? 'testimonials1' : 'testimonials2');
  }
  
  // Pricing for SaaS or service businesses
  if (text.includes('preço') || text.includes('plano') || text.includes('valor') || 
      context.type === 'saas' || Math.random() > 0.6) {
    components.push('pricing');
  }
  
  // Team section
  if (text.includes('equipe') || text.includes('time') || text.includes('profissional') || 
      Math.random() > 0.7) {
    components.push('team');
  }
  
  // Shuffle middle components for variety (keep hero first, contact/cta last)
  if (components.length > 1) {
    const middle = components.slice(1);
    for (let i = middle.length - 1; i > 0; i--) {
      if (Math.random() > 0.5) {
        const j = Math.floor(Math.random() * (i + 1));
        [middle[i], middle[j]] = [middle[j], middle[i]];
      }
    }
    components.splice(1, middle.length, ...middle);
  }
  
  // CTA before contact
  components.push(Math.random() > 0.5 ? 'cta1' : 'cta2');
  
  // Contact form always at end
  components.push('contact');
  
  return components;
}

// ==================== MAIN COMPONENT ====================

const TestsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [siteTitle, setSiteTitle] = useState("");
  const [siteSubtitle, setSiteSubtitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [stylePreference, setStylePreference] = useState("modern");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [businessContext, setBusinessContext] = useState<BusinessContext | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI processing with context analysis
    setTimeout(() => {
      const context = analyzeContext(siteTitle, siteDescription);
      const components = selectComponentsAI(siteTitle, siteDescription, stylePreference, context);
      
      setBusinessContext(context);
      setSelectedComponents(components);
      setIsGenerating(false);
      
      // Scroll to preview
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1800);
  };

  const renderComponent = (componentName: string, index: number) => {
    if (!businessContext) return null;
    
    const props = {
      title: siteTitle,
      subtitle: siteSubtitle,
      primaryColor,
      context: businessContext,
    };

    switch (componentName) {
      case 'hero1': return <HeroComponent1 key={index} {...props} />;
      case 'hero2': return <HeroComponent2 key={index} {...props} />;
      case 'hero3': return <HeroComponent3 key={index} {...props} />;
      case 'features1': return <FeaturesComponent1 key={index} {...props} />;
      case 'features2': return <FeaturesComponent2 key={index} {...props} />;
      case 'features3': return <FeaturesComponent3 key={index} {...props} />;
      case 'services': return <ServicesComponent key={index} {...props} />;
      case 'testimonials1': return <TestimonialsComponent1 key={index} {...props} />;
      case 'testimonials2': return <TestimonialsComponent2 key={index} {...props} />;
      case 'cta1': return <CTAComponent1 key={index} {...props} />;
      case 'cta2': return <CTAComponent2 key={index} {...props} />;
      case 'stats': return <StatsComponent key={index} {...props} />;
      case 'pricing': return <PricingComponent key={index} {...props} />;
      case 'team': return <TeamComponent key={index} {...props} />;
      case 'gallery': return <GalleryComponent key={index} {...props} />;
      case 'contact': return <ContactFormComponent key={index} {...props} />;
      default: return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testes"
      className="relative py-24 md:py-32 lg:py-40 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-20">
            <h2
              ref={titleRef}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-white leading-[0.95] tracking-tight uppercase text-center"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Testes
            </h2>
            <p className="text-center text-white/60 text-xl mt-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Crie seu site personalizado em segundos. Nossa IA inteligente seleciona e organiza componentes com base nas suas preferências.
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-12 max-w-4xl mx-auto shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Título do Site
                </label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="ex: Minha Empresa Inovadora"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg text-gray-900 bg-white placeholder:text-gray-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={siteSubtitle}
                  onChange={(e) => setSiteSubtitle(e.target.value)}
                  placeholder="ex: Soluções digitais para o futuro"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg text-gray-900 bg-white placeholder:text-gray-400"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Descrição do Projeto
                </label>
                <textarea
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  placeholder="Ex: Quero um SaaS para gerenciar agendamentos de barbearia, com dashboard, controle de clientes e pagamentos. Preciso de pricing, depoimentos e galeria."
                  rows={5}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg text-gray-900 bg-white placeholder:text-gray-400 resize-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <p className="mt-2 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  💡 Dica: Quanto mais detalhes você fornecer, mais personalizado será o resultado!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Cor Principal
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-14 rounded-xl cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition text-base text-gray-900 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Estilo Visual
                  </label>
                  <select
                    value={stylePreference}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg text-gray-900 bg-white cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="modern">🚀 Moderno</option>
                    <option value="minimal">✨ Minimalista</option>
                    <option value="bold">🔥 Ousado</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!siteTitle || !siteDescription || isGenerating}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analisando e gerando seu site...
                  </span>
                ) : (
                  '🤖 Gerar Site com IA'
                )}
              </button>
            </div>
          </div>

          {/* Preview */}
          {selectedComponents.length > 0 && (
            <div ref={previewRef} className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gray-900 px-8 py-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-white/60 text-sm font-mono">
                  Preview do seu site
                </div>
              </div>
              
              <div className="max-h-[800px] overflow-y-auto">
                {selectedComponents.map((component, index) => renderComponent(component, index))}
                
                {/* Footer */}
                <footer className="py-12 px-8 bg-gray-900">
                  <div className="max-w-6xl mx-auto text-center">
                    <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                      © 2026 {siteTitle || "Seu Site"}. Todos os direitos reservados.
                    </p>
                  </div>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestsSection;

