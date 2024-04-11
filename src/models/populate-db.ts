import 'reflect-metadata'
import 'dotenv/config'


import { AppDataSource } from '../configs/databseConnection'
import { COURSES } from './db-data'
import { DeepPartial } from 'typeorm'
import { Course } from './Course'
import { Lesson } from './Lesson'

async function populateDb(){

  console.log("Inicializando a população do banco de dados...");
    await AppDataSource.initialize()

    const courses = Object.values(COURSES) as DeepPartial<Course>[]

    const courseRepository = AppDataSource.getRepository(Course)

    const lessonRepository = AppDataSource.getRepository(Lesson)

    for (let courseData of courses) {
      console.log(`Criando curso: ${courseData.title}`);
      const course = courseRepository.create(courseData)

      await courseRepository.save(course)
      console.log(`Curso '${course.title}' criado com sucesso.`);

      for (let lessonData of courseData.lessons) {
        console.log(`Criando lição para o curso '${course.title}': ${lessonData.title}`);
        const lesson = lessonRepository.create(lessonData)

        lesson.course = course

        await lessonRepository.save(lesson)
        console.log(`Lição '${lesson.title}' criada com sucesso.`);
      }

      const totalCourses = await courseRepository
        .createQueryBuilder()
        .getCount()

      const totalLessons = await lessonRepository
        .createQueryBuilder()
        .getCount()

      console.log(`Database populated with ${totalCourses} courses and ${totalLessons} lessons.`)
    }
} 

populateDb()
  .then(() => {
    console.log("População do banco de dados concluída com sucesso.");
  })
  .catch((err: Error) => {
    console.error(`Erro durante a população do banco de dados: ${err.message}`);
  })
