const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./router/router')
const connectDB = require('./dataBase/dB_connect')
dotenv.config();
const app = express();
connectDB()
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(router)


app.listen(process.env.PORT, () =>{
    console.log(`server is runing on ${'http://localhost:'+process.env.PORT}`);
})
