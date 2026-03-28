# 📦 Instalação Manual do Banco de Dados

## ⚠️ Se o comando MySQL não funcionou no PowerShell

### Opção 1: Usar CMD (Prompt de Comando) ✅ RECOMENDADO

1. Abra o **Prompt de Comando** (CMD) como administrador
2. Navegue até a pasta do projeto:
   ```cmd
   cd C:\Users\wel\Downloads\portfolio
   ```
3. Execute:
   ```cmd
   mysql -u root -p < backend\database.sql
   ```
4. Digite sua senha MySQL quando solicitado

---

### Opção 2: Usar phpMyAdmin ✅ MAIS FÁCIL

1. Abra o **phpMyAdmin** no navegador:
   ```
   http://localhost/phpmyadmin
   ```

2. Clique em **"Novo"** ou **"New"** no menu lateral

3. Crie um novo banco de dados:
   - Nome: `portfolio_cms`
   - Collation: `utf8mb4_unicode_ci`
   - Clique em **"Criar"**

4. Selecione o banco `portfolio_cms` no menu lateral

5. Clique na aba **"Importar"** ou **"Import"**

6. Clique em **"Escolher arquivo"** ou **"Choose File"**

7. Selecione: `backend/database.sql`

8. Clique em **"Executar"** ou **"Go"**

9. ✅ Pronto! Banco criado com sucesso!

---

### Opção 3: Copiar e Colar no MySQL

1. Abra o arquivo `backend/database.sql`

2. Copie todo o conteúdo (Ctrl+A, Ctrl+C)

3. Abra o MySQL:
   ```cmd
   mysql -u root -p
   ```

4. Cole o conteúdo e pressione Enter

---

## ✅ Verificar se Funcionou

Após instalar, verifique se o banco foi criado:

```sql
mysql -u root -p
```

```sql
SHOW DATABASES;
USE portfolio_cms;
SHOW TABLES;
```

Você deve ver as tabelas:
- users
- hero_section
- about_section
- projects
- services
- testimonials
- faqs
- contact_info

---

## 🔐 Credenciais Padrão

Após instalar, você pode fazer login no painel admin:
- **Usuário:** `admin`
- **Senha:** `admin123`

⚠️ **Altere a senha após o primeiro login!**

