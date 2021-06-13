import SideSelector from "./SideSelector";
import {Button, TextField} from "@material-ui/core";

import React, {useState} from "react";
import {getOrders, postOrder} from "../Api";

const PostOrder = ({side, setSide, setOrders, isLoggedIn, marketName, refreshToggle}) =>{

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const onOrderSubmit = async (e) => {
        e.preventDefault();
        postOrder(price, quantity, marketName, side).then(setOrders(await getOrders()));
        setPrice(0);
        setQuantity(0);
        refreshToggle();
    }

    const showPrice = (price)=>{
        if(price>0) return price;
        else return "";
    }

    const showQuantity = (quantity)=>{
        if(quantity>0) return quantity;
        else return "";
    }

    return <div className="postOrder">

        <form className="create-order" onSubmit={onOrderSubmit}>
            <SideSelector side={side} setSide={setSide}/>

            <TextField size="small"
                       id="order_price"
                       label="price"
                       onChange={e => setPrice(e.target.value)}
                       variant="filled"
                       value={showPrice(price)}
                       type="number"/>

            <TextField size="small"
                       id="order_quantity"
                       label="quantity"
                       onChange={e => setQuantity(e.target.value)}
                       variant="filled"
                       value={showQuantity(quantity)}
                       type="number"/>

            <Button type="submit" variant="contained" color="secondary"
                    disabled={!isLoggedIn}>ORDER</Button>
        </form>

    </div>
}

export default PostOrder