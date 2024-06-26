import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { Course } from '../models/Course'

export async function getAllCourses(_: Request, res: Response) {

  try {
    const courses = await AppDataSource
      .getRepository(Course)
      .createQueryBuilder('courses')
      .orderBy('courses.seqNo')
      .getMany()

    return res.status(200).json(courses)

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
