import { Router } from "express"
import { getAllCourses } from "./controllers/getAllCourses"
import { getOneCourseByUrl } from "./controllers/getOneCourseByUrl"

const routes = Router()

routes.get('/courses', 
  getAllCourses
)

routes.get('/courses/:courseUrl', 
  getOneCourseByUrl
)

export default routes
