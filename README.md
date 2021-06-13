# snu-coin trading site

간단한 코인 거래소 웹 클라이언트를 제작한다.
본인의 등록된 스누메일로 전달받은 아이디/password로 로그인이 가능하다.
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
 

## style guide
* 수업 시간에 제공한 기본 규격을 준수한다.
* 변수명은 camelCase 를 기본으로 한다.
* library는 기본 create-react-app, design-library 외의 별도의 사용은 불허한다(필요한 경우 물어보고 ok가 난 경우에만 감점없이 사용가능)

## 채점기준
* 100점이 만점 기준. 각 기준을 통과 못할 때마다 해당 기준에 적용된 점수 감점. 최저 20점.
* 주어진 기능 명세가 각각 정상적으로 동작하는가.(치명적 오류 -8, 버그 존재 시 -3)
* 스펙에 맞지않게 개발 될 시 각 -3점
* 문법에러 시 각 -1점
* 의미가 없는 변수거나, 변수명이 의미가 불분명하거나, 변수작명이 잘못될 경우 각 -1점
* 변수 위치가 잘못될 경우 각 -2점( ex) 모든 변수를 global에 선언)
* html tag를 잘못사용하였을 시 각 -1점
* 잘못된 스타일링으로 인해 동작이 힘들경우 -3점
* 제출형식이 잘못될 경우 -3점
* 외부라이브러리 사용시 -5

## 기타
* 제출은 etl 중간과제 게시글을 이용하여 제출. http://etl.snu.ac.kr/mod/assign/view.php?id=1569600
* 파일은 압축하여 이름을 학번.hw1.zip으로 전송 (ex - 2007-11186.hw1, 2007-11186.hw1.zip)
* node_modules는 포함하지 않음
* 과제 제출일은 6월 13일 23:59:59까지.
* 하루 늦어질 시(1초라도) 총점에서 10% 감점(합연산). 일주일 이상 지난 과제는 받지 않음
* 치팅은 코드 유사도를 검사하는 프로그램을 사용하여 검사 + 직접 코드를 보고 검사. 적발 시 과제 점수 0점 부여.
* 질문은 github issue를 통해 받음.
