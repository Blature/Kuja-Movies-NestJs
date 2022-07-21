import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
