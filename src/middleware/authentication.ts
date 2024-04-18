import { NextFunction, Request, Response } from 'express'
import { defaultErrorHandler } from './default-error-handler'
import jwt, { Secret } from 'jsonwebtoken'

const secretKey: Secret = process.env.JWT_SECRET_KEY

export async function checkIfAuthenticated(req: Request, res: Response, next: NextFunction){

  const { authorization } = req.headers

    try {

        if (!authorization) return res.status(401).json({ error: 'Access denied.' })

      const token = authorization.replace('Bearer ', '').trim()

      const user = checkJwtValidity(token)

        if (!user) return res.status(403).json({ error: 'Could not validate the authentication JWT, access denied.' })

      req['user'] = user
      
      next()

    } catch (error) {
      return defaultErrorHandler(error, res)
    }
}

function checkJwtValidity(token:string) {
  return jwt.verify(token, secretKey)
}
