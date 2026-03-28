<?php
/**
 * API para atualizar conteúdo
 * Endpoint: POST /api/update-content.php
 * Body: JSON com section e data
 */

require_once 'config.php';
requireAuth(); // Requer autenticação

$db = getDB();
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['section']) || !isset($input['data'])) {
    jsonResponse(['error' => 'Invalid request'], 400);
}

$section = $input['section'];
$data = $input['data'];

try {
    switch ($section) {
        case 'hero':
            $stmt = $db->prepare("
                UPDATE hero_section 
                SET name = ?, subtitle = ?, photo_url = ?
                WHERE id = 1
            ");
            $stmt->execute([
                $data['name'] ?? '',
                $data['subtitle'] ?? '',
                $data['photo_url'] ?? ''
            ]);
            break;

        case 'about':
            $stmt = $db->prepare("
                UPDATE about_section 
                SET title = ?, description1 = ?, description2 = ?, 
                    specialty = ?, focus = ?, photo_url = ?
                WHERE id = 1
            ");
            $stmt->execute([
                $data['title'] ?? '',
                $data['description1'] ?? '',
                $data['description2'] ?? '',
                $data['specialty'] ?? '',
                $data['focus'] ?? '',
                $data['photo_url'] ?? ''
            ]);
            break;

        case 'project':
            if (isset($data['id'])) {
                // Update
                $stmt = $db->prepare("
                    UPDATE projects 
                    SET title = ?, subtitle = ?, category = ?, description = ?, 
                        url = ?, year = ?, tags = ?, preview_image_url = ?, display_order = ?
                    WHERE id = ?
                ");
                $stmt->execute([
                    $data['title'],
                    $data['subtitle'] ?? '',
                    $data['category'] ?? '',
                    $data['description'] ?? '',
                    $data['url'] ?? '',
                    $data['year'] ?? '',
                    json_encode($data['tags'] ?? []),
                    $data['preview_image_url'] ?? '',
                    $data['display_order'] ?? 0,
                    $data['id']
                ]);
            } else {
                // Insert
                $stmt = $db->prepare("
                    INSERT INTO projects 
                    (title, subtitle, category, description, url, year, tags, preview_image_url, display_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $data['title'],
                    $data['subtitle'] ?? '',
                    $data['category'] ?? '',
                    $data['description'] ?? '',
                    $data['url'] ?? '',
                    $data['year'] ?? '',
                    json_encode($data['tags'] ?? []),
                    $data['preview_image_url'] ?? '',
                    $data['display_order'] ?? 0
                ]);
            }
            break;

        case 'contact':
            $stmt = $db->prepare("
                UPDATE contact_info 
                SET whatsapp = ?, email = ?, instagram = ?, github = ?, linkedin = ?
                WHERE id = 1
            ");
            $stmt->execute([
                $data['whatsapp'] ?? '',
                $data['email'] ?? '',
                $data['instagram'] ?? '',
                $data['github'] ?? '',
                $data['linkedin'] ?? ''
            ]);
            break;

        default:
            jsonResponse(['error' => 'Invalid section'], 400);
    }

    jsonResponse(['success' => true, 'message' => 'Content updated successfully']);
} catch (PDOException $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}

