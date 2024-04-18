import { Router } from 'express'
import { checkIfAuthenticated } from './middleware/authentication'
import {
    getAllCourses,
    getOneCourseByUrl,
    findLessonsForCourse,
    updateCourse,
    createCourse,
    deleteCourseAndLessons,
    createUser,
    login
  } from './controllers'

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

routes.post('/login',
login
)

routes.use(checkIfAuthenticated)

routes.patch('/courses/:courseId', 
  updateCourse
)

routes.delete('/courses/:courseId', 
  deleteCourseAndLessons
)

routes.post('/courses', 
  createCourse
)

routes.post('/users',
  createUser
)

export default routes
