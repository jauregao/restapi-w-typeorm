import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { Course } from '../models/Course'

export async function createCourse(req: Request, res: Response) {
    
  const courseData = req.body
    if(!courseData) return res.status(400).json({ error: 'No data available, cannot save course.' })
  
  try {

      const course = await AppDataSource.transaction(
        'REPEATABLE READ', 
        async (transactionEntiryManager) => {

          const repository = transactionEntiryManager.getRepository(Course)

          const result = await repository
            .createQueryBuilder('courses')
            .select('MAX(courses.seqNo)', 'max')
            .getRawOne()

          const course = repository
            .create({
              ...courseData,
              seqNo: ( result?.max ?? 0 ) + 1
            })

          await repository.save(course)

          return course
        }
      )

      return res.status(201).json(course)

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
