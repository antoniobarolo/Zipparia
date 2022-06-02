import React from "react";
import Pedido from "../models/pedido";
import { Link } from "react-router-dom";

interface CompPedidosProps {
    pedido: Pedido,
}

function CompPedidos(props: CompPedidosProps) {

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
            <button className='botaoPedido'> <Link to={editLink}>Edit</Link></button>
            <button className='botaoPedido' onClick={deletePedido}>x</button>
        </div>
    );

}

export default CompPedidos;
