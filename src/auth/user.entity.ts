import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolls } from './user-roll.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @Column('enum', { default: UserRolls.MEMBER, enum: UserRolls })
  roll: UserRolls;
}
