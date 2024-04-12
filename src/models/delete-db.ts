import 'reflect-metadata'
import 'dotenv/config'

import { AppDataSource } from '../configs/databseConnection'
import { Lesson } from './Lesson'
import { Course } from './Course'

async function deleteDb(){
    await AppDataSource.initialize()

    await AppDataSource.getRepository(Lesson)
    .delete({})
    
    await AppDataSource.getRepository(Course)
    .delete({})
}

deleteDb()
  .then(() => {
    console.log('Database deletion successfully completed.')
  })
  .catch((err: Error) => {
    console.error(`Error during database deletion: ${err.message}`)
  })

