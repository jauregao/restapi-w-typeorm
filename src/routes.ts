import { Router } from "express"
import { getAllCourses } from "./controllers/getAllCourses"
import { getOneCourseByUrl } from "./controllers/getOneCourseByUrl"
import { findLessonsForCourse } from "./controllers/findLessonsForCourse"

const routes = Router()

routes.get('/courses', 
  getAllCourses
)

routes.get('/courses/:courseUrl', 
  getOneCourseByUrl
)

routes.get('/courses/:courseId/lessons', 
  findLessonsForCourse
)

export default routes
