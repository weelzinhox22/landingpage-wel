<?php
/**
 * Gerenciar Projetos
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

// Deletar projeto
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    $success = 'Projeto deletado com sucesso!';
}

// Salvar projeto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['id']) && $_POST['id']) {
            // Update
            $stmt = $db->prepare("
                UPDATE projects 
                SET title = ?, subtitle = ?, category = ?, description = ?, 
                    url = ?, year = ?, tags = ?, preview_image_url = ?, display_order = ?
                WHERE id = ?
            ");
            $stmt->execute([
                $_POST['title'],
                $_POST['subtitle'] ?? '',
                $_POST['category'] ?? '',
                $_POST['description'] ?? '',
                $_POST['url'] ?? '',
                $_POST['year'] ?? date('Y'),
                json_encode(explode(',', $_POST['tags'] ?? '')),
                $_POST['preview_image_url'] ?? '',
                $_POST['display_order'] ?? 0,
                $_POST['id']
            ]);
            $success = 'Projeto atualizado com sucesso!';
        } else {
            // Insert
            $stmt = $db->prepare("
                INSERT INTO projects 
                (title, subtitle, category, description, url, year, tags, preview_image_url, display_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST['title'],
                $_POST['subtitle'] ?? '',
                $_POST['category'] ?? '',
                $_POST['description'] ?? '',
                $_POST['url'] ?? '',
                $_POST['year'] ?? date('Y'),
                json_encode(explode(',', $_POST['tags'] ?? '')),
                $_POST['preview_image_url'] ?? '',
                $_POST['display_order'] ?? 0
            ]);
            $success = 'Projeto adicionado com sucesso!';
        }
    } catch (Exception $e) {
        $error = 'Erro: ' . $e->getMessage();
    }
}

// Carregar projetos
$projects = $db->query("SELECT * FROM projects ORDER BY display_order ASC, id DESC")->fetchAll();

// Carregar projeto para edição
$editProject = null;
if (isset($_GET['edit'])) {
    $stmt = $db->prepare("SELECT * FROM projects WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $editProject = $stmt->fetch();
    if ($editProject && $editProject['tags']) {
        $editProject['tags'] = json_decode($editProject['tags'], true);
        $editProject['tags'] = is_array($editProject['tags']) ? implode(', ', $editProject['tags']) : '';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Projetos - Admin</title>
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
            <h1>💼 Gerenciar Projetos</h1>
            <a href="dashboard.php" class="btn btn-secondary">← Voltar</a>
        </div>

        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="form-container">
            <h2><?= $editProject ? '✏️ Editar Projeto' : '➕ Adicionar Novo Projeto' ?></h2>
            <form method="POST">
                <?php if ($editProject): ?>
                    <input type="hidden" name="id" value="<?= $editProject['id'] ?>">
                <?php endif; ?>
                
                <div class="form-group">
                    <label>Título *</label>
                    <input type="text" name="title" value="<?= htmlspecialchars($editProject['title'] ?? '') ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Subtítulo</label>
                    <input type="text" name="subtitle" value="<?= htmlspecialchars($editProject['subtitle'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Categoria</label>
                    <input type="text" name="category" value="<?= htmlspecialchars($editProject['category'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Descrição</label>
                    <textarea name="description"><?= htmlspecialchars($editProject['description'] ?? '') ?></textarea>
                </div>
                
                <div class="form-group">
                    <label>URL</label>
                    <input type="url" name="url" value="<?= htmlspecialchars($editProject['url'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Ano</label>
                    <input type="text" name="year" value="<?= htmlspecialchars($editProject['year'] ?? date('Y')) ?>">
                </div>
                
                <div class="form-group">
                    <label>Tags (separadas por vírgula)</label>
                    <input type="text" name="tags" value="<?= htmlspecialchars($editProject['tags'] ?? '') ?>" placeholder="React, TypeScript, Design">
                </div>
                
                <div class="form-group">
                    <label>URL da Imagem Preview</label>
                    <input type="url" name="preview_image_url" value="<?= htmlspecialchars($editProject['preview_image_url'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Ordem de Exibição</label>
                    <input type="number" name="display_order" value="<?= htmlspecialchars($editProject['display_order'] ?? 0) ?>">
                </div>
                
                <button type="submit" class="btn">💾 Salvar</button>
                <?php if ($editProject): ?>
                    <a href="edit-projects.php" class="btn btn-secondary">Cancelar</a>
                <?php endif; ?>
            </form>
        </div>

        <div class="list-container">
            <h2>📋 Lista de Projetos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Ano</th>
                        <th>Ordem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($projects as $project): ?>
                        <tr>
                            <td><?= $project['id'] ?></td>
                            <td><?= htmlspecialchars($project['title']) ?></td>
                            <td><?= htmlspecialchars($project['category']) ?></td>
                            <td><?= htmlspecialchars($project['year']) ?></td>
                            <td><?= $project['display_order'] ?></td>
                            <td>
                                <a href="?edit=<?= $project['id'] ?>" class="btn">Editar</a>
                                <a href="?delete=<?= $project['id'] ?>" class="btn btn-danger" onclick="return confirm('Tem certeza?')">Deletar</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

