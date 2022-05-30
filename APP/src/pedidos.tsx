import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Pedido from "./models/pedido";
import ControlePedidos from "./components/controlePedidos";
import infospizza from "./models/dados"

function Pedidos() {
	/*
	const [pedidos, setPedidos] = useState<Pedido[]>([]);
	const [keyPedido, setKeyPedido] = useState(0);

	function addPedido() {
		const pedido: Pedido = {
			idPedido: 0,
			nomeCliente: "",
			preco: 0,
			carrinho: null,
			key: keyPedido
		};

		setKeyPedido(keyPedido + 1);
		setPedidos([...pedidos, pedido]);
	}
*/

	let infospedido: Pedido[] = [
		{
			idPedido: 0,
			nomeCliente: 'Amante de porra',
			preco: 200,
			carrinho: [infospizza[0], infospizza[0], infospizza[1]],
			key: 0
		},
		{
			idPedido: 1,
			nomeCliente: 'Amante de tudo',
			preco: 290,
			carrinho: [infospizza[2], infospizza[0], infospizza[1]],
			key: 1
		}

	]
	let pedidos: JSX.Element[] = []
	for (let index = 0; index < infospedido.length; index++) {
		pedidos[index] = <ControlePedidos pedido={infospedido[index]} />
	}

	return (
		<>
			<Navbar />
			{pedidos}
		</>
	);
}

export default Pedidos;
