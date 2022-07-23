import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { UpdateMovieStatus } from './dto/update-movie-status.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';
import { MoviesService } from './movies.service';
import { PassportModule } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getMovies(
    @Query() filterDto: MovieFilterDto,
    @GetUser() user: User,
  ): Promise<Movie[]> {
    return this.moviesService.getMovies(filterDto, user);
  }
  @Post()
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto, user);
  }
  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }
  @Get('/:id')
  getMovieById(@Param('id') id: string, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.getMovieById(id, user);
  }
  @Delete('/:id')
  deleteMovie(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.moviesService.deleteMovie(id, user);
  }
  @Patch('/:id/status')
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieStatus: UpdateMovieStatus,
    @GetUser() user: User,
  ): Promise<Movie> {
    const { status } = updateMovieStatus;
    return this.moviesService.updateMovie(id, status, user);
  }
}
