<?php
/**
 * Gerenciar Serviços
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

// Deletar serviço
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM services WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    $success = 'Serviço deletado com sucesso!';
}

// Salvar serviço
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['id']) && $_POST['id']) {
            // Update
            $stmt = $db->prepare("
                UPDATE services 
                SET number = ?, title = ?, description = ?, icon = ?, preview_content = ?, display_order = ?
                WHERE id = ?
            ");
            $stmt->execute([
                $_POST['number'],
                $_POST['title'],
                $_POST['description'] ?? '',
                $_POST['icon'] ?? '',
                $_POST['preview_content'] ?? '',
                $_POST['display_order'] ?? 0,
                $_POST['id']
            ]);
            $success = 'Serviço atualizado com sucesso!';
        } else {
            // Insert
            $stmt = $db->prepare("
                INSERT INTO services 
                (number, title, description, icon, preview_content, display_order)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST['number'],
                $_POST['title'],
                $_POST['description'] ?? '',
                $_POST['icon'] ?? '',
                $_POST['preview_content'] ?? '',
                $_POST['display_order'] ?? 0
            ]);
            $success = 'Serviço adicionado com sucesso!';
        }
    } catch (Exception $e) {
        $error = 'Erro: ' . $e->getMessage();
    }
}

// Carregar serviços
$services = $db->query("SELECT * FROM services ORDER BY display_order ASC, number ASC")->fetchAll();

// Carregar serviço para edição
$editService = null;
if (isset($_GET['edit'])) {
    $stmt = $db->prepare("SELECT * FROM services WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $editService = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Serviços - Admin</title>
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
            <h1>🛠️ Gerenciar Serviços</h1>
            <a href="dashboard.php" class="btn btn-secondary">← Voltar</a>
        </div>

        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="form-container">
            <h2><?= $editService ? '✏️ Editar Serviço' : '➕ Adicionar Novo Serviço' ?></h2>
            <form method="POST">
                <?php if ($editService): ?>
                    <input type="hidden" name="id" value="<?= $editService['id'] ?>">
                <?php endif; ?>
                
                <div class="form-group">
                    <label>Número *</label>
                    <input type="number" name="number" value="<?= htmlspecialchars($editService['number'] ?? '') ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Título *</label>
                    <input type="text" name="title" value="<?= htmlspecialchars($editService['title'] ?? '') ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Descrição</label>
                    <textarea name="description"><?= htmlspecialchars($editService['description'] ?? '') ?></textarea>
                </div>
                
                <div class="form-group">
                    <label>Ícone (nome do ícone, ex: Code, Palette)</label>
                    <input type="text" name="icon" value="<?= htmlspecialchars($editService['icon'] ?? '') ?>">
                </div>
                
                <div class="form-group">
                    <label>Preview Content (HTML do preview)</label>
                    <textarea name="preview_content" style="min-height: 200px;"><?= htmlspecialchars($editService['preview_content'] ?? '') ?></textarea>
                </div>
                
                <div class="form-group">
                    <label>Ordem de Exibição</label>
                    <input type="number" name="display_order" value="<?= htmlspecialchars($editService['display_order'] ?? 0) ?>">
                </div>
                
                <button type="submit" class="btn">💾 Salvar</button>
                <?php if ($editService): ?>
                    <a href="edit-services.php" class="btn btn-secondary">Cancelar</a>
                <?php endif; ?>
            </form>
        </div>

        <div class="list-container">
            <h2>📋 Lista de Serviços</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Título</th>
                        <th>Ordem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($services as $service): ?>
                        <tr>
                            <td><?= $service['number'] ?></td>
                            <td><?= htmlspecialchars($service['title']) ?></td>
                            <td><?= $service['display_order'] ?></td>
                            <td>
                                <a href="?edit=<?= $service['id'] ?>" class="btn">Editar</a>
                                <a href="?delete=<?= $service['id'] ?>" class="btn btn-danger" onclick="return confirm('Tem certeza?')">Deletar</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

