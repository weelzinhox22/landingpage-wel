# 📦 Como Instalar o Banco de Dados - Guia Completo

## ⚠️ Problema: MySQL não encontrado

Se você recebeu o erro `'mysql' não é reconhecido`, significa que o MySQL não está no PATH do Windows.

---

## ✅ SOLUÇÃO MAIS FÁCIL: Usar phpMyAdmin

### Passo 1: Abrir phpMyAdmin

1. Certifique-se de que seu servidor local está rodando (XAMPP, WAMP, Laragon, etc.)
2. Abra o navegador e acesse:
   ```
   http://localhost/phpmyadmin
   ```

### Passo 2: Criar o Banco de Dados

1. No phpMyAdmin, clique em **"Novo"** ou **"New"** no menu lateral esquerdo
2. Em **"Nome do banco de dados"**, digite: `portfolio_cms`
3. Em **"Intercalação"** ou **"Collation"**, selecione: `utf8mb4_unicode_ci`
4. Clique no botão **"Criar"** ou **"Create"**

### Passo 3: Importar o Arquivo SQL

1. No menu lateral, clique no banco `portfolio_cms` que você acabou de criar
2. Clique na aba **"Importar"** ou **"Import"** no topo
3. Clique no botão **"Escolher arquivo"** ou **"Choose File"**
4. Navegue até a pasta do projeto e selecione:
   ```
   backend/database.sql
   ```
5. Role para baixo e clique no botão **"Executar"** ou **"Go"**

### Passo 4: Verificar se Funcionou ✅

Você deve ver uma mensagem de sucesso e, no menu lateral, as seguintes tabelas:
- ✅ users
- ✅ hero_section
- ✅ about_section
- ✅ projects
- ✅ services
- ✅ testimonials
- ✅ faqs
- ✅ contact_info

---

## 🔧 ALTERNATIVA: Adicionar MySQL ao PATH (Avançado)

Se você quiser usar o comando `mysql` diretamente:

### Passo 1: Encontrar a Pasta do MySQL

Normalmente está em:
- XAMPP: `C:\xampp\mysql\bin`
- WAMP: `C:\wamp64\bin\mysql\mysql8.x.x\bin`
- Laragon: `C:\laragon\bin\mysql\mysql-x.x.x\bin`

### Passo 2: Adicionar ao PATH

1. Pressione `Win + R`
2. Digite: `sysdm.cpl` e pressione Enter
3. Vá na aba **"Avançado"**
4. Clique em **"Variáveis de Ambiente"**
5. Em **"Variáveis do sistema"**, encontre `Path`
6. Clique em **"Editar"**
7. Clique em **"Novo"**
8. Cole o caminho do MySQL (ex: `C:\xampp\mysql\bin`)
9. Clique em **"OK"** em todas as janelas
10. **Feche e reabra o CMD/PowerShell**

### Passo 3: Testar

```cmd
mysql --version
```

Se mostrar a versão, funcionou! Então execute:
```cmd
mysql -u root -p < backend\database.sql
```

---

## 📋 Resumo: O Que Você Precisa Fazer

**RECOMENDADO (Mais Fácil):**
1. ✅ Abrir phpMyAdmin: `http://localhost/phpmyadmin`
2. ✅ Criar banco: `portfolio_cms`
3. ✅ Importar: `backend/database.sql`
4. ✅ Pronto!

**ALTERNATIVA (Mais Trabalho):**
1. Adicionar MySQL ao PATH
2. Usar comando `mysql` no CMD

---

## ✅ Próximos Passos (Após Instalar)

1. **Configurar credenciais:**
   - Abra: `backend/api/config.php`
   - Ajuste: `DB_USER` e `DB_PASS`

2. **Acessar painel admin:**
   - URL: `http://localhost/backend/admin/login.php`
   - Usuário: `admin`
   - Senha: `admin123`

3. **Começar a usar!** 🎉

---

## 🆘 Precisa de Ajuda?

Se tiver problemas:
1. Verifique se o servidor local está rodando
2. Verifique se o MySQL está ativo
3. Tente usar phpMyAdmin (mais fácil)

