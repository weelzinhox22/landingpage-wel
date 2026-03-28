# ⚡ Setup Rápido - Backend PHP

## 🚀 Passo a Passo (5 minutos)

### 1️⃣ Configurar Banco de Dados

```bash
# Opção A: Via linha de comando
mysql -u root -p < backend/database.sql

# Opção B: Via phpMyAdmin
# 1. Abrir phpMyAdmin
# 2. Criar banco: portfolio_cms
# 3. Importar: backend/database.sql
```

### 2️⃣ Configurar Credenciais

Edite o arquivo `backend/api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolio_cms');
define('DB_USER', 'root');        // Seu usuário MySQL
define('DB_PASS', '');            // Sua senha MySQL
```

### 3️⃣ Acessar Painel Admin

Abra no navegador:
```
http://localhost/backend/admin/login.php
```

**Login padrão:**
- Usuário: `admin`
- Senha: `admin123`

### 4️⃣ Começar a Usar! 🎉

Agora você pode:
- ✅ Editar Hero Section
- ✅ Editar Sobre Mim
- ✅ Adicionar/Editar Projetos
- ✅ Gerenciar Serviços
- ✅ Adicionar Depoimentos
- ✅ Criar FAQs
- ✅ Atualizar Contato

---

## 📁 Onde Está Tudo?

```
backend/
├── admin/              ← Painel admin (aqui você edita)
│   ├── login.php      ← Login
│   ├── dashboard.php  ← Dashboard principal
│   └── edit-*.php     ← Páginas de edição
├── api/               ← API (React usa isso)
│   └── get-content.php
└── database.sql       ← Schema do banco
```

---

## 🔌 Integrar com React

Depois de configurar o PHP, veja `INTEGRATION_GUIDE.md` para conectar com o React.

---

## ✅ Checklist

- [ ] Banco de dados criado
- [ ] Credenciais configuradas
- [ ] Login funcionando
- [ ] Conteúdo adicionado
- [ ] API testada

---

**Pronto! Agora você tem um CMS completo em PHP!** 🎊

