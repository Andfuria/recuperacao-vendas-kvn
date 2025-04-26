# Recuperação de Vendas via WhatsApp (Cloudflare Workers)

Este projeto implementa um sistema automatizado de recuperação de vendas utilizando Cloudflare Workers, Cloudflare Queues e integração com a API do Gupshup.io para envio de mensagens no WhatsApp.

## Funcionalidades
- Recebe webhooks de eventos da plataforma Kirvano
- Enfileira eventos para processamento assíncrono
- Consome fila e envia mensagens personalizadas via WhatsApp (Gupshup)
- Templates prontos para eventos: PIX Gerado, PIX Expirado, Carrinho Abandonado
- Retentativas automáticas e proteção contra spam

## Estrutura do Projeto
```
/
├── src/
│   ├── worker.js           # Recebe webhooks e enfileira eventos
│   ├── queue-consumer.js   # Consome fila e envia mensagens
│   ├── templates.js        # Templates de mensagens
│   └── utils.js            # Funções auxiliares
├── wrangler.toml           # Configuração do Cloudflare Workers/Queues
├── package.json            # Dependências (opcional)
└── README.md
```

## Configuração
1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd recuperacao-vendas
   ```
2. **Configure as variáveis no `wrangler.toml`:**
   - `GUPSHUP_APIKEY`: sua API Key do Gupshup
   - `GUPSHUP_SOURCE`: número do WhatsApp Gupshup

3. **Deploy no Cloudflare Workers:**
   - Instale o Wrangler: `npm install -g wrangler`
   - Faça login: `wrangler login`
   - Deploy: `wrangler deploy`

## Como Usar
- Configure o webhook da Kirvano para apontar para `https://<seu-worker>.workers.dev/webhook`
- O Worker irá enfileirar os eventos recebidos
- O consumer processa a fila e envia as mensagens via WhatsApp

## Teste Local
Você pode testar o endpoint de webhook usando:
```sh
curl -X POST https://<seu-worker>.workers.dev/webhook \
  -H 'Content-Type: application/json' \
  -d '{"event":"PIX GERADO","cliente":{"nome":"João","telefone":"+5511999999999"},"valor":"R$ 100,00","id":"12345"}'
```

## Observações
- Os templates de mensagem podem ser ajustados em `src/templates.js`
- O sistema implementa lógica básica de retentativa e pode ser expandido conforme necessidade
- Para produção, utilize números e templates aprovados no Gupshup 