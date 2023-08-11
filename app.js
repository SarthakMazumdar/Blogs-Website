const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')

const port = process.env.port || 8000;

const app = express();

//db connection
mongoose.connect('mongodb://0.0.0.0:27017/forms', {useNewUrlParser:true})
const db = mongoose.connection;

db.on("error", ()=>{console.log("error in connection");})
db.once('open', ()=>{console.log("connected");})

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',homeRouter)

app.listen(port)


