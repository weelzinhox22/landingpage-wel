# 🔌 Guia de Integração CMS - Passo a Passo

## 🎯 Escolha sua Solução

### Opção A: Strapi (Mais Fácil) ⭐ RECOMENDADO
- Interface visual tipo WordPress
- Setup rápido (5 minutos)
- Gratuito
- **Arquivo:** `CMS_SETUP.md`

### Opção B: PHP + Admin Panel (Mais Controle)
- Backend PHP customizado
- Banco MySQL
- Painel admin próprio
- **Arquivos:** `backend/` + este guia

---

## 📦 Opção A: Strapi - Setup Rápido

### 1. Instalar Strapi

```bash
# Criar projeto Strapi
npx create-strapi-app@latest portfolio-cms --quickstart

# Aguardar instalação (pode demorar 2-3 minutos)
# Abrir http://localhost:1337/admin
# Criar conta admin
```

### 2. Criar Content Types

No Strapi Admin:

**Hero Section** (Single Type):
- `name` (Text, Short text)
- `subtitle` (Text, Long text)
- `photo` (Media, Single media)

**About Section** (Single Type):
- `title` (Text)
- `description1` (Rich text)
- `description2` (Rich text)
- `specialty` (Text)
- `focus` (Text)
- `photo` (Media)

**Projects** (Collection Type):
- `title` (Text)
- `subtitle` (Text)
- `category` (Text)
- `description` (Rich text)
- `url` (Text)
- `year` (Text)
- `tags` (JSON)
- `previewImage` (Media)
- `displayOrder` (Number)

**Services** (Collection Type):
- `number` (Number)
- `title` (Text)
- `description` (Rich text)
- `icon` (Text)
- `previewContent` (Rich text)
- `displayOrder` (Number)

**Testimonials** (Collection Type):
- `name` (Text)
- `role` (Text)
- `company` (Text)
- `text` (Rich text)
- `rating` (Number)
- `displayOrder` (Number)

**FAQs** (Collection Type):
- `question` (Text)
- `answer` (Rich text)
- `displayOrder` (Number)
- `isOpen` (Boolean)

**Contact Info** (Single Type):
- `whatsapp` (Text)
- `email` (Email)
- `instagram` (Text)
- `github` (Text)
- `linkedin` (Text)

### 3. Configurar Permissões

Settings → Users & Permissions → Roles → Public:
- ✅ Find
- ✅ FindOne

(Ativar para TODOS os Content Types)

### 4. Instalar Axios no React

```bash
npm install axios
```

### 5. Criar Service de API

Criar arquivo `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getHeroContent = () => 
  api.get('/hero-section?populate=*');

export const getAboutContent = () => 
  api.get('/about-section?populate=*');

export const getProjects = () => 
  api.get('/projects?populate=*&sort=displayOrder:asc');

export const getServices = () => 
  api.get('/services?populate=*&sort=displayOrder:asc');

export const getTestimonials = () => 
  api.get('/testimonials?populate=*&sort=displayOrder:asc');

export const getFAQs = () => 
  api.get('/faqs?populate=*&sort=displayOrder:asc');

export const getContactInfo = () => 
  api.get('/contact-info?populate=*');
```

### 6. Criar .env

```env
VITE_STRAPI_URL=http://localhost:1337/api
```

---

## 📦 Opção B: PHP - Setup Completo

### 1. Configurar Banco de Dados

```bash
# Importar schema
mysql -u root -p < backend/database.sql
```

### 2. Configurar Credenciais

Editar `backend/api/config.php`:
```php
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

### 3. Colocar Backend no Servidor

- Upload da pasta `backend/` para seu servidor
- Configurar URL base (ex: `https://api.seudominio.com`)

### 4. Instalar Axios no React

```bash
npm install axios
```

### 5. Criar Service de API

Criar `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost/backend/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getContent = (section: string) => 
  api.get(`/get-content.php?section=${section}`);
```

### 6. Criar .env

```env
VITE_API_URL=https://api.seudominio.com
```

---

## 🔄 Próximos Passos

1. ✅ Escolher Strapi ou PHP
2. ✅ Configurar ambiente
3. ✅ Criar Content Types / Database
4. ✅ Integrar API no React (ver `CMS_SETUP.md`)
5. ✅ Testar edição de conteúdo
6. ✅ Deploy

---

## 🆘 Dúvidas?

- **Strapi:** [docs.strapi.io](https://docs.strapi.io)
- **PHP:** Ver arquivos em `backend/`
- **React Integration:** Ver `CMS_SETUP.md`

