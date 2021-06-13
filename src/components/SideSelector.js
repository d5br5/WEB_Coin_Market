import {Button, ButtonGroup} from "@material-ui/core";
import React from "react";

const SideSelector = ({side, setSide}) =>{
    return <ButtonGroup variant="contained"
                        color="primary"
                        aria-label="contained primary button group">

        <Button style={{width: 150}}
                variant={side==='buy' ? 'contained' : 'outlined'}
                onClick={() => setSide('buy')}
                color={side==='buy' ? 'primary' : 'default'}>Buy</Button>
        <Button style={{width: 150}}
                variant={side==='buy' ? 'outlined' : 'contained'}
                onClick={() => setSide('sell')}
                color={side==='buy' ? 'default' : 'primary'}>Sell</Button>

    </ButtonGroup>;
}

export default SideSelector;