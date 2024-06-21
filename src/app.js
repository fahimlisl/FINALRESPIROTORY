import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";




const app = express();

// for middlewares use always app.use , and here the cors is a middlware


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true
}));


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())



//routes 

import userRouter from'./routes/user.routes.js'


//routes declartion
app.use("/api/v1/users",userRouter)

export { app }