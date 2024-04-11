import { DataSource } from "typeorm"
import { Course } from "../models/Course"
import { Lesson } from "../models/Lesson"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // ssl: true,
    entities: [
        Course,
        Lesson
    ],
    /* use only in dev mode */
    synchronize: true,
    logging: true
})
