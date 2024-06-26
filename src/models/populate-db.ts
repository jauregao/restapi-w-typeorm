import { User } from './Users';
import 'reflect-metadata'
import 'dotenv/config'

import { AppDataSource } from '../configs/databseConnection'
import { COURSES, USERS } from './db-data'
import { DeepPartial } from 'typeorm'
import { Course } from './Course'
import { Lesson } from './Lesson'
import { passwordHashed }  from '../middleware/password-hash'

async function populateDb(){
    await AppDataSource.initialize()

    const courses = Object.values(COURSES) as DeepPartial<Course>[]

    const courseRepository = AppDataSource.getRepository(Course)

    const lessonRepository = AppDataSource.getRepository(Lesson)

    for (let courseData of courses) {
      const course = courseRepository.create(courseData)

      await courseRepository.save(course)

      for (let lessonData of courseData.lessons) {
        const lesson = lessonRepository.create(lessonData)

        lesson.course = course
        await lessonRepository.save(lesson)
      }
    }
    
      const users = Object.values(USERS) as any[]

    for (let userData of users) {

        const {email, pictureUrl, isAdmin, plainTextPassword} = userData

        const passwordHash = await passwordHashed(plainTextPassword)

        const user = AppDataSource
            .getRepository(User)
            .create({
                email,
                pictureUrl,
                isAdmin,
                passwordHash 
            })

        await AppDataSource.manager.save(user)
    }

      const totalCourses = await courseRepository
        .createQueryBuilder()
        .getCount()

      const totalLessons = await lessonRepository
        .createQueryBuilder()
        .getCount()


      console.log(`Database populated with ${totalCourses} courses and ${totalLessons} lessons.`)
    } 

populateDb()
  .then(() => {
    console.log('Database population successfully completed.');
  })
  .catch((err: Error) => {
    console.error(`Error during database population: ${err.message}`);
  })
