import express from "express"
import { createCourse, deleteCourse, editCourse, getAllCourses, getOneCourse, sendMeetLinksController, sendResources, sendVideoLinks } from "../controllers/course.controllers.js";
import { isAdminAuth } from "../middlewares/isadmin.js";

export const courseRouter = express.Router();

courseRouter.get("/", getAllCourses);   
courseRouter.post("/create",isAdminAuth,createCourse)
courseRouter.patch("/edit/:id",isAdminAuth,editCourse);
courseRouter.delete("/delete/:id",isAdminAuth,deleteCourse)
courseRouter.get("/:id",getOneCourse)

courseRouter.patch("/send-resources",isAdminAuth,sendResources);
courseRouter.post("/send-meetlinks",isAdminAuth,sendMeetLinksController);
courseRouter.patch("/send-video",isAdminAuth,sendVideoLinks)



