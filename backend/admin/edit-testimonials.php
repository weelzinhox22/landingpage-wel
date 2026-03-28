<?php
/**
 * Gerenciar Depoimentos
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

require_once '../api/config.php';
$db = getDB();

$success = '';
$error = '';

// Deletar depoimento
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    $success = 'Depoimento deletado com sucesso!';
}

// Salvar depoimento
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['id']) && $_POST['id']) {
            // Update
            $stmt = $db->prepare("
                UPDATE testimonials 
                SET name = ?, role = ?, company = ?, text = ?, rating = ?, display_order = ?
                WHERE id = ?
            ");
            $stmt->execute([
                $_POST['name'],
                $_POST['role'] ?? '',
                $_POST['company'] ?? '',
                $_POST['text'],
                $_POST['rating'] ?? 5,
                $_POST['display_order'] ?? 0,
                $_POST['id']
            ]);
            $success = 'Depoimento atualizado com sucesso!';
        } else {
            // Insert
            $stmt = $db->prepare("
                INSERT INTO testimonials 
                (name, role, company, text, rating, display_order)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST['name'],
                $_POST['role'] ?? '',
                $_POST['company'] ?? '',
                $_POST['text'],
                $_POST['rating'] ?? 5,
                $_POST['display_order'] ?? 0
            ]);
            $success = 'Depoimento adicionado com sucesso!';
        }
    } catch (Exception $e) {
        $error = 'Erro: ' . $e->getMessage();
    }
}

// Carregar depoimentos
$testimonials = $db->query("SELECT * FROM testimonials ORDER BY display_order ASC, id DESC")->fetchAll();

// Carregar depoimento para edição
$editTestimonial = null;
if (isset($_GET['edit'])) {
    $stmt = $db->prepare("SELECT * FROM testimonials WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $editTestimonial = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Depoimentos - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-container, .list-container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        h1 { color: #333; margin-bottom: 10px; }
        h2 { color: #333; margin-bottom: 20px; }
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
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
        }
        .btn-danger {
            background: #dc3545;
        }
        .btn-secondary {
            background: #666;
            margin-left: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .alert {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .alert-success {
            background: #d4edda;
            color: #155724;
        }
        .alert-error {
            background: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💬 Gerenciar Depoimentos</h1>
            <a href="dashboard.php" class="btn btn-secondary">← Voltar</a>
        </div>

        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="form-container">
            <h2><?= $editTestimonial ? '✏️ Editar Depoimento' : '➕ Adicionar Novo Depoimento' ?></h2>
            <form method="POST">
                <?php if ($editTestimonial): ?>
                    <input type="hidden" name="id" value="<?= $editTestimonial['id'] ?>">
                <?php endif; ?>
                
                <div class="form-group">
                    <label>Nome *</label>
                    <input type="text" name="name" value="<?= htmlspecialchars($editTestimonial['name'] ?? '') ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Cargo</label>
                    <input type="text" name="role" value="<?= htmlspecialchars($editTestimonial['role'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Empresa</label>
                    <input type="text" name="company" value="<?= htmlspecialchars($editTestimonial['company'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Depoimento *</label>
                    <textarea name="text" required><?= htmlspecialchars($editTestimonial['text'] ?? '') ?></textarea>
                </div>
                
                <div class="form-group">
                    <label>Avaliação (1-5)</label>
                    <input type="number" name="rating" min="1" max="5" value="<?= htmlspecialchars($editTestimonial['rating'] ?? 5) ?>">
                </div>
                
                <div class="form-group">
                    <label>Ordem de Exibição</label>
                    <input type="number" name="display_order" value="<?= htmlspecialchars($editTestimonial['display_order'] ?? 0) ?>">
                </div>
                
                <button type="submit" class="btn">💾 Salvar</button>
                <?php if ($editTestimonial): ?>
                    <a href="edit-testimonials.php" class="btn btn-secondary">Cancelar</a>
                <?php endif; ?>
            </form>
        </div>

        <div class="list-container">
            <h2>📋 Lista de Depoimentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Empresa</th>
                        <th>Avaliação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($testimonials as $testimonial): ?>
                        <tr>
                            <td><?= htmlspecialchars($testimonial['name']) ?></td>
                            <td><?= htmlspecialchars($testimonial['role']) ?></td>
                            <td><?= htmlspecialchars($testimonial['company']) ?></td>
                            <td><?= $testimonial['rating'] ?> ⭐</td>
                            <td>
                                <a href="?edit=<?= $testimonial['id'] ?>" class="btn">Editar</a>
                                <a href="?delete=<?= $testimonial['id'] ?>" class="btn btn-danger" onclick="return confirm('Tem certeza?')">Deletar</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

