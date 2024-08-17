import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// connect to database

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB();


// Routes

import userRouter from './routes/user.js'
import ticketRouter from './routes/ticket.js'
import authenticateUser from './middlewares/auth.js';

app.use('/api/user', userRouter);
app.use('/api/ticket', ticketRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})