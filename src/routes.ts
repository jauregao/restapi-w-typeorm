import { Router } from 'express'
import {
    getAllCourses,
    getOneCourseByUrl,
    findLessonsForCourse,
    updateCourse,
    createCourse,
    deleteCourseAndLessons
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

routes.delete('/courses/:courseId', 
  deleteCourseAndLessons
)

routes.post('/courses', 
  createCourse
)

routes.get('/courses/:courseId/lessons', 
  findLessonsForCourse
)

export default routes
