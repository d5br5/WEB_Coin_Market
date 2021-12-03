# Coin to the Moon : Coin Trading Market


## About the Project

### Purpose

- 가상의 코인 거래소를 제작한다. 유저는 회원가입, 자산 조회, 시세 조회, 구매 및 판매의 행위를 할 수 있다.
- Server와 Client를 모두 Javascript로 구현해본다. 
- JWT를 사용하여 Session을 대체한다. 
- 코인 가격 API를 활용하여 실제 가격에 매매하는 느낌을 살린다. 
- 서버와 클라이언트를 한 repo에 배치하여 각각의 tool로 배포하는 법을 배운다.

### Deploy
- Tool : Heroku, Vercel
- server : https://coin-market-d5br5.herokuapp.com/
- web : https://coin-to-the-moon.vercel.app/

### Built with

- Expressjs (without TS)
- Reactjs (with TS)
- MongoDB
- coingecko API
- JWT


## Detail - Server

### 명세
- 성공 시 status 2xx, 클라이언트 에러로 실패 시 4xx코드로 반환
- 모든 response data는 json 형태
- authentication 필요한 코드의 경우, header의 Authorization에 Bearer: {Key} 를 포함해서 호출
- 에러가 날 경우, {error: '{reason}'}를 보내도록 구현

### 구현 코인 목록

- usd
- btc : Bitcoin
- bch : Bitcoin-cash
- xrp : Ripple
- eos : Eos
- eth : Ethereum
- trx : Tron
- 가격은 https://www.coingecko.com/en/api 의 api를 이용

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

### JWT authentication

- https://www.npmjs.com/package/jsonwebtoken 이용
- key 제작 시 publicKey, secretKey를 database에 저장. 클라이언트에게 두값을 모두 전달. (로그인 시 publicKey, secretKey라는 키를 전달)
- 클라이언트는 매 요청 제작시마다, token을 생성한다고 가정. token의 exp = 현재시간. data에는 퍼블릭 키를 전달.

```
jwt.sign({pub: 'pubKey' }, 'secretKey', {untilAt: 1000 * 60 * 5});
```

- 서버에서는 publicKey로 등록된 secretKey를 검색하여, 해당 토큰이 1) 유효한지 2) 시간이 유효한지를 검사하여 token의 valid를 체크.

## Detail - Client

### App
- GlobalStyles : 기본 css를 초기화하고, 태그별 초기 상태값 지정
- CoinMarket : Account, TradingTable 두 component로 구성

### Asset
- local storage를 확인하여 jwt 조회. 유효한 회원이라면 상태를 loggedIn으로 변경 후 해당 계정 자산 조회
- jwt가 없거나, 무효하다면 해당 jwt를 비우고, LoginForm 출력
- 이름, 이메일, 비밀번호를 통한 간단한 회원가입 및 로그인 가능
- 해당 계정의 자산을 mongoDB에서 조회하여 코인별 잔여 수량 표시
- 로그아웃시 LS에서 토큰 삭제

### TradingTable
- BUY / SELL 버튼으로 모드 토글
- 수량 입력후 주문 버튼 입력시, 유효한 주문이라면 loading 표시 후 거래 성사. 결과는 바로 asset에 반영됨.
  - 무효한 주문이라면 잘못되었다는 경고를 출력후 거래 미성사
- Buy all / Sell all 버튼으로 전량 구매, 판매 가능
- refresh 버튼을 통해 가격 새로고침 가능
