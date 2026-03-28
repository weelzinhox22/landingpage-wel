
export type ProjectItem = {
  title: string;
  category: string;
  desc: string;
  image: string;
  year: string;
  accent: string;
  link?: string;
};

export const projects: ProjectItem[] = [
  {
    title: 'Júnialisson Costa Advocacia',
    category: 'Advocacia & Consultoria',
    desc: 'Identidade jurídica moderna com design sóbrio, foco em autoridade e conversão de clientes.',
    image: `https://s0.wp.com/mshots/v1/${encodeURIComponent('https://www.junialissoncosta.adv.br')}?w=1200&h=800`,
    year: '2024',
    accent: '#c0a062', // Gold/Premium tone
    link: 'https://www.junialissoncosta.adv.br',
  },
  {
    title: 'FeelGuide V2',
    category: 'App de Psicologia',
    desc: 'Aplicativo de testes psicológicos e avaliação comportamental, disponível na Google Play.',
    image: `https://s0.wp.com/mshots/v1/${encodeURIComponent('https://play.google.com/store/apps/details?id=com.valdirdpg.FeelGuideV2&hl=pt')}?w=1200&h=800`,
    year: '2024',
    accent: '#34d399', // Green/Androidish tone
    link: 'https://play.google.com/store/apps/details?id=com.valdirdpg.FeelGuideV2&hl=pt',
  },
  {
    title: 'Cássia Iglece',
    category: 'Direito de Família',
    desc: 'Escritório especializado em direito de família e sucessões, com foco em resolução humanizada de conflitos.',
    image: `https://s0.wp.com/mshots/v1/${encodeURIComponent('https://cassiaiglece.com.br')}?w=1200&h=800`,
    year: '2024',
    accent: '#d4b996', // Neutral/Elegant tone
    link: 'https://cassiaiglece.com.br',
  },
  {
    title: 'Portal Fisio',
    category: 'Educação',
    desc: 'Plataforma acadêmica completa com gestão de conteúdo, área do aluno e performance otimizada.',
    image: `https://s0.wp.com/mshots/v1/${encodeURIComponent('https://portalfisio.vercel.app')}?w=1200&h=800`,
    year: '2023',
    accent: '#60a5fa', // Blue/Education tone
    link: 'https://portalfisio.vercel.app',
  },
  {
    title: 'Fisioneo',
    category: 'Fisioterapia Neonatal',
    desc: 'Portal de conteúdo especializado em fisioterapia neonatal e pediátrica, com artigos e materiais educativos.',
    image: `https://s0.wp.com/mshots/v1/${encodeURIComponent('https://fisioneo.vercel.app')}?w=1200&h=800`,
    year: '2023',
    accent: '#2dd4bf', // Teal/Health tone
    link: 'https://fisioneo.vercel.app',
  },
];
