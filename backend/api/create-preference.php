<?php
// Configurações e Cabeçalhos CORS
require_once 'config.php';

// Token de Acesso do Mercado Pago fornecido pelo usuário
$ACCESS_TOKEN = 'APP_USR-7626769308027334-032719-96958d6949994474159460a9c8b4f29c-2244840287';

// Recebe os dados do corpo da requisição (JSON vindo do frontend/React)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$email = isset($data['email']) ? trim($data['email']) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'E-mail inválido ou não fornecido.']);
    exit();
}

// Monta o payload conforme a documentação de contorno da LGPD (metadata.email)
$preferenceData = [
    "items" => [
        [
            "title" => "Licença Studio Oryon - Acesso Mensal",
            "quantity" => 1,
            "currency_id" => "BRL",
            "unit_price" => 39.90
        ]
    ],
    "payer" => [
        "email" => $email
    ],
    "metadata" => [
        "email" => $email // O SEGREDO PARA O WEBHOOK RECUPERAR
    ],
    "back_urls" => [
        "success" => "https://studiooryon.pro/", // Opcional: crie uma página de sucesso
        "failure" => "https://studiooryon.pro/",
        "pending" => "https://studiooryon.pro/"
    ],
    "auto_return" => "approved"
];

// Inicia o cURL para chamar a API do Mercado Pago
$ch = curl_init('https://api.mercadopago.com/checkout/preferences');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($preferenceData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $ACCESS_TOKEN,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Repassa a resposta do Mercado Pago de volta para o Front-End
if ($httpCode >= 200 && $httpCode < 300) {
    http_response_code(200);
    echo $response; // Contém o 'init_point' que o frontend precisa
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro ao gerar o link de pagamento no Mercado Pago.',
        'details' => json_decode($response, true)
    ]);
}
