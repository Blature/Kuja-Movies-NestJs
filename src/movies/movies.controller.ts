import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
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
  // @Get()
  // getMovieByFilter(@Query() movieFilter: MovieFilterDto): Movie[] {
  //   if (Object.keys(movieFilter).length) {
  //     return this.moviesService.getMovieByFilter(movieFilter);
  //   } else return this.moviesService.getAllMovies();
  // }

  // @Get('/:id')
  // getMovieById(@Param('id') id: string) {
  //   return this.moviesService.getMovieById(id);
  // }

  // @Post()
  // createMovie(@Body() createMovieDto: CreateMovieDto) {
  //   return this.moviesService.createMovie(createMovieDto);
  // }

  // @Delete('/:id')
  // deleteMovieById(@Param('id') id: string) {
  //   return this.moviesService.deleteMovieById(id);
  // }

  // @Delete('/delete')
  // deleteAllMovies() {
  //   return this.moviesService.deleteAllMovies();
  // }

  // @Patch('/:id/status')
  // updateMovieById(
  //   @Param('id') id: string,
  //   @Body('status') status: MovieStatus,
  // ): Movie {
  //   return this.moviesService.updateMovieById(id, status);
  // }
}
