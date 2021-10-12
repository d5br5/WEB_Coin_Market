## 개요

가상의 코인 거래소를 제작한다. 유저는 회원가입, 자산 조회, 시세 조회, 구매 및 판매의 행위를 할 수 있다.

## 구현 완료

server : https://coin-market-d5br5.herokuapp.com/
web : In progress

#### 구현 코인 목록

- usd
- btc : bitcoin
- bch : bitcoin-cash
- xrp : ripple
- eos : eos
- eth : ethereum
- trx : tron

## 가격조회

- 가격은 https://www.coingecko.com/en/api 의 api를 이용
- 거래가능한 코인의 종류는 btc, xrp, eth, bch, eos, trx 6가지 (추후 추가 가능)

## Server API 명세

- 성공 시 status 2xx, 클라이언트 에러로 실패 시 4xx코드로 반환
- 모든 response data는 json 형태
- authentication 필요한 코드의 경우, header의 Authorization에 Bearer: {Key} 를 포함해서 호출
- 에러가 날 경우, {error: '{reason}'}를 보내도록 구현

### [:POST] /register

회원가입 시 유저에게 10,000$를 제공한다.

request

- name: string. 4-12글자. alphanumeric
- email: string. 100자 미만. email형식
- password: 8-16글자.

response

- {}

### [:POST] /login

request

- email
- password

response

- {key: {key}}

### [:GET] /coins

request

response

- ["btc", "xrp", "bch", "eth"]

### [:GET] /assets -> :auth_required

본인의 자산을 조회한다. 없는 자산의 경우 노출시키지 않는다.

request

response

- {"usd": 3000, "btc": 1, "xrp": 2, "bch": 3, "eth": 4, "eos":5, "trx":6}

### [:GET] /coins/:coin_name

코인의 현재 시세를 보여준다.
가격 조회결과를 리턴한다.

request

response

- {price: 30000 }

### [:POST] /trade/buy/:coin_name -> :auth_required

### [:POST] /trade/sell/:coin_name -> :auth_required

- 코인을 구매/판매하고 결과를 리턴한다.가격은 실시간으로 가져온 api의 가격을 따른다.

request

- quantity: number. 소수점 4번째 자리까지.

response

- {price: 30000, quantity: 1}

### [:POST] /trade/buy/:coin_name/all -> :auth_required

### [:POST] /trade/sell/:coin_name/all -> :auth_required

- 코인을 전량 구매/판매하고 결과를 리턴한다. 가격은 실시간으로 가져온 api의 가격을 따른다.
- 필요 화폐 부족시 4xx 코드와 함께 거래는 진행되지 않는다.

request

response

- {price: 30000, quantity: 1}

## 라이브러리

express, mongoose, jsonwebtoken, coingecko-api, express-validator, axios, dotenv, jwt

### JWT authentication

- https://www.npmjs.com/package/jsonwebtoken 이용
- key 제작 시 publicKey, secretKey를 database에 저장. 클라이언트에게 두값을 모두 전달. (로그인 시 publicKey, secretKey라는 키를 전달)
- 클라이언트는 매 요청 제작시마다, token을 생성한다고 가정. token의 exp = 현재시간. data에는 퍼블릭 키를 전달.

```
jwt.sign({pub: 'pubKey' }, 'secretKey', {untilAt: 1000 * 60 * 5});
```

- 서버에서는 publicKey로 등록된 secretKey를 검색하여, 해당 토큰이 1) 유효한지 2) 시간이 유효한지를 검사하여 token의 valid를 체크.
