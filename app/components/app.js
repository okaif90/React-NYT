// Dependencies for React
import React from "react";
import ReactDOM from "react-dom";

// Routing implementation
import { BrowserRouter, Route } from "react-router-dom";

// Include the Main Component
import Main from "./components/Main";

// Render main route.
ReactDOM.render(
	(
		<BrowserRouter>
			<Route path="/" component={Main} />
		</BrowserRouter>
	),
	document.getElementById("app")
);
