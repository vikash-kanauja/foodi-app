import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieparser from "cookie-parser"
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import MenuRoutes from "./routes/menuRoutes.js"
import CartRoutes from "./routes/CartRoutes.js";
// import UserRoutes from "./routes/UserRoutes.js";
dotenv.config()
const PORT = process.env.PORT
const app = express();

// MongoBD connect
connectDB()
app.use(express.json())
app.use(cookieparser())

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
  }));
app.use('/api/auth',AuthRoutes)
app.use('/api/admin',AdminRoutes)
app.use('/api/user',UserRoutes)
// app.use('/user',AdminRoutes)
app.use('/api/menu', MenuRoutes);

app.use('/api/cart', CartRoutes);

app.get('/',(req,res)=>{
    res.send("Testing for get request")
})

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})