import Item from "./item"

export default interface Pedido {
	idPedido: number
	NomeCliente: string
	Preco: number
	Pizza: Item[]
}
