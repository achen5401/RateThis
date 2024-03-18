const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    //origin: ["http://localhost:3000"],
    origin: ["https://rate-this-hazel.vercel.app/"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const uri = process.env.MONGOCONNECT;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connection established!");
});

const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter)
const storeRouter = require('./routes/store-router')
app.use('/api', storeRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});