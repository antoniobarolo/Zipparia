import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Pizza from "./components/pizza"
import infospizza from "./models/dados"

function Home() {
	
	let pizzas: JSX.Element[] = []
	for (let index = 0; index < infospizza.length; index++) {
		pizzas[index] = <Pizza pizza={infospizza[index]} adicionavel={false} removivel={false}/>	
	}
	return (
		<>
			<Navbar />
			{pizzas}
		</>
	);
}

export default Home;
