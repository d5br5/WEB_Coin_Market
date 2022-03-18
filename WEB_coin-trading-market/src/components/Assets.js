import React from "react";

const Assets = ({assets}) =>{
    return <div className='assetInfo'>
        <div className='infoTitle'><h3>💸 ASSETS 💸</h3></div>
        <div className='infoSection'>
            {assets.map(
                (asset, index) => {
                    return (
                        <div key={index} className='eachAsset'>
                            <div className='assetSymbol'>{asset.symbol}</div>
                            <div className='assetQuantity'>{asset.quantity.toLocaleString()}</div>
                        </div>
                    )
                }
            )}
        </div>
    </div>
}

export default Assets;