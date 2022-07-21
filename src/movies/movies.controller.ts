import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { UpdateMovieStatus } from './dto/update-movie-status.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getMovies(@Query() filterDto: MovieFilterDto): Promise<Movie[]> {
    return this.moviesService.getMovies(filterDto);
  }
  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }
  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }
  @Get('/:id')
  getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }
  @Delete('/:id')
  deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }
  @Patch('/:id/status')
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieStatus: UpdateMovieStatus,
  ): Promise<Movie> {
    const { status } = updateMovieStatus;
    return this.moviesService.updateMovie(id, status);
  }
}
