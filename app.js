const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

dotenv.config()

mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser: true } , ()=>{
	console.log('connected DB ' + process.env.DB_CONNECT)
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

require('./src/routers/index.js')(app);


app.listen(4000 ,()=>{
	console.log('server is running')
})