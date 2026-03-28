/**
 * EXEMPLO: Context para gerenciar conteúdo do CMS
 * 
 * INSTRUÇÕES:
 * 1. Renomeie para ContentContext.tsx
 * 2. Importe o service de API correto (Strapi ou PHP)
 * 3. Ajuste o mapeamento de dados conforme necessário
 * 4. Use nos componentes: const { hero, about } = useContent();
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { fetchAllContent } from '@/services/api'; // Descomente quando configurar

interface ContentContextType {
  hero: any;
  about: any;
  projects: any[];
  services: any[];
  testimonials: any[];
  faqs: any[];
  contact: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Descomente quando configurar a API:
      // const data = await fetchAllContent();
      // setContent(data);
      
      // Por enquanto, usar dados estáticos (fallback)
      setContent({
        hero: {
          name: 'WESLEY',
          subtitle: 'Um web designer apaixonado por criar projetos ousados e memoráveis',
        },
        about: {
          title: 'Sobre MIM',
          description1: 'Especializado em desenvolvimento front-end e design de interfaces...',
          description2: 'Cada projeto que desenvolvo é pensado para unir estética...',
          specialty: 'Web Design & Frontend',
          focus: 'Experiência do Usuário',
        },
        projects: [],
        services: [],
        testimonials: [],
        faqs: [],
        contact: {
          whatsapp: '5571991373142',
          email: 'devwesleysc@gmail.com',
          instagram: 'welziinho',
        },
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar conteúdo');
      console.error('Erro ao buscar conteúdo:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider 
      value={{ 
        ...content, 
        loading, 
        error,
        refetch: fetchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

