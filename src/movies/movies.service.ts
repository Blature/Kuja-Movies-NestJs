import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
  ) {}

  async getMovies(filterDto: MovieFilterDto): Promise<Movie[]> {
    return this.movieRepository.getMovies(filterDto);
  }

  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException(`We cant find Movie with ${id}`);

    return movie;
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException(`We cant find Movie with ${id}`);
    await this.movieRepository.delete(id);
  }

  async updateMovie(id: string, status: MovieStatus): Promise<Movie> {
    const movie = await this.getMovieById(id);
    movie.status = status;
    return await this.movieRepository.save(movie);
  }
}
