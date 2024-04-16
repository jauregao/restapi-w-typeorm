import { Router } from 'express'
import {
    getAllCourses,
    getOneCourseByUrl,
    findLessonsForCourse,
    updateCourse,
    createCourse,
    deleteCourseAndLessons,
    createUser
  } from './controllers/index'

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

//auth needeed

routes.patch('/courses/:courseId', 
  updateCourse
)

routes.delete('/courses/:courseId', 
  deleteCourseAndLessons
)

routes.post('/courses', 
  createCourse
)

//users endpoints

routes.post('/users',
  createUser
)

export default routes
