const express = require('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors = require ('cors')
const routes = require ('./routes/routes')

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyparser.json());

app.use('/api',routes)


mongoose.connect(process.env.MONGO_URL,{ 
})
.then (() => {
        console.log('connected to database')
})
.catch ((error) => {
         console.log(error)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})