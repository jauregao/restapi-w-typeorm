import { Request, Response } from 'express'
import { AppDataSource } from './../configs/databseConnection'
import { defaultErrorHandler } from '../middleware/default-error-handler'
import { User } from '../models/Users'
import { comparePasswordHashed } from '../middleware/password-hash'
import jwt, { Secret } from 'jsonwebtoken'

const secretKey: Secret = process.env.JWT_SECRET_KEY!
const expiresIn = process.env.JWT_EXPIRED

export async function login(req: Request, res: Response){

    const { email, password } = req.body

    try {

        if (!email || !password) return res.status(400).json({ message: 'Invalid email or password.' })
      
      const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('users')
        .where({email})
        .getOne()
      
        if (!user) return res.status(404).json({ message: 'User not found.' })

      const validPass = await comparePasswordHashed(password, user.passwordHash)

        if (!validPass) return res.status(403).json({ message: 'Invalid email or password.' })

      const token = generateAuthToken(user.id, user.email, user.isAdmin)

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          picture: user.pictureUrl
        },
        token: token
      })

      } catch (error) {
        return defaultErrorHandler(error, res)
      }
  }

function generateAuthToken(userId: number, email:string, isAdmin: boolean): string {
  return jwt.sign({ id: userId, email, isAdmin }, secretKey, { expiresIn })
}
