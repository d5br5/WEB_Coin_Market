import {useState, useEffect} from "react";
import {loadAssets} from "../Api";

function Assets({isLoggedIn}) {
    const [assets, setAssets] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => {
            isLoggedIn && loadAssets().then(_assets => {
                setAssets(_assets);
            })
        }, 5000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        isLoggedIn && loadAssets().then(_assets => {
            setAssets(_assets);
        })
    }, [isLoggedIn]);

    return (
        <div className="assetInfo">
            <div className="infoTitle"><h3>💸 ASSETS 💸</h3></div>

            <div className="infoSection">
                {
                    assets.map(
                        (asset, index) => {
                            return (
                                <div key={index} className="eachAsset">
                                    <div className="assetSymbol">{asset.symbol}</div> <div className="assetQuantity">{asset.quantity.toLocaleString()}</div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}

export default Assets;
