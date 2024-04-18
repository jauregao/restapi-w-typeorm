import { Request, Response } from 'express'
import { defaultErrorHandler } from "./default-error-handler"

export async function checkIfAuthenticated(req: Request, res: Response){

    const authJwtToken = req.headers.authorization

    try {

      

      } catch (error) {
        return defaultErrorHandler(error, res)
      }
  }
