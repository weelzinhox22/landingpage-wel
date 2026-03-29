// Mapa em memória para Rate Limiting Rudimentar (Mitigação Anti-Spam de Requisições)
const rateLimitMap = new Map();

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Rate Limiter: Máximo de 15 requisições por IP a cada 60 segundos
  if (rateLimitMap.has(ip)) {
    const data = rateLimitMap.get(ip);
    if (now - data.time < 60000) { 
      if (data.count > 15) {
        return res.status(429).json({ error: 'Muitas requisições. Rate Limit Excedido (Proteção Anti-Spam Ativa).' });
      }
      data.count++;
      rateLimitMap.set(ip, data);
    } else {
      rateLimitMap.set(ip, { count: 1, time: now });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, time: now });
  }
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
    const { email, ra_limit } = req.body;

    // Sanitização e Regex Fortificado (Prevenção de XSS/SQLi via string de e-mail)
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@<>'"()\[\]]+@[^\s@<>'"()\[\]]+\.[^\s@<>'"()\[\]]{2,}$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      console.warn("Segurança: Carga injetável barrada no e-mail", email);
      return res.status(400).json({ error: 'E-mail inválido ou tentativa de injeção bloqueada.' });
    }

    // Definir valores baseados no ra_limit
    const limit = parseInt(ra_limit, 10) || 1;
    let planTitle = "AVA Oryon - Plano Estudante";
    let planPrice = 29.90;

    if (limit === 10) {
      planTitle = "AVA Oryon - Plano Agência";
      planPrice = 59.90;
    } // default para 1 (Estudante)

    // Token do Mercado Pago lido com segurança das Variáveis de Ambiente
    const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
    
    if (!ACCESS_TOKEN) {
      console.error("FALHA CRÍTICA: MP_ACCESS_TOKEN não está configurado nas variáveis de ambiente da Vercel.");
      return res.status(500).json({ error: "Erro de Configuração do Checkout." });
    }

    // Montando o Payload para o Mercado Pago
    const preferenceData = {
      items: [
        {
          title: planTitle,
          quantity: 1,
          currency_id: "BRL",
          unit_price: planPrice
        }
      ],
      payer: {
        email: cleanEmail
      },
      metadata: {
        email: cleanEmail, // O LUGAR SEGURO ONDE O WEBHOOK VAI LER DEPOIS (LGPD Bypass)
        ra_limit: limit
      },
      statement_descriptor: "Studio Oryon", // Muda a fatura do Cartão de Crédito
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
