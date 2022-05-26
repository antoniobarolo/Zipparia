import Pizza from "./pizza"

export default interface Pedido {
	idPedido: number
	nomeCliente: string
	preco: number
	carrinho: Pizza[]
	key: number
}
