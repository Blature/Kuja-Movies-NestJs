import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MovieStatus } from '../movies.-status.enum';

export class MovieFilterDto {
  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
