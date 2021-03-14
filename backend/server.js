import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
let cors = require('cors')
const db = require('./connection')
const app = express();
app.use(cors())
db.once('open',() => console.log('Connected to db'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (_, res) => {
    res.send('Hello from the profile backend!')
})
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
