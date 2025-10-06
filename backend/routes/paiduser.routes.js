
import express from "express";
import { isUserPaid } from "../middlewares/isuserPaid.js";
import { getResources, getVideos, paiduser } from "../controllers/paiduser.controllers.js";

export const paiduserRouter = express.Router();

paiduserRouter.get("/",isUserPaid,paiduser);
paiduserRouter.get("/get-resources",isUserPaid,getResources);
paiduserRouter.get("/get-videos",isUserPaid,getVideos);

