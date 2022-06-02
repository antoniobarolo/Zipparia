import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemPizza from "./components/itemPizza";
import Navbar from "./components/navbar";
import listarPizza from "./assets/rotasPizza";
import { obterPedido } from "./assets/rotasPedido";
import Pedido from "./models/pedido";
import Pizza from "./models/pizza";
import Item from "./models/item";

function EditPage() {
	const params = useParams();
	const [atualizando, setAtualizando] = useState(false);
	const [infospizza, setInfospizza] = useState<Pizza[]>(null);
	const [pedido, setPedido] = useState<Pedido>(null);

	//pedido e carrinho
	//lista de pizzas genéricas para serem adicionadas
	async function getPedidoPizza() {
		setAtualizando(true);
		setInfospizza(await listarPizza() || []);
		setPedido(await obterPedido(parseInt(params.idPedido)));
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && (!pedido || !infospizza)) {
			getPedidoPizza();
		}
	});

	if (!pedido || !infospizza) {
		return <> <Navbar /> Carregando...</>;
	}

	let carrinho: JSX.Element[] = pedido.Pizza.map((p) => <ItemPizza key={p.id} pizza={p.Pizza} qtd={p.Quantidade} adicionavel={false} removivel={true} />)

	let pizzas: JSX.Element[] = infospizza.map((pizza) => <ItemPizza key={pizza.idPizza} pizza={pizza} adicionavel={true} removivel={false} />)

	function EditNome() {
		//repassa pra função EditNomeCliente dentro do componente
	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input type="text" value={pedido.NomeCliente} />
				<button onClick={EditNome}>Definir Nome</button>
				<div>
					<h3>Zippas no carrinho:</h3>
					{carrinho}
				</div>
			</section>
			<h2>Adicionar Zippas:</h2>
			{pizzas}
		</>
	);
}

export default EditPage;
