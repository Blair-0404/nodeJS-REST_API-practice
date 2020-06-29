const mongoose = require('mongoose');
// const Schema = mongoose.Schema
const {Schema} = mongoose; // 위와 같다.(구조분해 할당)


// 스키마 폼 생성
const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    name: String,
    age: {
      type: Number,
      min: 18,
      max: 50
    }
  },
  {
    timestamps: true // 데이터 생성한 시점, 수정될경우 시점이 기록된다.
  }
);

module.exports = mongoose.model('User', userSchema); // 생성된 모델을 사용할 수 있게 exports 시켜주기