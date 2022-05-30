import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemPizza from "./components/itemPizza";
import Navbar from "./components/navbar";
import infospizza from "./models/dados";

function EditPage() {
	const params = useParams()
	
	let pizzas: JSX.Element[] = []
	for (let index = 0; index < infospizza.length; index++) {
		pizzas[index] = <ItemPizza pizza={infospizza[index]} adicionavel={true} removivel={false}/>	
	}
	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={params.nomeCliente} />
				<div>
					<p>Zippas:</p>
					{params.carrinho}
				</div>
			</section>
			{pizzas}
		</>
	);
}

export default EditPage;
