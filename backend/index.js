import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cookieParser from "cookie-parser";
import cors from "cors" ; 
import { userRouter } from "./routes/user.routes.js";
import { connectDb } from "./config/db.config.js";
import { contactRouter } from "./routes/contact.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import fileUpload from "express-fileupload";
import { adminRoutes } from "./routes/admin.routes.js";
import status from "express-status-monitor"
import paymentRouter from "./routes/payment.routes.js";
import { paiduserRouter } from "./routes/paiduser.routes.js";
const app = express();

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use(status())

const PORT = process.env.PORT ; 
connectDb();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/user/auth",userRouter);
app.use("/api/contact",contactRouter);
app.use("/api/course",courseRouter);
app.use("/api/admin",adminRoutes);
app.use("/api/payment",paymentRouter);
app.use("/api/paiduser",paiduserRouter)
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);

})