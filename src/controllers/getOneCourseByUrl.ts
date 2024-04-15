import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { Course } from '../models/Course'

export async function getOneCourseByUrl(req: Request, res: Response) {

  const { courseUrl } = req.params
    if(!courseUrl) return res.status(400).json({ error: 'Course url not provided.'})
  
    try {
    const course = await AppDataSource
      .getRepository(Course)
      .findOneBy({
        url: courseUrl
      })

      if(!course) return res.status(404).json({ error: 'Course not found.'})

    const totalLessons = await AppDataSource
      .getRepository('LESSONS')
      .createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', {
        courseId: course.id
      })
      .getCount()

    return res.status(200).json({
      ...course,
      totalLessons
    })

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
