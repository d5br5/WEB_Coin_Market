import {Button, ButtonGroup} from '@material-ui/core';
import React from 'react';

const MarketSelector = ({markets, setMarketName, marketName}) =>{
    return <ButtonGroup color='primary' aria-label='outlined primary button group'>
        {markets.map((market, index) =>
            <Button key={index} onClick={() => {
                setMarketName(market.name);
            }} variant={marketName === market.name ? 'contained' : 'outlined'}>{market.name}</Button>
        )}
    </ButtonGroup>;
}

export default MarketSelector;