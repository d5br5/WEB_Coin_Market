import React from 'react';
import {deleteOrder, getOrders} from '../Api';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const IncompleteOrders = ({isLoggedIn, orders, marketName, setOrders, refreshToggle}) => {
    const dealCoin = marketName.split('-')[0];
    const baseCoin = marketName.split('-')[1];

    const onOrderDelete = async (order_id) => {
        await deleteOrder(order_id).then(setOrders(await getOrders()));
    }

    return (isLoggedIn && <div className='ordersDeletable'>
        <div
            className='incompleteOrderTitle'><strong style={{fontSize: 19}}>미체결된 주문</strong> <br/>
            <strong>{marketName.toUpperCase()}</strong> &nbsp; Market
        </div>

        <div>
            {orders.filter(order => order.status === 0)
                .filter(order => order.market.name === marketName)
                .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((order, index) =>
                    <div key={index}
                         className={order.side === 'buy' ? 'eachOrderDeletable buyCell' : 'eachOrderDeletable sellCell'}>
                        <div className={order.side === 'buy' ? 'cellTitleBuy' : 'cellTitleSell'}>
                            <strong>{marketName} {order.side === 'buy' ? '매수' : '매도'}</strong>
                            <IconButton size='small' aria-label='delete'
                                        color={order.side === 'buy' ? 'secondary' : 'primary'} onClick={() => {
                                onOrderDelete(order._id);
                                refreshToggle();
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>

                        <div className='incompleteOrderCell'>
                            <div className='cellLeft'>주문가</div>
                            <div className='cellRight'>{order.price} {baseCoin}</div>
                        </div>
                        <div className='incompleteOrderCell'>
                            <div className='cellLeft'>미체결량</div>
                            <div className='cellRight'>{order.remainQuantity} {dealCoin}</div>
                        </div>
                        <div className='incompleteOrderCell orderGray'>
                            <div className='cellLeft'>주문량</div>
                            <div className='cellRight'>{order.quantity} {dealCoin}</div>
                        </div>
                        <div className='incompleteOrderCell orderGray'>
                            <div className='cellLeft'>주문시점</div>
                            <div className='cellRight'>{order.createdAt}</div>
                        </div>
                    </div>
                )}
        </div>
    </div>);
};

export default IncompleteOrders;