import express from "express";
import { isuserauth } from "../middlewares/isuserauth.js";
import { getAll, initiatePayment, myPayments, verifyAndUpdate } from "../controllers/payments.controller.js";
import { isAdminAuth } from "../middlewares/isadmin.js";

const paymentRouter = express.Router();

paymentRouter.post("/initiate-payment",isuserauth,initiatePayment)
paymentRouter.patch("/verify-payment/:paymentId",isuserauth,verifyAndUpdate)
paymentRouter.get("/all",isAdminAuth,getAll)
paymentRouter.get("/my-payments",isuserauth,myPayments)



export default paymentRouter;
