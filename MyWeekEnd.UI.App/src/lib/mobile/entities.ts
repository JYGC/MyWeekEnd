import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('Todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;
  
  @Column('text')
  description: string;
  
  @Column('integer')
  createddate: number;

  @Column('integer')
  duedate: number;
}