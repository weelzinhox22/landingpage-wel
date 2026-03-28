export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*') // substitua pelo seu domínio se quiser mais segurança
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Tratando o preflight request do CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Apenas aceita requisição POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail inválido ou não fornecido.' });
    }

    // Token do Mercado Pago fornecido pelo usuário
    const ACCESS_TOKEN = 'APP_USR-7626769308027334-032719-96958d6949994474159460a9c8b4f29c-2244840287';

    // Montando o Payload para o Mercado Pago
    const preferenceData = {
      items: [
        {
          title: "Licença Studio Oryon - Acesso Mensal",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 39.90
        }
      ],
      payer: {
        email: email
      },
      metadata: {
        email: email // O LUGAR SEGURO ONDE O WEBHOOK VAI LER DEPOIS (LGPD Bypass)
      },
      back_urls: {
        success: "https://studiooryon.pro/",
        failure: "https://studiooryon.pro/",
        pending: "https://studiooryon.pro/"
      },
      auto_return: "approved"
    };

    // Chamada à API do Mercado Pago usando fetch nativo
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("Erro MP:", data);
      return res.status(mpResponse.status).json({
        error: "Erro ao gerar cobrança no Mercado Pago",
        details: data
      });
    }

    // Retorna os dados com sucesso, incluindo o init_point (link pro usuário pagar)
    return res.status(200).json(data);

  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
