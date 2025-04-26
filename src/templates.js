export function getTemplate(event, data) {
  switch (event) {
    case "PIX GERADO":
      return `Olá ${data.cliente.nome}, seu PIX de ${data.valor} está aguardando pagamento! Pedido: ${data.id}`;
    case "PIX EXPIRADO":
      return `${data.cliente.nome}, seu pagamento não foi realizado. Quer ajuda para finalizar?`;
    case "CARRINHO ABANDONADO":
      return `Vimos que você deixou itens no carrinho! Deseja continuar?`;
    case "COMPRA RECUSADA":
      return `${data.cliente.nome}, houve um problema com seu pagamento. Precisa de ajuda para tentar novamente?`;
    default:
      return "";
  }
} 