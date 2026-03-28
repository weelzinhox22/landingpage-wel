<?php
/**
 * Dashboard Principal do Admin
 */
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

require_once '../api/config.php';
$db = getDB();

// Estatísticas
$stats = [
    'projects' => $db->query("SELECT COUNT(*) as count FROM projects")->fetch()['count'],
    'services' => $db->query("SELECT COUNT(*) as count FROM services")->fetch()['count'],
    'testimonials' => $db->query("SELECT COUNT(*) as count FROM testimonials")->fetch()['count'],
    'faqs' => $db->query("SELECT COUNT(*) as count FROM faqs")->fetch()['count'],
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            color: #333;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header h1 { font-size: 24px; }
        .header-right {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .logout-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            transition: background 0.3s;
        }
        .logout-btn:hover {
            background: rgba(255,255,255,0.3);
        }
        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .stat-card .number {
            font-size: 36px;
            font-weight: 700;
            color: #667eea;
        }
        .sections-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .section-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .section-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .section-card h2 {
            margin-bottom: 10px;
            color: #333;
        }
        .section-card p {
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Dashboard Admin</h1>
        <div class="header-right">
            <span>Olá, <?= htmlspecialchars($_SESSION['admin_username']) ?>!</span>
            <a href="logout.php" class="logout-btn">Sair</a>
        </div>
    </div>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Projetos</h3>
                <div class="number"><?= $stats['projects'] ?></div>
            </div>
            <div class="stat-card">
                <h3>Serviços</h3>
                <div class="number"><?= $stats['services'] ?></div>
            </div>
            <div class="stat-card">
                <h3>Depoimentos</h3>
                <div class="number"><?= $stats['testimonials'] ?></div>
            </div>
            <div class="stat-card">
                <h3>FAQs</h3>
                <div class="number"><?= $stats['faqs'] ?></div>
            </div>
        </div>

        <h2 style="margin-bottom: 20px; color: #333;">Editar Seções</h2>
        <div class="sections-grid">
            <div class="section-card">
                <h2>🏠 Hero Section</h2>
                <p>Editar nome, subtítulo e foto principal</p>
                <a href="edit-section.php?section=hero" class="btn">Editar</a>
            </div>

            <div class="section-card">
                <h2>👤 Sobre Mim</h2>
                <p>Editar textos, especialidade e foto</p>
                <a href="edit-section.php?section=about" class="btn">Editar</a>
            </div>

            <div class="section-card">
                <h2>💼 Projetos</h2>
                <p>Gerenciar projetos do portfólio</p>
                <a href="edit-projects.php" class="btn">Gerenciar</a>
            </div>

            <div class="section-card">
                <h2>🛠️ Serviços</h2>
                <p>Editar serviços oferecidos</p>
                <a href="edit-services.php" class="btn">Gerenciar</a>
            </div>

            <div class="section-card">
                <h2>💬 Depoimentos</h2>
                <p>Gerenciar depoimentos de clientes</p>
                <a href="edit-testimonials.php" class="btn">Gerenciar</a>
            </div>

            <div class="section-card">
                <h2>❓ FAQ</h2>
                <p>Gerenciar perguntas frequentes</p>
                <a href="edit-faqs.php" class="btn">Gerenciar</a>
            </div>

            <div class="section-card">
                <h2>📞 Contato</h2>
                <p>Editar informações de contato</p>
                <a href="edit-section.php?section=contact" class="btn">Editar</a>
            </div>
        </div>
    </div>
</body>
</html>

