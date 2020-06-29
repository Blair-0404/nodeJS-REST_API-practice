const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'.env'}); // 설치한 dotenv사용위해 config메소드실행하고 경로인자 넣어주기
// 혹은 require하면서 바로 연결해줘도 된다.require('dotenv').config({path:'.env'});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser : true}, (err) => {  // 생성했던 몽고디비를 몽구스에 연결
  if(err) { // 콜백함수로 연결실패히 err 출력
    console.log(err)
  } else { // 연결 성공시 성공 메세지 출력
    console.log("* Connected to database successfully *");
  }
});