# 🚀 Guia de Integração CMS - Portfólio Wesley

## 📋 Visão Geral

Este guia mostra como integrar um CMS (Content Management System) ao seu portfólio React, permitindo que clientes editem conteúdo facilmente enquanto você fornece suporte técnico.

---

## 🎯 Opção 1: Strapi CMS (RECOMENDADO)

### ✅ Vantagens:
- ✅ Interface moderna e intuitiva (tipo WordPress)
- ✅ Gratuito e open-source
- ✅ API REST automática
- ✅ Fácil de usar para clientes
- ✅ Suporte a imagens, textos, relacionamentos
- ✅ Autenticação e permissões

### 📦 Instalação do Strapi

```bash
# 1. Criar novo projeto Strapi
npx create-strapi-app@latest portfolio-cms --quickstart

# 2. Acessar admin (http://localhost:1337/admin)
# Criar conta admin

# 3. Instalar no projeto React
npm install axios
```

### 🗂️ Estrutura de Conteúdo no Strapi

**Content Types a criar:**

1. **Hero Section**
   - `name` (Text)
   - `subtitle` (Text)
   - `photo` (Media)

2. **About Section**
   - `title` (Text)
   - `description1` (Rich Text)
   - `description2` (Rich Text)
   - `specialty` (Text)
   - `focus` (Text)
   - `photo` (Media)

3. **Projects** (Collection)
   - `title` (Text)
   - `subtitle` (Text)
   - `category` (Text)
   - `description` (Rich Text)
   - `url` (Text)
   - `year` (Text)
   - `tags` (JSON)
   - `previewImage` (Media)

4. **Services** (Collection)
   - `number` (Number)
   - `title` (Text)
   - `description` (Rich Text)
   - `icon` (Text)

5. **Testimonials** (Collection)
   - `name` (Text)
   - `role` (Text)
   - `company` (Text)
   - `text` (Rich Text)
   - `rating` (Number)

6. **FAQ** (Collection)
   - `question` (Text)
   - `answer` (Rich Text)
   - `order` (Number)

7. **Contact Info** (Single Type)
   - `whatsapp` (Text)
   - `email` (Text)
   - `instagram` (Text)
   - `github` (Text)
   - `linkedin` (Text)

### 🔐 Configurar Permissões

No Strapi Admin:
1. Settings → Users & Permissions Plugin → Roles
2. Public → Find, FindOne (ativar para todos os Content Types)
3. Authenticated → Create, Update, Delete (para clientes)

---

## 🎯 Opção 2: PHP + Admin Panel Customizado

### ✅ Vantagens:
- ✅ Controle total
- ✅ PHP familiar
- ✅ Banco de dados próprio

### 📁 Estrutura de Arquivos PHP

```
backend/
├── api/
│   ├── config.php          # Configuração DB
│   ├── get-content.php     # Buscar conteúdo
│   ├── update-content.php  # Atualizar conteúdo
│   └── upload-image.php    # Upload de imagens
├── admin/
│   ├── login.php           # Login
│   ├── dashboard.php       # Painel admin
│   └── edit-section.php    # Editar seções
└── database.sql            # Schema do banco
```

---

## 🔌 Integração no React

### 1. Criar Service de API

```typescript
// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:1337/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para buscar conteúdo
export const getHeroContent = () => api.get('/hero-section?populate=*');
export const getAboutContent = () => api.get('/about-section?populate=*');
export const getProjects = () => api.get('/projects?populate=*&sort=order:asc');
export const getServices = () => api.get('/services?populate=*&sort=number:asc');
export const getTestimonials = () => api.get('/testimonials?populate=*');
export const getFAQs = () => api.get('/faqs?populate=*&sort=order:asc');
export const getContactInfo = () => api.get('/contact-info?populate=*');
```

### 2. Criar Context para Gerenciar Conteúdo

```typescript
// src/contexts/ContentContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '@/services/api';

interface ContentContextType {
  hero: any;
  about: any;
  projects: any[];
  services: any[];
  testimonials: any[];
  faqs: any[];
  contact: any;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [hero, about, projects, services, testimonials, faqs, contact] = await Promise.all([
          api.getHeroContent(),
          api.getAboutContent(),
          api.getProjects(),
          api.getServices(),
          api.getTestimonials(),
          api.getFAQs(),
          api.getContactInfo(),
        ]);

        setContent({
          hero: hero.data.data,
          about: about.data.data,
          projects: projects.data.data,
          services: services.data.data,
          testimonials: testimonials.data.data,
          faqs: faqs.data.data,
          contact: contact.data.data,
        });
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ ...content, loading }}>
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
```

### 3. Atualizar Componentes para Usar CMS

```typescript
// Exemplo: HeroSection.tsx
import { useContent } from '@/contexts/ContentContext';

const HeroSection = () => {
  const { hero, loading } = useContent();

  if (loading) return <div>Carregando...</div>;

  return (
    <section>
      <h1>{hero?.name || 'Oi, eu sou WESLEY'}</h1>
      <p>{hero?.subtitle || 'Um web designer apaixonado...'}</p>
      <img src={hero?.photo?.url} alt={hero?.name} />
    </section>
  );
};
```

---

## 🚀 Deploy

### Strapi:
- **Hospedagem:** Railway, Render, ou DigitalOcean
- **Database:** PostgreSQL (recomendado) ou SQLite (dev)

### PHP:
- **Hospedagem:** Qualquer servidor com PHP 7.4+
- **Database:** MySQL/MariaDB

---

## 📝 Próximos Passos

1. Escolher entre Strapi ou PHP
2. Configurar ambiente de desenvolvimento
3. Criar Content Types / Database Schema
4. Integrar API no React
5. Testar edição de conteúdo
6. Deploy

---

## 🆘 Suporte

Para dúvidas sobre integração, consulte:
- [Strapi Docs](https://docs.strapi.io)
- [React Query](https://tanstack.com/query) (opcional, para cache)

