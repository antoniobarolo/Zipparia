import React from "react";
import Pedido from "../models/pedido";
import { Link } from "react-router-dom";

interface ControlePedidosProps {
    pedido: Pedido,
    onChange?: (novopedido: Pedido) => void,
    onDelete?: (pedido: Pedido) => void
}

function ControlePedidos(props: ControlePedidosProps) {

    function nomeClienteChange(novoNomeCliente: string) {
        if (props.onChange)
            props.onChange({ ...props.pedido, nomeCliente: novoNomeCliente });
    }

    function deletePedido() {
        if (props.onDelete)
            props.onDelete(props.pedido);
    }

    const editString = ("/editPage/"+(props.pedido.idPedido).toString()).toString()

    return (
        <div>
            <div className="pedidoCabecalho">
                <h3>{props.pedido.nomeCliente}</h3> <span className="preco">Preço total: R${props.pedido.preco}0</span>
            </div>
            <button> <Link to={editString}>Edit</Link></button>
            <button onClick={deletePedido}>x</button>
        </div>
    );

}

export default ControlePedidos;
