import React from "react";
import CoinMarket from "./components/CoinMarket";
import {GlobalStyles} from "./globalStyles";

function App() {
	return (
		<div className="App">
			<GlobalStyles />
			<CoinMarket />
		</div>
	);
}

export default App;
