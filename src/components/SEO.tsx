import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  noindex?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'Studio Oryon',
  noindex = false
}: SEOProps) => {
  const siteUrl = 'https://studiooryon.com';
  
  // 2. METADADOS ESTRATÉGICOS (Conteúdo Padrão)
  const defaultTitle = 'Studio Oryon | Desenvolvimento Web de Alto Padrão';
  const defaultDescription = 'Estratégia, Design e Tecnologia. Criamos sites e landing pages de alta conversão para advogados e profissionais que buscam autoridade digital. Sediados em São Paulo.';
  const defaultKeywords = 'Desenvolvimento Web, Web Design Premium, Criação de Sites para Advogados, Landing Page Alta Conversão, Studio Oryon, São Paulo, SEO Técnico';
  const defaultImage = `${siteUrl}/assets/logo.png`; // Fallback para logo enquanto preview-share.jpg não existe
  
  const finalTitle = title ? `${title} | Studio Oryon` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const finalUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  // 4. A "ARMA SECRETA": JSON-LD (Structured Data)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Alterado de Organization para ProfessionalService
    "name": "Studio Oryon",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/logo.png`,
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-95582-1293",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://instagram.com/studiooryon",
      "https://github.com/studiooryon",
      "https://linkedin.com/company/studiooryon"
    ],
    "priceRange": "$$$" // Opcional para ProfessionalService, mas bom para SEO local
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="theme-color" content="#020525" /> {/* Mantendo a cor escura do brand book */}
      
      {/* 5. CANONICAL TAG */}
      <link rel="canonical" href={finalUrl} />

      {/* 3. SOCIAL MEDIA OPTIMIZATION (Open Graph & Twitter Cards) */}
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Studio Oryon" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@StudioOryon" />
      <meta name="twitter:creator" content="@StudioOryon" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;
