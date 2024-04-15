import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { Lesson } from '../models/Lesson'
import { defaultErrorHandler } from '../middleware/default-error-handler'

export async function findLessonsForCourse(req: Request, res: Response) {

  const query = req.query as any
  const page = query?.page ?? 1
  const pageSize = query?.pageSize ?? 3
    if(isNaN(page) || isNaN(pageSize) || page < 0 || pageSize <= 0) return res.status(400).json({ error: 'Page number and number of items must be a valid number.' })
    
  const params = req.params as any
  const courseId = params.courseId
    if(isNaN(courseId) || !courseId ) return res.status(400).json({ error: 'Course id not provided or invalid.'})
  
    try {
      const lessons = await AppDataSource
        .getRepository(Lesson)
        .createQueryBuilder('lessons')
        .where('lessons.courseId = :courseId', { courseId })
        .orderBy('lessons.seqNo')
        .take(pageSize)
        .skip((page - 1) * pageSize)
        .getMany()

      return res.status(200).json(lessons)

    } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
