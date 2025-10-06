import express from "express"
import { changeAdmin, getAdminMe,login} from "../controllers/admin.controllers.js";

export const adminRoutes = express.Router();

adminRoutes.get("/changeadmin",changeAdmin);
adminRoutes.post("/login",login);
adminRoutes.get("/me",getAdminMe)