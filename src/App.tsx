import React from "react";
import CoinMarket from "./components/CoinMarket";
import {GlobalStyles} from "./modules/globalStyles";

function App() {
	return (
		<div className="App">
			<GlobalStyles />
			<CoinMarket />
		</div>
	);
}

export default App;
