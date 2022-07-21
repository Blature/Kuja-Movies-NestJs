import { IsEnum } from 'class-validator';
import { MovieStatus } from '../movies.-status.enum';

export class UpdateMovieStatus {
  @IsEnum(MovieStatus)
  status: MovieStatus;
}
