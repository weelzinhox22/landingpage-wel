<?php
/**
 * Editar seções simples (Hero, About, Contact)
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

require_once '../api/config.php';
$db = getDB();

$section = $_GET['section'] ?? 'hero';
$success = '';
$error = '';

// Carregar dados existentes
$data = [];
if ($section === 'hero') {
    $stmt = $db->query("SELECT * FROM hero_section LIMIT 1");
    $data = $stmt->fetch() ?: ['name' => 'WESLEY', 'subtitle' => '', 'photo_url' => ''];
} elseif ($section === 'about') {
    $stmt = $db->query("SELECT * FROM about_section LIMIT 1");
    $data = $stmt->fetch() ?: ['title' => 'Sobre MIM', 'description1' => '', 'description2' => '', 'specialty' => '', 'focus' => '', 'photo_url' => ''];
} elseif ($section === 'contact') {
    $stmt = $db->query("SELECT * FROM contact_info LIMIT 1");
    $data = $stmt->fetch() ?: ['whatsapp' => '', 'email' => '', 'instagram' => '', 'github' => '', 'linkedin' => ''];
}

// Salvar dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if ($section === 'hero') {
            $stmt = $db->prepare("UPDATE hero_section SET name = ?, subtitle = ?, photo_url = ? WHERE id = 1");
            $stmt->execute([
                $_POST['name'] ?? '',
                $_POST['subtitle'] ?? '',
                $_POST['photo_url'] ?? ''
            ]);
        } elseif ($section === 'about') {
            $stmt = $db->prepare("UPDATE about_section SET title = ?, description1 = ?, description2 = ?, specialty = ?, focus = ?, photo_url = ? WHERE id = 1");
            $stmt->execute([
                $_POST['title'] ?? '',
                $_POST['description1'] ?? '',
                $_POST['description2'] ?? '',
                $_POST['specialty'] ?? '',
                $_POST['focus'] ?? '',
                $_POST['photo_url'] ?? ''
            ]);
        } elseif ($section === 'contact') {
            $stmt = $db->prepare("UPDATE contact_info SET whatsapp = ?, email = ?, instagram = ?, github = ?, linkedin = ? WHERE id = 1");
            $stmt->execute([
                $_POST['whatsapp'] ?? '',
                $_POST['email'] ?? '',
                $_POST['instagram'] ?? '',
                $_POST['github'] ?? '',
                $_POST['linkedin'] ?? ''
            ]);
        }
        $success = 'Dados salvos com sucesso!';
        // Recarregar dados
        if ($section === 'hero') {
            $stmt = $db->query("SELECT * FROM hero_section LIMIT 1");
            $data = $stmt->fetch();
        } elseif ($section === 'about') {
            $stmt = $db->query("SELECT * FROM about_section LIMIT 1");
            $data = $stmt->fetch();
        } elseif ($section === 'contact') {
            $stmt = $db->query("SELECT * FROM contact_info LIMIT 1");
            $data = $stmt->fetch();
        }
    } catch (Exception $e) {
        $error = 'Erro ao salvar: ' . $e->getMessage();
    }
}

$titles = [
    'hero' => 'Hero Section',
    'about' => 'Sobre Mim',
    'contact' => 'Informações de Contato'
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar <?= $titles[$section] ?> - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            margin-bottom: 30px;
            color: #333;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            font-family: inherit;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            opacity: 0.9;
        }
        .btn-secondary {
            background: #666;
            margin-left: 10px;
        }
        .alert {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .alert-success {
            background: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }
        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>✏️ Editar <?= $titles[$section] ?></h1>
        
        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST">
            <?php if ($section === 'hero'): ?>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" name="name" value="<?= htmlspecialchars($data['name'] ?? '') ?>" required>
                </div>
                <div class="form-group">
                    <label>Subtítulo</label>
                    <textarea name="subtitle"><?= htmlspecialchars($data['subtitle'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label>URL da Foto</label>
                    <input type="text" name="photo_url" value="<?= htmlspecialchars($data['photo_url'] ?? '') ?>" placeholder="https://...">
                </div>

            <?php elseif ($section === 'about'): ?>
                <div class="form-group">
                    <label>Título</label>
                    <input type="text" name="title" value="<?= htmlspecialchars($data['title'] ?? '') ?>" required>
                </div>
                <div class="form-group">
                    <label>Descrição 1</label>
                    <textarea name="description1"><?= htmlspecialchars($data['description1'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label>Descrição 2</label>
                    <textarea name="description2"><?= htmlspecialchars($data['description2'] ?? '') ?></textarea>
                </div>
                <div class="form-group">
                    <label>Especialidade</label>
                    <input type="text" name="specialty" value="<?= htmlspecialchars($data['specialty'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>Foco</label>
                    <input type="text" name="focus" value="<?= htmlspecialchars($data['focus'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>URL da Foto</label>
                    <input type="text" name="photo_url" value="<?= htmlspecialchars($data['photo_url'] ?? '') ?>" placeholder="https://...">
                </div>

            <?php elseif ($section === 'contact'): ?>
                <div class="form-group">
                    <label>WhatsApp (apenas números, ex: 5571991373142)</label>
                    <input type="text" name="whatsapp" value="<?= htmlspecialchars($data['whatsapp'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value="<?= htmlspecialchars($data['email'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>Instagram</label>
                    <input type="text" name="instagram" value="<?= htmlspecialchars($data['instagram'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" name="github" value="<?= htmlspecialchars($data['github'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label>LinkedIn URL</label>
                    <input type="url" name="linkedin" value="<?= htmlspecialchars($data['linkedin'] ?? '') ?>">
                </div>
            <?php endif; ?>

            <div style="margin-top: 30px;">
                <button type="submit" class="btn">💾 Salvar Alterações</button>
                <a href="dashboard.php" class="btn btn-secondary">← Voltar</a>
            </div>
        </form>
    </div>
</body>
</html>

