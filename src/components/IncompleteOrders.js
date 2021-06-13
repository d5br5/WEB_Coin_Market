import React from "react";
import {deleteOrder, getOrders} from "../Api";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const IncompleteOrders = ({isLoggedIn, orders, marketName, setOrders, refreshToggle}) => {
    const dealCoin = marketName.split('-')[0];
    const baseCoin = marketName.split('-')[1];

    const onOrderDelete = async (order_id) => {
        await deleteOrder(order_id).then(setOrders(await getOrders()))
    }

    return (isLoggedIn && <div className="ordersDeletable">
        <div
            className="incompleteOrderTitle"><strong style={{fontSize: 19}}>미체결된 주문</strong> <br/>
            <strong>{marketName.toUpperCase()}</strong> &nbsp; Market
        </div>

        <div>
            {orders.filter(order => order.status === 0)
                .filter(order => order.market.name === marketName && order.side === 'buy')
                .map((order, index) =>
                    <div key={index} className="eachOrderDeletable buyCell">
                        <div className="cellTitleBuy"><strong>{marketName} {order.side === 'buy' ? '매수' : '매도'}</strong>

                            <IconButton aria-label="delete" color='secondary' onClick={() => {
                                onOrderDelete(order._id);
                                refreshToggle();
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                        <div className="incompleteOrderCell">
                            <div className="cellLeft">주문가</div>
                            <div className="cellRight">{order.price} {baseCoin}</div>
                        </div>
                        <div className="incompleteOrderCell">
                            <div className="cellLeft">미체결량</div>
                            <div className="cellRight">{order.remainQuantity} {dealCoin}</div>
                        </div>
                        <div className="incompleteOrderCell orderQuantity">
                            <div className="cellLeft">주문량</div>
                            <div className="cellRight">{order.quantity} {dealCoin}</div>
                        </div>


                    </div>
                )}
        </div>
        <div>
            {orders.filter(order => order.status === 0)
                .filter(order => order.market.name === marketName && order.side === 'sell')
                .map((order, index) =>
                    <div key={index} className="eachOrderDeletable sellCell">
                        <div className="cellTitleSell"><strong>{marketName} {order.side === 'buy' ? '매수' : '매도'}</strong>
                            <IconButton color='primary' aria-label="delete" onClick={() => {
                                onOrderDelete(order._id);
                                refreshToggle();
                            }}>
                                <DeleteIcon/>
                            </IconButton></div>
                        <div className="incompleteOrderCell">
                            <div className="cellLeft">주문가</div>
                            <div className="cellRight">{order.price} {baseCoin}</div>
                        </div>
                        <div className="incompleteOrderCell">
                            <div className="cellLeft">미체결량</div>
                            <div className="cellRight">{order.remainQuantity} {dealCoin}</div>
                        </div>
                        <div className="incompleteOrderCell orderQuantity">
                            <div className="cellLeft">주문량</div>
                            <div className="cellRight">{order.quantity} {dealCoin}</div>
                        </div>
                    </div>
                )}
        </div>
    </div>)
}

export default IncompleteOrders;