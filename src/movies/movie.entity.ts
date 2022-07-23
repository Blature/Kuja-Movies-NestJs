import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieStatus } from './movies.-status.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  status: MovieStatus;

  @Column()
  date: string;

  @ManyToOne((_type) => User, (user) => user.movies, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
