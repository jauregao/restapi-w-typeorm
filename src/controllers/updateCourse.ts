import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { Course } from '../models/Course'

export async function updateCourse(req: Request, res: Response) {
    
  const params = req.params as any
  const courseId = params.courseId
    if(isNaN(courseId) || !courseId ) return res.status(400).json({ error: 'Course id not provided or invalid.'})
  
  const courseData = req.body

    try {
      await AppDataSource
        .createQueryBuilder()
        .update(Course)
        .set(courseData)
        .where('id = :courseId', { courseId })
        .execute()

      return res.status(200).json({
        message: `Course ${courseId} was updated successfully.`
      })

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
