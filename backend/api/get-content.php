<?php
/**
 * API para buscar conteúdo do portfólio
 * Endpoint: GET /api/get-content.php?section=hero
 */

require_once 'config.php';

$db = getDB();
$section = $_GET['section'] ?? 'all';

try {
    switch ($section) {
        case 'hero':
            $stmt = $db->query("SELECT * FROM hero_section LIMIT 1");
            $data = $stmt->fetch();
            jsonResponse(['data' => $data]);
            break;

        case 'about':
            $stmt = $db->query("SELECT * FROM about_section LIMIT 1");
            $data = $stmt->fetch();
            jsonResponse(['data' => $data]);
            break;

        case 'projects':
            $stmt = $db->query("SELECT * FROM projects ORDER BY display_order ASC");
            $data = $stmt->fetchAll();
            jsonResponse(['data' => $data]);
            break;

        case 'services':
            $stmt = $db->query("SELECT * FROM services ORDER BY display_order ASC, number ASC");
            $data = $stmt->fetchAll();
            jsonResponse(['data' => $data]);
            break;

        case 'testimonials':
            $stmt = $db->query("SELECT * FROM testimonials ORDER BY display_order ASC");
            $data = $stmt->fetchAll();
            jsonResponse(['data' => $data]);
            break;

        case 'faqs':
            $stmt = $db->query("SELECT * FROM faqs ORDER BY display_order ASC");
            $data = $stmt->fetchAll();
            jsonResponse(['data' => $data]);
            break;

        case 'contact':
            $stmt = $db->query("SELECT * FROM contact_info LIMIT 1");
            $data = $stmt->fetch();
            jsonResponse(['data' => $data]);
            break;

        case 'all':
            $result = [];
            $tables = ['hero_section', 'about_section', 'projects', 'services', 'testimonials', 'faqs', 'contact_info'];
            
            foreach ($tables as $table) {
                $stmt = $db->query("SELECT * FROM $table");
                $key = str_replace('_section', '', $table);
                $key = str_replace('_info', '', $key);
                $result[$key] = $table === 'hero_section' || $table === 'about_section' || $table === 'contact_info' 
                    ? $stmt->fetch() 
                    : $stmt->fetchAll();
            }
            
            jsonResponse(['data' => $result]);
            break;

        default:
            jsonResponse(['error' => 'Invalid section'], 400);
    }
} catch (PDOException $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}

