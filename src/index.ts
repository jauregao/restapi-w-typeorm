import 'dotenv/config'
import 'reflect-metadata'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import { AppDataSource } from './configs/databseConnection'

function setupAndStartServer() {
  const app = express()
  
  app.use(cors({origin: true}))
  app.use(express.json())

  app.use(routes)
        
  app.listen(process.env.PORT)
}

AppDataSource.initialize()
  .then(() => {
    setupAndStartServer()
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error)
  })
