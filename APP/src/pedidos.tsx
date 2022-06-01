import React, { useState } from "react";
import Navbar from "./components/navbar";
import ControlePedidos from "./components/controlePedidos";
import _ from "./assets/rotasPedido";

async function Pedidos() {
	let infospedido = await _.listarPedido()
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
