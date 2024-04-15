import { Router } from 'express'
import {
    getAllCourses,
    getOneCourseByUrl,
    findLessonsForCourse,
    updateCourse,
    createCourse
  } from './controllers/index'

const routes = Router()

routes.get('/courses', 
  getAllCourses
)

routes.get('/courses/:courseUrl', 
  getOneCourseByUrl
)

routes.patch('/courses/:courseId', 
  updateCourse
)

routes.post('/courses', 
  createCourse
)

routes.get('/courses/:courseId/lessons', 
  findLessonsForCourse
)

export default routes
