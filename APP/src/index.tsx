import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import App from "./app";

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App idpedido={1} />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
