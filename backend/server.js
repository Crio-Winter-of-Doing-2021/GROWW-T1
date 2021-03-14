import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello from the profile backend!')
})
const port = process.env.PORT || '3000'; app.listen(port); 
console.log(`Listening on port ${port}`);
