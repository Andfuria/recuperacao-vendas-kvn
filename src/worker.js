import { getTemplate } from './templates.js';
import { sendWhatsApp } from './utils.js';

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Método não permitido", { status: 405 });
    }
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response("JSON inválido", { status: 400 });
    }
    if (!payload.event || !payload.cliente || !payload.cliente.telefone) {
      return new Response("Payload inválido", { status: 400 });
    }
    await env.RECUPERACAO_QUEUE.send(JSON.stringify(payload));
    return new Response("Evento recebido", { status: 200 });
  },

  async queue(batch, env, ctx) {
    for (const msg of batch.messages) {
      try {
        const evento = JSON.parse(msg.body);
        const mensagem = getTemplate(evento.event, evento);
        if (mensagem) {
          await sendWhatsApp(evento.cliente.telefone, mensagem, env);
        }
      } catch (e) {
        // Log de erro pode ser adicionado aqui
      }
    }
  }
}
