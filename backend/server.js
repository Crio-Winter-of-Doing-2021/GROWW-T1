import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
var morgan = require('morgan')
let bodyParser = require('body-parser')
let cors = require('cors')
const db = require('./connection')
const app = express();
const page_router = require('./router_controller/router')
const auth_router=require('./authentication/routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(morgan('dev'))
db.once('open',() => console.log('Connected to db'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/loggingUser',auth_router)
app.use('/registerUser',auth_router)
app.use('/',page_router)

app.get('/', (_, res) => {
    res.send('Hello from the profile backend!')
})
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
