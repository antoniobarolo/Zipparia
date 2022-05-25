import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import App from "./app";

ReactDOM.render(
	// O componente react.StrictMode não produz nenhuma saída visível, apenas ativa uma série
	// de verificações e validações (quando utilizados os scripts de desenvolvimento) para os
	// filhos, que no nosso caso é o aplicativo todo!
	// https://reactjs.org/docs/strict-mode.html
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App idpedido={1} />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,

	// O segundo parâmetro do método render() indica dentro de qual elemento da
	// página a aplicação será efetivamente renderizada.
	document.getElementById("root")
);
