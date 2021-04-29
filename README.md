## 개요

가상의 코인 거래소를 제작한다. 유저는 회원가입, 자산 조회, 시세 조회, 구매 및 판매의 행위를 할 수 있다.  


## 제출자 정보
- 이름 : 김도형
- 학번 : 2015-18362
- 소속 : 공과대학 기계항공공학부
- 전공 : 기계공학 주전공, 벤처경영학 연합전공


## CodeSandbox link
https://codesandbox.io/s/naughty-browser-5rvjd?file=/src/index.js


## 가격조회

가격은 https://www.coingecko.com/en/api 의 api를 이용해서 가져온다. (https://www.coingecko.com/api/documentations/v3#/simple/get_simple_price)  
거래가능한 코인의 종류는 btc, xrp, eth, bch 4가지로 제한한다.  


## api 명세

성공 시 status 2xx, 클라이언트 에러로 실패 시 4x코드로 반환. 
모든 response data는 json 형태.  
authentication 필요한 코드의 경우, header의 Authorization에 Bearer: {Key} 를 포함해서 호출함.  
에러가 날 경우, {error: '{reason}'}를 보내도록.


### /register
회원가입 시 유저에게 10,000$를 제공한다.  
[:POST]

request


- name: string. 4-12글자. alphanumeric
- email: string. 100자 미만. email형식
- password: 8-16글자.


response
 - {}

### /login
[:POST]

request
- email
- password


response
- {key: {key}}

### /coins
[:GET]

request


response
- ["btc", "xrp", "bch", "eth"]

### /assets
본인의 자산을 조회한다. 없는 자산의 경우 노출시키지 않는다.
[:GET]  
:auth_required  


request

response
- {"usd": 3000, "btc": 1, "xrp": 2, "bch": 3, "eth": 4}

### /coins/:coin_name
코인의 현재 시세를 보여준다.
[:GET]

request
- 

response
가격 조회결과를 리턴한다.
- {price: 30000 }


### /coins/:coin_name/buy
코인을 구매한다. 가격은 실시간으로 가져온 api의 가격을 따른다.
[:POST]
:auth_required  

request
- quantity: number. 소수점 4번째 자리까지.

response
구매결과를 리턴한다.
- {price: 30000, quantity: 1}


### /coins/:coin_name/sell
코인을 판매한다. 가격은 실시간으로 가져온 api의 가격을 따른다.
[:POST]
:auth_required  


request
- quantity: number. 소수점 4번째 자리까지.


response
구매결과를 리턴한다.
- {price: 30000, quantity: 1}



## 라이브러리

express, mongoose, jsonwebtoken, coingecko-api, express-validator. node-fetch, axios, dotenv


## 추가 스펙

- 코인 2종 추가.  
- 로그인 시 jwt사용하기.(http://jwt.io)  
- 코드샌드박스에 올려, url을 같이 제출.
- 코인 구매, 판매 시 전량구매/전량판매 기능 구현. (ex - xrp 전량 구매 => 사용가능한 usd를 다 사용하여 xrp구매)


### 전량 구매/판매

- 구매 / 판매 로직 이용하되, quantity 대신 all: true를 request로 전달
ex) {all: true}

### JWT

- https://www.npmjs.com/package/jsonwebtoken 이용  
- key 제작 시 publicKey, secretKey를 database에 저장. 클라이언트에게 두값을 모두 전달. (로그인 시 publicKey, secretKey라는 키를 전달)
- 클라이언트는 매 요청 제작시마다, token을 생성한다고 가정. token의 exp = 현재시간. data에는 퍼블릭 키를 전달.  
```
jwt.sign({pub: 'pubKey' }, 'secretKey', {untilAt: 1000 * 60 * 5});
```

 - 서버에서는 publicKey로 등록된 secretKey를 검색하여, 해당 토큰이 1) 유효한지 2) 시간이 유효한지를 검사하여 token의 valid를 체크.
 

## 특이사항

#### 구현 코인 목록 
- usd 
- btc : bitcoin
- bch : bitcoin-cash
- xrp : ripple
- eos : eos
- eth : ethereum
- trx : tron

#### 그 외
- :/coin_name => coingecko api document 에는 bitcoin, ripple, ethereum 등의 full name을 사용하지만, 이번 과제에서는 btc, xrp, eth 등의 3자리 코드로 사용함.
- 전량 판매/구매는 /coins/:coin_name/buy/all 와 같이 따로 라우터로 분리하였음.
