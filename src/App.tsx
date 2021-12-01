import CoinMarket from "./components/CoinMarket/CoinMarket";
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
