import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('Todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
  
  @Column('text')
  description: string;
  
  @Column('integer')
  createddate: number;

  @Column('integer')
  duedate: number;
}