# 📊 Configuração do Google Analytics

Este guia explica como configurar o Google Analytics no seu portfólio.

## 🚀 Passos para Configuração

### 1. Criar uma Conta no Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Faça login com sua conta Google
3. Clique em "Começar a medir"
4. Crie uma nova propriedade (Property)
5. Configure os dados do seu site

### 2. Obter o ID de Acompanhamento (Measurement ID)

Após criar a propriedade, você receberá um **Measurement ID** no formato:
```
G-XXXXXXXXXX
```

### 3. Substituir o ID no Código

Abra o arquivo `src/pages/Index.tsx` e procure por `G-XXXXXXXXXX` (aparece 2 vezes).

**Linha ~36:**
```typescript
script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
```

**Linha ~43:**
```typescript
gtag('config', 'G-XXXXXXXXXX');
```

Substitua `G-XXXXXXXXXX` pelo seu Measurement ID real.

### 4. Exemplo de Configuração Completa

```typescript
// Google Analytics
const script1 = document.createElement("script");
script1.async = true;
script1.src = "https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"; // ← Seu ID aqui
document.head.appendChild(script1);

const script2 = document.createElement("script");
script2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ'); // ← Seu ID aqui também
`;
document.head.appendChild(script2);
```

## 📈 O Que Será Rastreado

Com esta configuração, você poderá ver no Google Analytics:

- ✅ Número de visitantes
- ✅ Páginas mais visitadas
- ✅ Tempo médio na página
- ✅ Taxa de rejeição
- ✅ Dispositivos usados (mobile/desktop)
- ✅ Localização geográfica dos visitantes
- ✅ Origem do tráfego (Google, redes sociais, direto, etc.)

## 🎯 Eventos Personalizados (Opcional)

Se quiser rastrear cliques específicos (como cliques no botão WhatsApp), adicione este código:

```typescript
// Rastrear clique no WhatsApp
const trackWhatsAppClick = () => {
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      'event_category': 'engagement',
      'event_label': 'WhatsApp Button',
    });
  }
};
```

E chame a função quando o botão for clicado.

## 🔒 Privacidade e LGPD

### Banner de Cookies (Opcional)

Para estar em conformidade com a LGPD, considere adicionar um banner de consentimento de cookies. Bibliotecas recomendadas:

- [CookieConsent](https://github.com/orestbida/cookieconsent)
- [React Cookie Consent](https://www.npmjs.com/package/react-cookie-consent)

### Anonimizar IPs (Recomendado)

Adicione esta configuração para anonimizar os IPs dos visitantes:

```typescript
gtag('config', 'G-ABC123XYZ', {
  'anonymize_ip': true
});
```

## ✅ Verificar Se Está Funcionando

1. Acesse seu site após fazer o deploy
2. Abra o console do navegador (F12)
3. Digite `gtag` - deve retornar uma função
4. Acesse o Google Analytics (pode levar até 24h para os primeiros dados aparecerem)
5. Vá em "Tempo Real" → "Visão Geral" e navegue no seu site

Você deve ver sua visita em tempo real!

## 🚨 Troubleshooting

### Não aparece nada no Analytics

- Verifique se o ID está correto
- Confirme que o site está em produção (não localhost)
- Aguarde até 24h para os dados aparecerem
- Verifique se não há bloqueadores de anúncios ativos

### Console mostra erros

- Verifique se o script está sendo carregado corretamente
- Confirme que não há conflitos com outras bibliotecas
- Teste em modo anônimo/privado do navegador

## 📚 Recursos Adicionais

- [Documentação Google Analytics](https://developers.google.com/analytics)
- [Guia LGPD para Sites](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Como Interpretar Dados do Analytics](https://support.google.com/analytics/answer/1009409)

---

**Dica:** Use o [Google Tag Assistant](https://tagassistant.google.com/) para testar se o Analytics está configurado corretamente!

