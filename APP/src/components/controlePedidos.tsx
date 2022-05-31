import React from "react";
import Pedido from "../models/pedido";
import { Link } from "react-router-dom";

interface ControlePedidosProps {
    pedido: Pedido,
}

function ControlePedidos(props: ControlePedidosProps) {

    function editNomeCliente(novoNomeCliente: string) {
    }

    function deletePedido() {
    }

    const editLink = ("/editPage/"+(props.pedido.idPedido).toString()).toString()

    return (
        <div>
            <div className="pedidoCabecalho">
                <h3>{props.pedido.nomeCliente}</h3> <span className="preco">Preço total: R${props.pedido.preco}0</span>
            </div>
            <button> <Link to={editLink}>Edit</Link></button>
            <button onClick={deletePedido}>x</button>
        </div>
    );

}

export default ControlePedidos;
