/**
 * EXEMPLO: Service de API para integração com CMS
 * 
 * INSTRUÇÕES:
 * 1. Escolha entre Strapi ou PHP
 * 2. Renomeie este arquivo para api.ts
 * 3. Configure a URL no .env
 * 4. Descomente a opção escolhida
 */

import axios from 'axios';

// ============================================
// OPÇÃO 1: STRAPI CMS
// ============================================
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export const strapiApi = axios.create({
  baseURL: STRAPI_URL,
});

export const getHeroContent = () => 
  strapiApi.get('/hero-section?populate=*');

export const getAboutContent = () => 
  strapiApi.get('/about-section?populate=*');

export const getProjects = () => 
  strapiApi.get('/projects?populate=*&sort=displayOrder:asc');

export const getServices = () => 
  strapiApi.get('/services?populate=*&sort=displayOrder:asc');

export const getTestimonials = () => 
  strapiApi.get('/testimonials?populate=*&sort=displayOrder:asc');

export const getFAQs = () => 
  strapiApi.get('/faqs?populate=*&sort=displayOrder:asc');

export const getContactInfo = () => 
  strapiApi.get('/contact-info?populate=*');

// ============================================
// OPÇÃO 2: PHP BACKEND
// ============================================
/*
const PHP_API_URL = import.meta.env.VITE_API_URL || 'http://localhost/backend/api';

export const phpApi = axios.create({
  baseURL: PHP_API_URL,
});

export const getHeroContent = () => 
  phpApi.get('/get-content.php?section=hero');

export const getAboutContent = () => 
  phpApi.get('/get-content.php?section=about');

export const getProjects = () => 
  phpApi.get('/get-content.php?section=projects');

export const getServices = () => 
  phpApi.get('/get-content.php?section=services');

export const getTestimonials = () => 
  phpApi.get('/get-content.php?section=testimonials');

export const getFAQs = () => 
  phpApi.get('/get-content.php?section=faqs');

export const getContactInfo = () => 
  phpApi.get('/get-content.php?section=contact');
*/

// ============================================
// FUNÇÃO UNIFICADA (Usar depois de configurar)
// ============================================
export const fetchAllContent = async () => {
  try {
    const [hero, about, projects, services, testimonials, faqs, contact] = await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getProjects(),
      getServices(),
      getTestimonials(),
      getFAQs(),
      getContactInfo(),
    ]);

    return {
      hero: hero.data.data || hero.data.data?.attributes,
      about: about.data.data || about.data.data?.attributes,
      projects: projects.data.data || projects.data,
      services: services.data.data || services.data.data,
      testimonials: testimonials.data.data || testimonials.data.data,
      faqs: faqs.data.data || faqs.data.data,
      contact: contact.data.data || contact.data.data?.attributes,
    };
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    throw error;
  }
};

