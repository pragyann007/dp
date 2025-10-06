import express from "express"
import { contactform, deleteForm, getForm } from "../controllers/contact.controllers.js";
import { isAdminAuth } from "../middlewares/isadmin.js";

export const contactRouter = express.Router();

contactRouter.post("/",contactform);
contactRouter.get("/",isAdminAuth,getForm);
contactRouter.delete("/:id",isAdminAuth,deleteForm);