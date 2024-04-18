import { Response } from 'express'

export function defaultErrorHandler(error: Error, res: Response){

  console.log(`Default error handler triggered.\n reason: ${error}`)

  if(res.headersSent){
    console.log('Response was already being written, delegating to built-in Express error handler.');
    return
  }

  return res.status(500).json({ error : 'Internal server error.'})
}
