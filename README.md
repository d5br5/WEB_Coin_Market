# snu-coin trading site

React를 활용하여 간단한 코인 거래소 웹 클라이언트를 제작.

본인의 등록된 스누메일로 전달받은 아이디/password로 로그인이 가능.


## Implement
- [https://snu_coin_dohkim.surge.sh](https://snu_coin_dohkim.surge.sh)

## 기능 명세

* 로그인/ 로그아웃이 가능하다.
* 본인의 자산을 확인 가능하다.
* 마켓의 오더북을 확인할 수 있다. 
* 오더 북은 5초에 한번씩 업데이트 된다.
* 오더를 만들 수 있다.
* 오더를 취소할 수 있다. 

## api 명세
 ### [POST] /login
 name, password => {key}
 
 ### [POST] /login_by_key
 {key} => {name}
 
 ### [GET] /markets
 None => {markets}
 
 ### [GET] /markets/:market_name
 None => {market, orderBook: {buy: [], sell: []}}
 
 ### [POST] /orders (:login_required)
 { price, quantity, market, side} => order

 ### [GET] /orders
 None => [orders]
 
 ### [GET] /assets (:login_required)
 None => [orders]
 

 ### [DELETE] /orders/:order_id (:login_required)
 None => order
 
 ### Order
 status => -1, 0 ,1 
 
- 0 => 기본
- -1 => 취소 
- 1 => 체결 완료
