import React from "react";
import Pedido from "../models/pedido";

interface ControlePedidoProps {
    pedido: Pedido,
    onChange?: (novopedido: Pedido) => void,
    onDelete?: (pedido: Pedido) => void
}

function ControlePedido(props: ControlePedidoProps) {

    function nomeClienteChange(novoNomeCliente: string) {
        if (props.onChange)
            props.onChange({ ...props.pedido, nomeCliente: novoNomeCliente });
    }
    
    function deletePedido() {
        if (props.onDelete)
            props.onDelete(props.pedido);
    }

    return (
		<div>
            <div className="pedidoCabecalho">
				<h3>{props.pedido.nomeCliente}</h3> <span className="preco">{props.pedido.preco}</span>
			</div>
			<button onClick={()=>0}>Edit</button>
			<button onClick={deletePedido}>x</button>
        </div>
	);

}

export default ControlePedido;
