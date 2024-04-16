import { Request, Response } from 'express'
import { AppDataSource } from '../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { User } from '../models/Users'
import { passwordHashed } from '../middleware/password-hash'

export async function createUser(req: Request, res: Response) {
    
  const { email, pictureUrl, password, isAdmin } = req.body
    if(!email || !password ) return res.status(400).json({ error: 'No data available, cannot save course.' })
  
  try {
    const repository = AppDataSource.getRepository(User)

    const userExists = await repository
    .createQueryBuilder('users')
    .where({ email })
    .getOne()

    if(userExists) return res.status(400).json({ error: 'Email already in use.'})
  
    const passwordHash = await passwordHashed(password)

    const newUser = repository.create({
      email,
      pictureUrl,
      passwordHash,
      isAdmin
    })
    
    await AppDataSource.manager.save(newUser)

    return res.status(201).json({
      email,
      pictureUrl,
      isAdmin
    })

  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
