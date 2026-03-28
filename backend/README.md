# 🚀 Backend PHP - Sistema de Gerenciamento de Conteúdo

## 📋 Instalação Rápida

### 1. Configurar Banco de Dados

```bash
# Importar schema
mysql -u root -p < database.sql
```

Ou execute o SQL manualmente no phpMyAdmin/MySQL.

### 2. Configurar Credenciais

Edite `api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolio_cms');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

### 3. Acessar Painel Admin

```
http://localhost/backend/admin/login.php
```

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `admin123`

⚠️ **IMPORTANTE:** Altere a senha após o primeiro login!

---

## 📁 Estrutura de Arquivos

```
backend/
├── admin/              # Painel administrativo
│   ├── login.php      # Página de login
│   ├── dashboard.php  # Dashboard principal
│   ├── logout.php      # Logout
│   ├── edit-section.php    # Editar Hero/About/Contact
│   ├── edit-projects.php   # Gerenciar projetos
│   ├── edit-services.php   # Gerenciar serviços
│   ├── edit-testimonials.php # Gerenciar depoimentos
│   └── edit-faqs.php       # Gerenciar FAQs
├── api/               # API REST
│   ├── config.php     # Configuração DB
│   ├── get-content.php    # Buscar conteúdo
│   └── update-content.php # Atualizar conteúdo
├── database.sql       # Schema do banco
└── README.md          # Este arquivo
```

---

## 🔌 API Endpoints

### GET `/api/get-content.php?section=hero`
Retorna conteúdo da seção especificada.

**Seções disponíveis:**
- `hero` - Hero Section
- `about` - Sobre Mim
- `projects` - Projetos
- `services` - Serviços
- `testimonials` - Depoimentos
- `faqs` - FAQs
- `contact` - Contato
- `all` - Tudo de uma vez

**Exemplo:**
```bash
curl http://localhost/backend/api/get-content.php?section=hero
```

**Resposta:**
```json
{
  "data": {
    "id": 1,
    "name": "WESLEY",
    "subtitle": "Um web designer...",
    "photo_url": "..."
  }
}
```

---

## 🔐 Segurança

- ✅ Senhas hasheadas com `password_hash()`
- ✅ Prepared statements (SQL injection protection)
- ✅ Session-based authentication
- ✅ CORS configurado para React

---

## 🛠️ Funcionalidades

### ✅ Painel Admin Completo
- Login seguro
- Dashboard com estatísticas
- Edição de todas as seções
- Gerenciamento CRUD completo

### ✅ Seções Editáveis
- Hero Section
- Sobre Mim
- Projetos (adicionar/editar/deletar)
- Serviços (adicionar/editar/deletar)
- Depoimentos (adicionar/editar/deletar)
- FAQs (adicionar/editar/deletar)
- Informações de Contato

---

## 📝 Próximos Passos

1. ✅ Configurar banco de dados
2. ✅ Ajustar credenciais em `config.php`
3. ✅ Acessar painel admin
4. ✅ Adicionar conteúdo inicial
5. ✅ Integrar API no React (ver `INTEGRATION_GUIDE.md`)

---

## 🆘 Problemas Comuns

**Erro de conexão com banco:**
- Verificar credenciais em `config.php`
- Verificar se MySQL está rodando
- Verificar se o banco `portfolio_cms` existe

**Página em branco:**
- Verificar logs de erro do PHP
- Verificar permissões de arquivo
- Verificar se todas as dependências estão instaladas

**Login não funciona:**
- Verificar se o usuário admin foi criado
- Verificar hash da senha no banco
- Limpar cookies/session

---

## 🔗 Integração com React

Ver `INTEGRATION_GUIDE.md` para instruções completas de integração com o frontend React.

