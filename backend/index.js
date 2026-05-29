
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import status from "express-status-monitor";
import dns from "dns"

dns.setDefaultResultOrder("ipv4first")
import { userRouter } from "./routes/user.routes.js";
import { connectDb } from "./config/db.config.js";
import { contactRouter } from "./routes/contact.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import { paiduserRouter } from "./routes/paiduser.routes.js";

const app = express();

// ---------------- Middleware ---------------- //
app.use(status());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// ---------------- CORS Setup ---------------- //
const allowedOrigins = [
    "https://www.durbarphysics.com",
    "https://durbarphysics.com",
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['set-cookie']
}));

// ---------------- Database ---------------- //
connectDb();

// ---------------- Routes ---------------- //
app.use("/api/user/auth", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRouter);
app.use("/api/paiduser", paiduserRouter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// ---------------- Server ---------------- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at ${PORT}`);
});
