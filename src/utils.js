export async function sendWhatsApp(telefone, mensagem, env) {
  const url = "https://api.gupshup.io/sm/api/v1/msg";
  const payload = {
    channel: "whatsapp",
    source: env.GUPSHUP_SOURCE,
    destination: telefone,
    message: { type: "text", text: mensagem }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "apikey": env.GUPSHUP_APIKEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    // Aqui pode-se implementar lógica de retentativa/logging
    throw new Error("Erro ao enviar mensagem");
  }
  return await res.json();
} 