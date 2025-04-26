import { getTemplate } from './templates.js';
import { sendWhatsApp } from './utils.js';

export default {
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