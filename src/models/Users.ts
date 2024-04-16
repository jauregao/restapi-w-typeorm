import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn, 
  CreateDateColumn,
  Column
} from 'typeorm'

@Entity({
  name: 'USERS'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  pictureUrl: string

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  lastUpdatedAt: Date
}