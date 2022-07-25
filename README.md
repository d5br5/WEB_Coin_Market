# Coin to the Moon : Coin Trading Market
![image](https://user-images.githubusercontent.com/40906871/144613952-c55274d0-6009-4e79-8f56-671824ddedd4.png)


### About

> **가상화폐를 거래해볼 수 있는 서버와 클라이언트**
> 
- 전세계를 뜨겁게 했던 비트코인을 실제로 거래해볼 수 있는 서비스
- 가입시 1억 달러 자동 충전
- 간편 회원가입 및 로그인 가능
    - 로그인을 하지 않아도 가격을 확인 가능
    - 주문 제출을 위해서는 로그인 필요.
- 수량을 입력하여 사고팔 수 있고, 전량 주문 버튼을 통해 자산이 허락하는 최대 수량을 주문 가능

### Deploy

- Server : express로 구축하여 heroku로 배포
- Client : react로 구축하여 vercel로 배포.
- DB : MongoDB 사용

### Purpose

- 대학생이 된 후 주식과 코인 거래를 배웠다.
- 돈을 많이 잃게 되는데, 실전에 투입되기 전에 연습할 수 있는 서비스를 만들어보고 싶었다.
- Server와 Client를 모두 Javascript로 구현
- JWT를 사용하여 Session을 대체
- 코인 가격 API를 활용하여 실제 가격에 매매하는 느낌을 살림
- 서버와 클라이언트를 한 repo에 배치하여 각각의 tool로 배포하는 법 학습

### Tech Stack

![cointechstack](https://user-images.githubusercontent.com/40906871/180741152-e197625b-a1b6-4d27-a947-71c34dfacb4c.JPG)

## 2. Back-end

### 구현 코인 목록

가격은  Coin Gecko API 활용 ([https://www.coingecko.com/en/api](https://www.coingecko.com/en/api))

- usd
- btc : Bitcoin
- bch : Bitcoin-cash
- xrp : Ripple
- eos : Eos
- eth : Ethereum
- trx : Tron

### **명세**

- 성공 시 status 2xx, 클라이언트 에러로 실패 시 4xx코드로 반환
- 모든 response data는 json 형태
- authentication 필요한 코드의 경우, header의 Authorization에 Bearer: {Key} 를 포함해서 호출
- 에러가 날 경우, {error: '{reason}'}를 보내도록 구현
- API 목록
    
    ### **[:POST] /register**
    
    회원가입 시 유저에게 10,000$를 제공.
    
    - request
        - name: string. 4-12글자. alphanumeric
        - email: string. 100자 미만. email형식
        - password: 8-16글자.
    - response : { }
    
    ### **[:POST] /login**
    
    - request
        - email
        - password
    - response : { key : { key } }
    
    ### **[:GET] /coins**
    
    - request
    - response : ["btc", "xrp", "bch", "eth"]
    
    ### **[:GET] /assets -> :auth_required**
    
    본인의 자산을 조회한다. 없는 자산의 경우 노출시키지 않는다.
    
    - request
    - response : { "usd": 3000, "btc": 1, "xrp": 2, "bch": 3, "eth": 4, "eos":5, "trx":6 }
    
    ### **[:GET] /coins/:coin_name**
    
    코인의 현재 시세를 보여준다. 가격 조회결과를 리턴한다.
    
    - request
    - response : { price : 30000 }
    
    ### **[:POST] /trade/buy/:coin_name -> :auth_required**
    
    ### **[:POST] /trade/sell/:coin_name -> :auth_required**
    
    코인을 구매/판매하고 결과를 리턴한다. 가격은 실시간으로 가져온 api의 가격을 따른다.
    
    - request
        - quantity: number. 소수점 4번째 자리까지.
    - response : { price: 30000, quantity: 1 }
    
    ### **[:POST] /trade/buy/:coin_name/all -> :auth_required**
    
    ### **[:POST] /trade/sell/:coin_name/all -> :auth_required**
    
    코인을 전량 구매/판매하고 결과를 리턴. 가격은 실시간으로 가져온 api의 가격을 따른다.
    
    필요 화폐 부족시 4xx 코드와 함께 거래는 진행되지 않는다.
    
    - request
    - response : { price: 30000, quantity: 1 }

### JWT Auth

- 로그인시 pubKey, secKey를 crypto로 생성하고, {user, pubKey, secKey} 를 DB에 저장
- 클라이언트는 매 요청 제작시마다, token을 생성한다고 가정.
    - token의 exp = 현재시간. data에는 퍼블릭 키를 전달.
        
        ```jsx
        jwt.sign({pub: 'pubKey' }, 'secretKey', {untilAt: 1000 * 60 * 5});
        ```
        
- 입력받은 token을 해독하여 pubKey 추출. 해당 pubKey로 등록된 secretKey를 DB에서 검색
    - 해당 토큰이 1) 유효한지 2) 시간이 유효한지를 검사하여 token의 validity 체크.
- JWT 특징
    - 요청시마다 db조회 및 쿠키를 전달하지 않음. 추가 저장소 필요 없음.
    - 여러 디바이스에서도 토큰만 유효하다면 정상 인증 처리 가능.
    - session과의 차이
        - 사용자 인증 정보를 서버나 db에 저장하지 않으므로 서버 부하 감소.
        - 쿠키 전달이 필요 없음. 하지만 데이터가 많아지면 토큰의 길이가 길어짐.
        - 클라이언트에 저장하므로 어느 서버에 요청하든 상관 없음.

### Stuck Point

- CORS : 로컬 파일 내에서 수정 해놓고, 프론트에서 서버주소를 배포된 주소로 사용하여 뻘짓
    - express middle웨어에 cors 추가하고, allow-control-origin 헤더 추가함으로 해결
- Req header로 authorization 전송시 Bearer undefined, Bearer Token이 출력되어 계속 헤맸음

### 개선한 점

- await 반복문 하드코딩을 forEach로 자동 수행
    - 초기에는 코인의 종류가 많지 않아, 반복문을 사용하지 않고 각 코인별로 하드코딩 처리
    - coinList.js 를 분리하여 코인이 여러개 추가되더라도 로직을 고칠 필요 없어짐.
- mongoDB에 coin 추가하는 작업을 직접했었는데, createCoin route를 통해 코드로 수행
- trade route를 신설. 모든 trade code에 기본적인 asset을 불러오는 함수가 포함됐었는데 추출.
- CORS 에러 발생. Res 헤더에 CORS 컨트롤 파트 작성
- 결과 통일 `{ok:true/false, error:{reason}, data:{}}`

## 3. Front-end

### 특징

- 요청이 처리중인 경우 입력창을 비활성화하여 중복으로 요청되는 경우를 방지
- 서버에서 요구하는 입력 형식을 만족하지 않거나, 자산 부족 등의 문제 발생시 
그 원인을 창에 표시하여 사용자의 직관적인 이해를 도움
- 갱신 버튼을 추가하여 가격 정보만 독립적으로 갱신
    - 코인 가격을 갱신하고 싶을 때 페이지 전체를 새로고침하는 것은 네트워크 측면에서 비효율

### 구현

- App
    - GlobalStyles : 기본 css를 초기화하고, 태그별 초기 상태값 지정
    - CoinMarket : Account, TradingTable 두 component로 구성
- Asset
    - local storage를 확인하여 jwt 조회.
        - 유효한 회원이라면 상태를 loggedIn으로 변경 후 해당 계정 자산 조회
    - jwt가 없거나, 무효하다면 해당 jwt를 비우고, LoginForm 출력
    - 이름, 이메일, 비밀번호를 통한 간단한 회원가입 및 로그인 가능
    - 해당 계정의 자산을 mongoDB에서 조회하여 코인별 잔여 수량 표시
    - 로그아웃시 LS에서 토큰 삭제
- TradingTable
    - BUY / SELL 버튼으로 모드 토글
    - 수량 입력후 주문 버튼 입력시, 유효한 주문이라면 loading 표시 후 거래 성사.
        - 결과는 바로 asset에 반영됨.
        - 무효한 주문이라면 잘못되었다는 경고를 출력후 거래 미성사
    - Buy all / Sell all 버튼으로 전량 구매, 판매 가능
    - refresh 버튼을 통해 가격 새로고침 가능
    

### Stuck Point

- 가격 정보 갱신
    - Coingecko API 서버에서 가격 갱신을 30초 단위로 진행함.
    - 대형 거래소들은 코인 물량을 확보하고 있고, 시장 원리에 따라 실시간 가격 변동.
    - 이에 반해 본 서비스는 평균 가격만을 산정. 실시간 변동 안됨.
        - 실시간으로 해결된다면, 프론트 요청시 가격이 정해지는게 아닌  
        일정 주기로 서버에 가격 데이터 저장.
- axios 사용시, body는 data 로 전달됨
- Account Component 에서 props 변경시 전체 페이지 새로고침됨
- error 발생시 error 내용을 출력하기 위해 code 400을 200으로 표시
- req authorization 전송시 Bearer undefined, Bearer Token  중복 표시됨
    - Authorization과 authorization 미스표기
    - 근데 두 개가 대체되지 않고 병합되는건 신기함

## 4. 마무리

### 아쉬운 점

- 비트코인의 원리를 잘 알지 못한 채 만들었다. 느낌만 내고자 했을 뿐인데.
- 가격 갱신이 실시간으로 이루어지지 않음. (30초 주기)
- 실제 돈을 입금할 수 있었으면 좋겠음. (결제 모듈 삽입은 인증, 보안 문제로 사업자 필요)
- 만들어놓고, 홍보하지 않았음. 보다 많은 사람들이 사용하게 했어야 함.
- 코인 갯수가 6개로 적음.

### To be implemented

- 현재 자산 평가액 확인
- 전체 유저들의 랭킹
- 10% 20% 25% 50% 구매 판매
- 전량구매 확인버튼
- 가격 확인 chart

### 프레임워크/툴 사용 이유

- express js
    - 일단 처음 사용할 때에는 제일 유명해서 사용한 것.
    - 처음에는 req, res 등 모두 내가 자유롭게 짤 수 있어 편함
    - 하지만 웹 서버를 다루는 것이 처음이라 어떤 것이 맞는 기준인지 알지 못했음.
    - 이후에는 nest를 배워볼 예정
- react js
    - typescript를 사용할 줄 몰라 angular는 제외.
        - 현재는 ts 사용가능하나, angular 커뮤니티가 축소되고 있어 이후 로드맵에서 제외
    - vue랑 고민하다가, 그 다음학기 수업에서 react를 사용할 예정이라 미리 배울 겸 react 사용
        - 배워두면 나중에 app을 제작할 때에도 활용할 수 있다 하더라.
- mongoDB
    - NoSQL을 사용해보고 싶었다.
    - 프로젝트 초기 단계에서 어떠한 데이터 형식이 추가될지 몰라 RDBMS보다는 NoSQL을 사용하는게 나을 것 같았다.
        - 스키마를 꾸준히 업데이트 하는게 불편할 것 같았음.
        - 데이터 변경시 업데이트 속도가 느린 것은 사용자가 많지 않기 때문에 상관 없었음.
        - 검색해보니 보통 express사용시 몽고디비쓰는 것 같아 겸사겸사 사용
    - 코인, 거래, 계정 등 모델이 정형화되어 있으니 RDBMS를 사용하는 것이 나았음
