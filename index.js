const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

// application/x-www-form-urlencoded로 되어 있는 데이터를 분석해서 가져오는 역할을 한다.
app.use(bodyParser.urlencoded({extended: true})); 

// application/json으로 되어있는 데이터를 분석해서 가져오는 역할
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//회원가입을 위한 라우트
app.post('/register', (req, res) => {
    //회원사입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ //status(200)은 성공을 의미
            success: true
        })
    }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})