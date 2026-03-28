# 🚀 Quick Start - Integração CMS

## ⚡ Setup Rápido (5 minutos)

### Passo 1: Escolher Solução

**Recomendado:** Strapi (mais fácil)
**Alternativa:** PHP (mais controle)

---

## 🎯 Opção A: Strapi (Recomendado)

### 1. Instalar Strapi
```bash
npx create-strapi-app@latest portfolio-cms --quickstart
```

### 2. Acessar Admin
```
http://localhost:1337/admin
```
Criar conta admin

### 3. Criar Content Types
Seguir guia em `CMS_SETUP.md`

### 4. Configurar React
```bash
# Instalar axios
npm install axios

# Criar .env
echo "VITE_STRAPI_URL=http://localhost:1337/api" > .env

# Copiar exemplo de API
cp src/services/api.example.ts src/services/api.ts
```

### 5. Usar nos Componentes
```typescript
import { useContent } from '@/contexts/ContentContext';

const HeroSection = () => {
  const { hero, loading } = useContent();
  
  if (loading) return <div>Carregando...</div>;
  
  return <h1>{hero?.name || 'WESLEY'}</h1>;
};
```

---

## 🎯 Opção B: PHP

### 1. Configurar Banco
```bash
mysql -u root -p < backend/database.sql
```

### 2. Configurar Credenciais
Editar `backend/api/config.php`

### 3. Configurar React
```bash
# Instalar axios
npm install axios

# Criar .env
echo "VITE_API_URL=http://localhost/backend/api" > .env

# Copiar exemplo de API
cp src/services/api.example.ts src/services/api.ts
# Descomentar seção PHP
```

---

## 📚 Documentação Completa

- **Setup Detalhado:** `CMS_SETUP.md`
- **Guia de Integração:** `INTEGRATION_GUIDE.md`
- **Backend PHP:** `backend/`

---

## ✅ Checklist

- [ ] Escolher Strapi ou PHP
- [ ] Configurar ambiente (Strapi ou MySQL)
- [ ] Criar Content Types / Database
- [ ] Configurar API no React
- [ ] Testar busca de conteúdo
- [ ] Atualizar componentes para usar CMS
- [ ] Deploy

---

## 🆘 Problemas?

1. **Strapi não inicia:** Verificar Node.js 18+
2. **API não conecta:** Verificar CORS e URL
3. **Dados não aparecem:** Verificar permissões no Strapi

---

**Próximo passo:** Ler `INTEGRATION_GUIDE.md` para detalhes completos!

