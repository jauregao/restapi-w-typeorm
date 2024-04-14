import { Router } from "express"
import { getAllCourses } from "./controllers/getAllCourses"

const routes = Router()

routes.get('/courses', 
  getAllCourses
)

export default routes
