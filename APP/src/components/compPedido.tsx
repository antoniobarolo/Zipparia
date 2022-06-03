import React from "react";
import Pedido from "../models/pedido";
import { Link } from "react-router-dom";
import {alterar, excluir} from '../assets/rotasPedido'
import Pedidos from '../pedidos'

interface CompPedidoProps {
    pedido: Pedido
}

function CompPedidos(props: CompPedidoProps) {

    async function deletePedido() {
        await excluir(props.pedido.idPedido)
        window.location.reload()
    }

    return (
        <div>
            <div className="pedidoCabecalho">
                <h3>{props.pedido.nomeCliente}</h3> <span className="preco">Preço total: R${props.pedido.preco}0</span>
            </div>
            <button className='botaoPedido'> <Link to={`/editPage/${props.pedido.idPedido}`}>Edit</Link></button>
            <button className='botaoPedido' onClick={deletePedido}>x</button>
        </div>
    );

}

export default CompPedidos;
