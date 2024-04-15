import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { Course } from '../models/Course'
import { Lesson } from '../models/Lesson'

export async function deleteCourseAndLessons(req: Request, res: Response) {
    
  const params = req.params as any
  const courseId = params.courseId
    if(isNaN(courseId) || !courseId ) return res.status(400).json({ error: 'Course id not provided or invalid.'})

    try {

      await AppDataSource
        .transaction(
          async (transactionEntiryManager) => {

            await transactionEntiryManager
              .createQueryBuilder()
              .delete()
              .from(Lesson)
              .where('courseId = :courseId', { courseId })
              .execute()

            await transactionEntiryManager
              .createQueryBuilder()
              .delete()
              .from(Course)
              .where('id = :courseId', { courseId })
              .execute()
          }
        )
  

      return res.status(200).json({
        message: 'Course deleted successfully',
        course_id: courseId
      })

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
