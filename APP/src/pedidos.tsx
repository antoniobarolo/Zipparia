import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import ControlePedidos from "./components/controlePedidos";
import { listarPedido, obterPedido } from "./assets/rotasPedido";
import Pedido from "./models/pedido";

function Pedidos() {
	const [atualizando, setAtualizando] = useState(false);
	const [infospedido, setInfospizza] = useState<Pedido[]>(null);

	async function getPedidos() {
		setAtualizando(true);
		setInfospizza(await listarPedido() || []);
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && !infospedido)
			getPedidos();
	});

	if (!infospedido) {
		return <> <Navbar /> Carregando...</>;
	}
	let pedidos: JSX.Element[] = infospedido.map((pedido) => <ControlePedidos key={pedido.idPedido} pedido={pedido} />)

	return (
		<>
			<Navbar />
			<h2>Pedidos:</h2>
			<button>Novo Pedido</button>
			{pedidos}
		</>
	);
}

export default Pedidos;
