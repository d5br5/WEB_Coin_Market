import {useState, useEffect} from "react";
import {loadAssets} from "./Api";

function Assets() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        loadAssets()
            .then(_assets => {
                setAssets(_assets);
            })
    }, [])
    return (
        <div>
            <h3>
                assets
            </h3>
            {
                assets.map(
                    (asset, index) => {
                        return (
                            <div key={index}>
                                {asset.symbol} : {asset.quantity}
                            </div>
                        )
                    }
                )
            }
        </div>
    );
}

export default Assets;
