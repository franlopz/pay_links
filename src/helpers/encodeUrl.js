const encodeUrl = ({ url, phone }) => {
  const encodedText = encodeURIComponent(
    `Le compartimos a continuación su enlace de pago: ${url} Su pedido se registrará al recibir notificación de pago.`
  )
  const newUrl = `https://wa.me/${phone}/?text=${encodedText}`
  if (encodedText) return newUrl
}

export default encodeUrl
