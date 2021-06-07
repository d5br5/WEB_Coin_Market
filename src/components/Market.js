import {Button, ButtonGroup, TextField} from "@material-ui/core";

function Market({market}) {
    console.log(market);
    return (
        market &&
        <div className="market">
            <div>{market.market.name}</div>
            <div id="orderBooks">
                {
                    market.orderBook.buy.map(orderBook => {
                        return (<div key={orderBook._id}>
                            {orderBook._id} : {orderBook.totalQuantity}
                        </div>);
                    })
                }
            </div>

            <form className="create-order">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button style={{width:150}}>Buy</Button>
                    <Button style={{width:150}}>Sell</Button>
                </ButtonGroup>

                <TextField size="small" id="filled-basic" label="price" variant="filled" type="number"/>
                <TextField size="small" id="filled-basic" label="quantity" variant="filled"
                           type="number"/>
                <Button type="submit" variant="contained" color="secondary">Submit</Button>
            </form>

        </div>
    )
}

export default Market;