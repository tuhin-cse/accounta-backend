import dotenv from 'dotenv'
dotenv.config({path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env'} )

import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from "./routes/api.js";


mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('MongoDB Connected Successfully.')
}).catch((err) => {
    console.log('Database connection failed.')
})

const PORT = process.env.PORT  || 8000;
const app = express();


app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
});
app.use(cors())


app.use('/api', apiRoutes)

app.use((err, req, res, _) => {
    res.status(500).send({
        error: true,
        message: "Something went wrong."
    })
})

app.get('*', (req, res) => {
    res.send('Welcome to Accounta!');
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})