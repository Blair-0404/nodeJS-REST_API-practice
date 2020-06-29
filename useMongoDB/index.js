const express = require('express'); // 서버만들기위해 require
const mongoose = require('mongoose');
const server = express(); // 서버생성
const User = require('./models/User'); // 모델을 사용하기 위해 rewuire 해주기
const dotenv = require('dotenv');
dotenv.config({path: '.env'}); // 설치한 dotenv사용위해 config메소드실행하고 경로인자 넣어주기
// 혹은 require하면서 바로 연결해줘도 된다.require('dotenv').config({path:'.env'});


// GET - 사용자가 '/'로 접속시 User model 만드는 요청 실행
server.get('/', (req, res) => {
  const newUser = new User();
  newUser.email = "blair04@gmail.com"; // 모델스키마에 잡아놨던 폼의 속성마다 값 넣어주기
  newUser.name = "블레어";
  newUser.age = 20;

  // 위에서 만들 uewUse(새로만든 User모델을) mondoDB에 저장 (프라미스객체 돌려준다)
  newUser.save()
    .then((user) => { // 저장이 잘 됬다면
      console.log(user);
      res.json({
        message: "User Create Successfully"
      });
    })
    .catch((error) => { // 저장 실패하면
      res.json({
        message: "User wad not successfully created",
        err: error.toString()
      })
    })
});

server.listen(3000, (err) => { // 포트지정해서 서버 열고
  if (err) {
    console.log(err);
  } else { // 서버가 잘 열리면 몽고디비 바로 연결
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, (err) => {  // 생성했던 몽고디비를 몽구스에 연결
      if (err) { // 몽고디비 연결실패 err 출력
        console.log(err)
      } else { // 연결 성공시 성공 메세지 출력
        console.log("* Connected to database successfully *");
      }
    });
  }
});

