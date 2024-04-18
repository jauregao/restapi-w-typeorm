import { NextFunction, Request, Response } from 'express'
import { defaultErrorHandler } from './default-error-handler'

export async function checkIfIsAdmin(req: Request, res: Response, next: NextFunction){

  try {
    const user = req['user']

    if(!user?.isAdmin) return res.status(403).json({ error: 'Only administrators can create a user.'})
    
    next()
    
  } catch (error) {
    return defaultErrorHandler(error, res)
  }
}
