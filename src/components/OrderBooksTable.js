import React from "react";

const OrderBooksTable = ({market}) => {
    return <div id="orderBooks">
        <div className=" orderBookTitle oneOrder">
            <div className="oneOrderPrice"><h4>가격</h4></div>
            <div className="oneOrderQuantity" style={{textAlign: 'center'}}><h4>수량</h4></div>
        </div>
        <div className="sellTable">
            {market.orderBook.sell
                .sort((a, b) => {
                    return b.price - a.price;
                })
                .map(orderBook => {
                    return (
                        <div key={orderBook._id} className="oneOrder sell">
                            <div className="oneOrderPrice">{orderBook.price.toLocaleString()}</div>
                            <div className="oneOrderQuantity">{orderBook.totalQuantity.toFixed(4)}</div>
                        </div>
                    );
                })}
        </div>
        <div className="buyTable">
            {market.orderBook.buy
                .sort((a, b) => {
                    return b.price - a.price;
                })
                .map(orderBook => {
                    return (
                        <div key={orderBook._id} className="oneOrder buy">
                            <div className="oneOrderPrice">{orderBook.price.toLocaleString()}</div>
                            <div className="oneOrderQuantity">{orderBook.totalQuantity.toFixed(4)}</div>
                        </div>
                    );
                })}
        </div>

    </div>;
}

export default OrderBooksTable;