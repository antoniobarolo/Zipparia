import Pedido from "./pedido"
import Pizza from "./pizza"

export default interface Item {
    pizza: Pizza
    qtd: number
}
