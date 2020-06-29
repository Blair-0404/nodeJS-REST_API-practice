const express = require("express"); // 설치한 express기 사용위해 require 시켜주
const bodyParser = require("body-parser"); // post요청시 만약 client가 json형식으로 보내면 그것을 서버가 받아서 이해하기 위해서 bodyparser가 필요하다.

const server = express(); // 서버 만들기

server.use(bodyParser.json()); // require해온 bodyParser를 서버가 사용할 수 잇게 해주기

const users = [ // db가 따로 없어서 테스트용으로 간단히 유저생성
  {
    id:'A',
    name: 'blair',
    email: 'blair441035@gmail.com'
  },
  {
    id:'B',
    name: 'yj',
    email: 'yj441035@gmail.com'
  }
];

// REST API 순서 매우 중요. client 가 요청시 순서대로 코드를 읽어서 routes를 인식하기 때문에

// 유저들 정보 요청
server.get('/api/user', (req, res) => { // client에서 /api/user endpoint이동시
  res.json(users); // 서버는 응답
});

// GET - ID parameter 사용해서 특정 사용자 정보 불러오기
server.get('/api/user/:id', (req, res) => {
  // console.log(req.params.id); // 브라우저에 주소를 친 /api/user/:id에서 id가 서버에 찍힌다.
  const user = users.find((user) => {
    return user.id === req.params.id; // users에 있는 id중 주소로 받은 :id와 동일한 아이디있으면 그 유저정보를 반환해서 변수에 저장
  }); // 일치하는 정보 없을시 -1 리턴

  if(user) { // 주소로 받은 id와 동일한 id를 가진 유저를 찾았다면
    res.json(user); // 서버는 클라이언트에게 유저정보를 건네준다
  } else { //  못찾을시
    res.status(404).json({errorMessage: "User wad not found"}) // 응답코드 4040보내고 에러메세지를 보내준다.
  }

});

// POST - 유저 생성 요청
server.post('/api/user', (req, res) => {
  console.log(req.body); // 클라이언트가 보낸것들을 body에서 확인 가능
  users.push(req.body) // users에 추가
  res.json(users); // 서버는 응답
});

// PUT - 유저정보 업데이트 (ID parameter 사용해서 특정 사용자 정보 불러와 업뎃해주기)
server.put('/api/user/:id', (req, res) => {
  // 클아이언트에게 받은 ID와 일치하는 ID를 가진 user의 IDX돌려줌
  let foundIdx = users.findIndex(user => user.id === req.params.id);

  if(foundIdx === -1) { // 일치하는게 없으면 -1
    res.status(404).json({errorMessage: "User wad not found"}) // 응답코드 4040보내고 에러메세지를 보내준다.
  } else {
    users[foundIdx] = {...users[foundIdx], ...req.body}; // if body에 바뀐 name or email이 담겨왔을 시 spread로 풀어지기때문에 업데이트 된다.
    res.json(users[foundIdx]); // 업뎃된 특정 유저의 정보를 클라이언트에게 응답해주기
  }
});

// DELETE - 유저삭제
server.delete('/api/user/:id', (req, res) => {
  let foundIdx = users.findIndex(user => user.id === req.params.id);

  if(foundIdx === -1) {
    res.status(404).json({errorMessage: "User wad not found"})
  } else {
    let foundUser = users.splice(foundIdx,1); // 시작점부터 1개 잘라내기
    res.json(foundUser[0]); // 삭제된거 응답으로 돌려줌
  }
});


server.listen(3000, () => { // 포트 열어주고 서버에세 전달
  console.log('* The server is running *')
});