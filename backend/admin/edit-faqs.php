<?php
/**
 * Gerenciar FAQs
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

// Deletar FAQ
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM faqs WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    $success = 'FAQ deletado com sucesso!';
}

// Salvar FAQ
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['id']) && $_POST['id']) {
            // Update
            $stmt = $db->prepare("
                UPDATE faqs 
                SET question = ?, answer = ?, display_order = ?, is_open = ?
                WHERE id = ?
            ");
            $stmt->execute([
                $_POST['question'],
                $_POST['answer'],
                $_POST['display_order'] ?? 0,
                isset($_POST['is_open']) ? 1 : 0,
                $_POST['id']
            ]);
            $success = 'FAQ atualizado com sucesso!';
        } else {
            // Insert
            $stmt = $db->prepare("
                INSERT INTO faqs 
                (question, answer, display_order, is_open)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([
                $_POST['question'],
                $_POST['answer'],
                $_POST['display_order'] ?? 0,
                isset($_POST['is_open']) ? 1 : 0
            ]);
            $success = 'FAQ adicionado com sucesso!';
        }
    } catch (Exception $e) {
        $error = 'Erro: ' . $e->getMessage();
    }
}

// Carregar FAQs
$faqs = $db->query("SELECT * FROM faqs ORDER BY display_order ASC, id ASC")->fetchAll();

// Carregar FAQ para edição
$editFAQ = null;
if (isset($_GET['edit'])) {
    $stmt = $db->prepare("SELECT * FROM faqs WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $editFAQ = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar FAQs - Admin</title>
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
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .checkbox-group input[type="checkbox"] {
            width: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>❓ Gerenciar FAQs</h1>
            <a href="dashboard.php" class="btn btn-secondary">← Voltar</a>
        </div>

        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <div class="form-container">
            <h2><?= $editFAQ ? '✏️ Editar FAQ' : '➕ Adicionar Novo FAQ' ?></h2>
            <form method="POST">
                <?php if ($editFAQ): ?>
                    <input type="hidden" name="id" value="<?= $editFAQ['id'] ?>">
                <?php endif; ?>
                
                <div class="form-group">
                    <label>Pergunta *</label>
                    <input type="text" name="question" value="<?= htmlspecialchars($editFAQ['question'] ?? '') ?>" required>
                </div>
                
                <div class="form-group">
                    <label>Resposta *</label>
                    <textarea name="answer" required><?= htmlspecialchars($editFAQ['answer'] ?? '') ?></textarea>
                </div>
                
                <div class="form-group">
                    <label>Ordem de Exibição</label>
                    <input type="number" name="display_order" value="<?= htmlspecialchars($editFAQ['display_order'] ?? 0) ?>">
                </div>
                
                <div class="form-group">
                    <div class="checkbox-group">
                        <input type="checkbox" name="is_open" id="is_open" <?= ($editFAQ['is_open'] ?? false) ? 'checked' : '' ?>>
                        <label for="is_open">Abrir por padrão</label>
                    </div>
                </div>
                
                <button type="submit" class="btn">💾 Salvar</button>
                <?php if ($editFAQ): ?>
                    <a href="edit-faqs.php" class="btn btn-secondary">Cancelar</a>
                <?php endif; ?>
            </form>
        </div>

        <div class="list-container">
            <h2>📋 Lista de FAQs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Pergunta</th>
                        <th>Ordem</th>
                        <th>Aberto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($faqs as $faq): ?>
                        <tr>
                            <td><?= htmlspecialchars($faq['question']) ?></td>
                            <td><?= $faq['display_order'] ?></td>
                            <td><?= $faq['is_open'] ? '✅' : '❌' ?></td>
                            <td>
                                <a href="?edit=<?= $faq['id'] ?>" class="btn">Editar</a>
                                <a href="?delete=<?= $faq['id'] ?>" class="btn btn-danger" onclick="return confirm('Tem certeza?')">Deletar</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

